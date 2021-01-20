/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Animated, Text, NativeModules, Platform, StatusBar, Dimensions } from 'react-native';
import { BackIcon } from '@assets/icons';
import NewCard from '@components/NewCard';
import { useRoute, useNavigation, RouteProp, useIsFocused } from '@react-navigation/native';
import {
  MassiveSDKModelItemList,
  MassiveSDKModelItemSummary,
  MassiveSDKModelSeasonsItem,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadDetailPage, loadEpisodesBySeason } from '@src/services/detail';
import { getImage } from '@src/utils/images';
import { fill, pickBy } from 'lodash';
import Bookmark from '@components/Bookmark';
import { getVideoIdAndClassification } from '@src/services/cast';
import { AppState } from '@store/modules/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { refreshTokenSuccess, watchlistToggleRequest } from '@store/modules/user/actions';
import { castDetail as castDetailAction, castDetailClear } from '@store/modules/core/actions';
// import { checkIsInWatchingList } from '@src/services/watchlist';
import {
  autoPlayOff,
  autoPlayOn,
  castVideoPlayerDetailClear,
  setCastState,
  showSheetBottom,
  toggleMiniController,
} from '@store/modules/layout/actions';
import { detailWatchedSuccess } from '@store/modules/detail/actions';
import { MassiveSDKModelWatched } from '@src/sdks/Britbox.API.Account.TS/api';
import { LoadDetailPageResponse } from '@store/modules/detail/types';
import { store } from '@store/index';
import { LayoutState } from '@store/modules/layout/types';
import { showSheet } from '@src/utils/sheetBottom';
import { BottomSheetWrapper, Headline, Paragraph } from '@components/Layout';
import { useTranslation } from 'react-i18next';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BritboxAccountApi } from '@src/sdks';
import Action from '@components/Action';
import { refreshTokenWithExpiresIn } from '@src/services/token';
import { immersiveModeOff } from 'react-native-android-immersive-mode';
import { HomeIndicator } from 'react-native-home-indicator';
import { castVideo } from '@store/modules/chromecast/actions';
import { getDimensions } from '@src/utils/dimension';
import { isTablet } from '@src/utils/tablet';
import { withTheme } from 'styled-components';
import { ThemeProps } from '@store/modules/theme/types';
import ErrorNotFound from '@components/ErrorNotFound';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import {
  Container,
  Scroll,
  TopWrapper,
  Button,
  ButtonTrailer,
  ButtonTrailerText,
  TopText,
  BackgroundTop,
  Poster,
  InnerContent,
  WrapperBookmarks,
  WrapperPin,
  ParagraphError,
  ParagraphChecking,
} from './styled';
import Header from './Components/Header/intex';
import Actions from './Components/Actions';
import Description from './Components/Description';
import Tabs from './Components/Tabs';

type RootParamList = {
  Detail: {
    item: MassiveSDKModelItemSummary;
    autoPlay: boolean;
    seasonModal: MassiveSDKModelSeasonsItem;
    seriesData: LoadDetailPageResponse;
  };
};

type DetailScreenRouteProp = RouteProp<RootParamList, 'Detail'>;
const getAutoPlay = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.autoPlay;
};

const getCastState = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.castState;
};

const getIsCast = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.cast;
};

const isContentSheet = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.height > 0;
};

interface CellProps {
  index: number;
  symbol: string;
  isFocused: boolean;
}

const getProgress = (id: string, watched: any) => {
  const filter = pickBy(watched, (value, key) => key.startsWith(id || ''));
  if (filter[id || '']) {
    const { isFullyWatched, position } = filter[id || ''];

    if (isFullyWatched) {
      return 0;
    }

    return position;
  }

  return 0;
};

const innerContentPadding = Math.max(getDimensions().width, getDimensions().height) / 6;

type Props = {
  readonly theme: ThemeProps;
};

const Detail = ({ theme }: Props) => {
  const isFocus = useIsFocused();
  const { params } = useRoute<DetailScreenRouteProp>();
  const { item, seasonModal, autoPlay, seriesData } = params || undefined;
  const navigation = useNavigation();
  const [showBlueView, setShowBlueView] = useState(false);
  const [tabsOffset, setTabsOffset] = useState<boolean | number>(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const core = useSelector((state: AppState) => state.core);
  const { watched } = useSelector((state: AppState) => state.detail);
  const { castDetail, castState, cast, isShowMiniController } = useSelector(
    (state: AppState) => state.layout
  );
  const { t } = useTranslation(['myaccount', 'detail', 'layout']);
  const [error, setError] = useState(false);
  const [data, setData] = useState<LoadDetailPageResponse | undefined>(undefined);
  const [valuePin, setValuePin] = useState('');
  const [errorValuePin, setErrorValuePin] = useState(false);
  const [checkingParentalControl, setCheckingParentalControl] = useState(false);
  const [parentalControlItem, setParentalControlItem] = useState<any>(undefined);
  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: valuePin,
    setValue: setValuePin,
  });

  const refPin = useBlurOnFulfill({ value: valuePin, cellCount: 4 });
  const cell = {
    width: 60,
    height: 60,
    lineHeight: 50,
    fontSize: 30,
    borderRadius: 10,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: '#202634',
    backgroundColor: '#202634',
    color: theme.SECONDARY_FOREGROUND_COLOR,
    textAlign: 'center',
    overflow: 'hidden',
  };
  const focusCell = {
    borderColor: theme.SECONDARY_FOREGROUND_COLOR,
  };
  const sheetRef = useRef<any>(undefined);

  const dispatch = useDispatch();
  const bookmarklist = useSelector(
    (state: AppState) => state.user.profile?.bookmarkList || []
  ) as MassiveSDKModelItemList;
  const user = useSelector((state: AppState) => state.user);

  const refresh = useSelector(
    (state: AppState) => (state.user.access as Access)?.refreshToken || ''
  );
  const expiresIn = useSelector(
    (state: AppState) => (state.user.access as Access)?.expiresIn || ''
  );

  // const getIsInWatchlist = (id: string) =>
  //   checkIsInWatchingList(bookmarklist?.items || [], id || '0') === 3;

  const scrollRef = useRef<any>({
    current: undefined,
  });

  const getDataDetail = async (path: string, customId: string) => {
    const {
      response,
      watched,
    }: {
      response: LoadDetailPageResponse;
      watched: Record<string, MassiveSDKModelWatched>;
    } = await loadDetailPage(path, customId);
    if (response) {
      if (Platform.OS === 'ios' && /show|movie|season/.test(response?.information?.type || '')) {
        setUserActivity(response?.detail?.customId || '');
      }
      dispatch(detailWatchedSuccess(watched));
      setData(response);
    } else {
      setError(true);
    }
  };

  const setUserActivity = async (customId: string) => {
    const { AppleTVController } = NativeModules;
    await AppleTVController.userActivity(customId);
  };

  const invalidUserActivity = async () => {
    const { AppleTVController } = NativeModules;
    await AppleTVController.invalidUserActivity();
  };

  useEffect(() => {
    if (item) {
      getDataDetail(item?.path || '', item?.customId || '');
    }
  }, [item]);

  useEffect(() => {
    if (cast && castDetail && castState === 'sending') {
      onPlay(castDetail.item, castDetail.currentTime);
    }
  }, [cast, castDetail, castState]);

  useEffect(() => {
    if (autoPlay) {
      dispatch(autoPlayOn());
    }
  }, [autoPlay]);

  useEffect(() => {
    if (
      seriesData?.information.type === 'show' ||
      seriesData?.information.type === 'episode' ||
      seriesData?.information.type === 'season'
    ) {
      const { id, releaseYear, seasonNumber, episodeCount, path } = seasonModal || {};
      const { show }: LoadDetailPageResponse = seriesData;
      const newData: LoadDetailPageResponse = {
        ...seriesData,
        show: {
          id: parseInt(id || '0', 10),
          releaseYear,
          seasonNumber,
          seasons: { ...show?.seasons },
          episodeNumber: undefined,
        },
        episodes: {
          items: fill(new Array(episodeCount), {
            images: {},
          }),
        },
      };

      if (seasonModal) {
        setData(newData);
      }

      loadEpisodesBySeason(path || '').then(({ response }) => {
        const afterResponse = {
          ...seriesData,
          show: {
            id: parseInt(id || '0', 10),
            releaseYear,
            seasonNumber,
            seasons: { ...show?.seasons },
            episodeNumber: undefined,
          },
          episodes: response?.episodes,
          moreInformation: response?.moreInformation,
        };
        setData(afterResponse);
      });
    }
  }, [seasonModal, seriesData]);

  const back = () => {
    navigation.goBack();
  };

  useEffect(() => {
    Animated.timing(animatedOpacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setShowBlueView(true));

    return () => {
      setData(undefined);
      dispatch(autoPlayOff());
      if (Platform.OS === 'ios') {
        invalidUserActivity();
      }
    };
  }, []);

  useEffect(() => {
    if (valuePin !== '' && valuePin.length === 4) {
      setErrorValuePin(false);
      setCheckingParentalControl(true);
      validateParentalControl();
    }
  }, [valuePin]);

  useEffect(() => {
    if (isFocus) {
      if (!isTablet()) {
        Orientation.lockToPortrait();
      }

      StatusBar.setHidden(false);
      immersiveModeOff();
    }
  }, [isFocus]);

  const validateParentalControl = async () => {
    const { validateParentalControlPin } = BritboxAccountApi({
      headers: {
        Authorization: `Bearer ${core.token}`,
        'content-type': 'application/json',
      },
    });

    const { response: responseValidate, token: pcToken } = await validateParentalControlPin({
      parentalControlPin: valuePin,
      itemId: parentalControlItem?.id || '0',
    });

    if (responseValidate?.validateParentalControlPINResponseMessage?.responseCode === '0') {
      setCheckingParentalControl(false);
      setErrorValuePin(true);
      setValuePin('');
    } else if (
      sheetRef.current &&
      responseValidate?.validateParentalControlPINResponseMessage?.responseCode === '1'
    ) {
      sheetRef.current!.close();
      setValuePin('');
      setCheckingParentalControl(false);

      const { response } = await refreshTokenWithExpiresIn(expiresIn, refresh);

      if (response) {
        dispatch(refreshTokenSuccess({ ...response }));
      }

      dispatch(setCastState('loading'));
      dispatch(castVideo(parentalControlItem, pcToken || '', castDetail?.currentTime || false));

      return true;
    }

    return false;
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition < 150 && !showBlueView) {
      Animated.timing(animatedOpacityValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => setShowBlueView(true));
    }
    if (scrollPosition > 150 && showBlueView) {
      Animated.timing(animatedOpacityValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => setShowBlueView(false));
    }
  };

  const renderCell = ({ index, symbol, isFocused }: CellProps) => {
    let textChild = null;
    if (symbol) {
      textChild = symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[cell, isFocused && focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  const onPlay = async (episode?: any, playPosition?: number) => {
    if ((!user.profile?.canStream || false) && isContentSheet()) {
      dispatch(showSheetBottom({ canStream: false }));
      showSheet();
      return false;
    }
    if (getIsCast()) {
      const { next } = episode ? {} : await getVideoIdAndClassification(item);
      const itemPlayback = next || episode || item;
      setParentalControlItem(itemPlayback);
      if (user.profile?.parentalControl) {
        const { checkParentalControl } = BritboxAccountApi({
          headers: {
            Authorization: `Bearer ${core.token}`,
          },
        });

        const { canStream } = await checkParentalControl({
          classificationName: itemPlayback.classification?.name || '',
          segment: core.segment,
        });

        if (!canStream) {
          if (sheetRef.current) {
            sheetRef.current.open();
          }
          return true;
        }
      }

      dispatch(setCastState('loading'));

      setTimeout(() => {
        if (getCastState() === 'loading') {
          dispatch(castVideoPlayerDetailClear());
          dispatch(setCastState('error'));
        }
      }, 20000);

      dispatch(toggleMiniController(true));

      const newItem = {
        id: undefined,
        title: t('layout:loading'),
        subtitle: undefined,
        images: [{ url: getImage((next || episode || item)?.images?.wallpaper, 'wallpaper') }],
        playPosition: playPosition || getProgress((next || episode || item)?.id || '0', watched),
        item: next || episode || item,
      };

      dispatch(castDetailAction({ ...newItem }));
      dispatch(castVideo(next || episode || item, '', playPosition || false));

      return true;
    }

    return navigation.navigate('VideoPlayer', { item: episode || item });
  };

  const playTrailer = useCallback(() => {
    return navigation.navigate('VideoPlayer', {
      item: data ? (data?.moreInformation?.trailers || []).reduce((trailer) => trailer) : {},
      isTrailer: true,
    });
  }, [data]);

  const getCategories = useCallback((information: any) => {
    const dataResult = [];
    const { classification, customFields } = information;
    if (classification) {
      dataResult.push({
        key: 1,
        label: classification?.name || '',
        bold: false,
      });
    }
    if (customFields) {
      const { CCFlag: cc, HDFlag: hd } = customFields as { CCFlag: string; HDFlag: string };
      if (JSON.parse(cc.toLowerCase())) {
        dataResult.push({
          key: 2,
          label: 'cc',
          bold: false,
        });
      }
      if (JSON.parse(hd.toLowerCase())) {
        dataResult.push({
          key: 3,
          label: 'hd',
          bold: true,
        });
      }
    }
    return dataResult;
  }, []);

  const onScrollTo = useCallback(
    (y: number) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: 0,
          y: Number(tabsOffset) + Number(y) - 300,
          animated: true,
        });
        if (getAutoPlay()) {
          setTimeout(() => {
            onPlay();
          }, 1000);
        }
      }
    },
    [tabsOffset]
  );

  const onWatchlist = useCallback((itemWatchlist: any, isInWatchlist: boolean) => {
    dispatch(
      watchlistToggleRequest({
        itemId:
          itemWatchlist.type === 'season' ? itemWatchlist?.showId || '0' : itemWatchlist?.id || '0',
        itemCustomId: itemWatchlist?.customId || '0',
        isInWatchlist,
      })
    );
  }, []);

  const getPosterImage = useMemo(() => {
    return data?.detail?.images
      ? getImage(
          isTablet()
            ? data?.detail?.images?.tile
            : data?.detail?.images?.poster ||
                data?.detail?.images?.square ||
                data?.detail?.images?.tile,
          isTablet() ? 'tile' : 'poster'
        )
      : '';
  }, [data]);

  // FIXME: Try to replace this logic with useOrientation
  const [screenData, setScreenData] = useState({
    orientation: getDimensions().height >= getDimensions().width ? 'PORTRAIT' : 'LANDSCAPE',
    size: getDimensions(),
  });

  const dimensions = useMemo(() => {
    const width =
      screenData.orientation === 'PORTRAIT'
        ? Math.min(screenData.size.width, screenData.size.height) * 0.8
        : Math.max(screenData.size.width, screenData.size.height) * 0.5;

    return {
      width,
      height: width * 0.5625,
    };
  }, [screenData]);

  const onOrientationDidChange = useCallback((newOrientation: OrientationType) => {
    let parsedOrientation;

    if (newOrientation === 'LANDSCAPE-LEFT' || newOrientation === 'LANDSCAPE-RIGHT') {
      parsedOrientation = Platform.OS === 'ios' ? 'LANDSCAPE' : 'PORTRAIT';
    } else {
      parsedOrientation = Platform.OS === 'ios' ? 'PORTRAIT' : 'LANDSCAPE';
    }

    setScreenData({
      orientation: parsedOrientation,
      size: getDimensions(),
    });
  }, []);

  useEffect((): (() => void) => {
    if (isTablet()) {
      Orientation.getDeviceOrientation(onOrientationDidChange);
      Orientation.addDeviceOrientationListener(onOrientationDidChange);

      return () => {
        Orientation.removeDeviceOrientationListener(onOrientationDidChange);
      };
    }

    return () => {};
  }, [onOrientationDidChange]);

  return (
    // paddingBottom={isShowMiniController ? 152 : 64}
    <Container
      style={{
        width:
          Platform.OS === 'ios' || screenData.orientation === 'PORTRAIT'
            ? screenData.size.width
            : screenData.size.height,
      }}
    >
      <HomeIndicator autoHidden={false} />
      <TopWrapper>
        <Button onPress={() => back()}>
          <BackIcon width={20} height={20} />
        </Button>
        <TopText>{data?.information.type}</TopText>
        {data?.information.type && (
          <BackgroundTop
            style={{
              opacity: animatedOpacityValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          />
        )}
      </TopWrapper>
      <Scroll onScroll={(event) => handleScroll(event)} scrollEventThrottle={16} ref={scrollRef}>
        <Header {...{ data }} />
        <Poster>
          <NewCard url={getPosterImage} width={dimensions.width} height={dimensions.height} />
        </Poster>
        <InnerContent
          horizontalPadding={
            isTablet() && screenData.orientation === 'LANDSCAPE' ? innerContentPadding : 20
          }
        >
          <Actions
            {...{ data }}
            id={data?.detail?.relatedId || '0'}
            onPlay={onPlay}
            onWatchlist={(itemWatchlist: any, isInWatchlist: boolean) =>
              onWatchlist(itemWatchlist, isInWatchlist)
            }
          />
          <Description {...{ data }} />
          {data && data.information.type !== 'show' && data.information.type !== 'episode' && (
            <WrapperBookmarks>
              {getCategories(data?.information).map((i: any) => (
                <Bookmark key={i.key.toString()} bold={i.bold}>
                  {i.label}
                </Bookmark>
              ))}
            </WrapperBookmarks>
          )}
          {data && (data.moreInformation?.trailers || []).length > 0 && (
            <ButtonTrailer onPress={() => playTrailer()}>
              <Action isTrailer width={50} height={50} loop={false} autoPlay={false} />
              <ButtonTrailerText>{t('detail:trailer')}</ButtonTrailerText>
            </ButtonTrailer>
          )}
        </InnerContent>
        <Tabs
          {...{ data, autoPlay }}
          onScrollTo={(y) => onScrollTo(y)}
          onPlay={(itemPlay) => onPlay(itemPlay)}
          onLayout={(event) => {
            const {
              layout: { y },
            } = event.nativeEvent;
            setTabsOffset(y);
          }}
        />
      </Scroll>
      <RBSheet
        ref={sheetRef}
        height={280}
        closeOnDragDown
        closeOnPressMask={false}
        customStyles={{
          container: {
            maxWidth: isTablet() ? 400 : '100%',
            alignItems: 'center',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
          wrapper: {
            alignItems: 'center',
          },
          draggableIcon: {
            backgroundColor: theme.PRIMARY_TEXT_COLOR_OPAQUE,
            width: 50,
            marginTop: 20,
          },
        }}
        onClose={() => {
          dispatch(setCastState(undefined));
          dispatch(castDetailClear());
          setErrorValuePin(false);
        }}
      >
        <BottomSheetWrapper>
          <Headline center color={theme.PRIMARY_TEXT_COLOR}>
            {t('myaccount:parentalcontrols:title')}
          </Headline>
          <WrapperPin>
            <Paragraph>{t('myaccount:parentalcontrols:enter')}</Paragraph>
            <CodeField
              ref={refPin}
              {...codeProps}
              value={valuePin}
              onChangeText={setValuePin}
              cellCount={4}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
            {checkingParentalControl && (
              <ParagraphChecking>{t('myaccount:parentalcontrols:checking')}</ParagraphChecking>
            )}
            {errorValuePin && (
              <ParagraphError>{t('myaccount:parentalcontrols:errorpin')}</ParagraphError>
            )}
          </WrapperPin>
        </BottomSheetWrapper>
      </RBSheet>
      {error && <ErrorNotFound onPress={() => back()} />}
    </Container>
  );
};

export default withTheme(Detail);
