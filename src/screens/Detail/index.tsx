/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';
import { BackIcon } from '@assets/icons';
import Card from '@components/Card';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import {
  MassiveSDKModelItemList,
  MassiveSDKModelItemSummary,
  MassiveSDKModelSeasonsItem,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadDetailPage, loadEpisodesBySeason } from '@src/services/detail';
import { getImage } from '@src/utils/images';
import { fill } from 'lodash';
import Bookmark from '@components/Bookmark';
import { CastVideo, getVideoIdAndClassification } from '@src/services/cast';
import { AppState } from '@store/modules/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { watchlistToggleRequest } from '@store/modules/user/actions';
import { checkIsInWatchingList } from '@src/services/watchlist';
import { autoPlayOff, autoPlayOn, showSheetBottom } from '@store/modules/layout/actions';
import { detailClear, detailWatchedSuccess } from '@store/modules/detail/actions';
import { MassiveSDKModelWatched } from '@src/sdks/Britbox.API.Account.TS/api';
import { LoadDetailPageResponse } from '@store/modules/detail/types';
import { castDetail } from '@store/modules/core/actions';
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
  };
};

type DetailScreenRouteProp = RouteProp<RootParamList, 'Detail'>;

const getAutoPlay = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.autoPlay;
};

interface CellProps {
  index: number;
  symbol: string;
  isFocused: boolean;
}

const Detail = () => {
  const { params } = useRoute<DetailScreenRouteProp>();
  const { item, seasonModal, autoPlay } = params || undefined;
  const navigation = useNavigation();
  const [showBlueView, setShowBlueView] = useState(false);
  const [tabsOffset, setTabsOffset] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const isCast = useSelector((state: AppState) => state.layout.cast);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const core = useSelector((state: AppState) => state.core);
  const { navigate } = useNavigation();
  const { t } = useTranslation(['myaccount', 'detail']);
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

  const getIsInWatchlist = (id: string) =>
    checkIsInWatchingList(bookmarklist?.items || [], id || '0') === 3;

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
    dispatch(detailWatchedSuccess(watched));
    setData(response);
  };

  useEffect(() => {
    if (item) {
      getDataDetail(item?.path || '', item?.customId || '');
    }
  }, [item]);

  useEffect(() => {
    if (autoPlay) {
      dispatch(autoPlayOn());
    }
  }, [autoPlay]);

  useEffect(() => {
    if (
      data?.information.type === 'show' ||
      data?.information.type === 'episode' ||
      data?.information.type === 'season'
    ) {
      const { id, releaseYear, seasonNumber, episodeCount, path } = seasonModal || {};
      const { show }: LoadDetailPageResponse = data;
      const newData: LoadDetailPageResponse = {
        ...data,
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
          ...data,
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
  }, [seasonModal]);

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
      dispatch(detailClear());
      dispatch(autoPlayOff());
    };
  }, []);

  useEffect(() => {
    if (valuePin !== '' && valuePin.length === 4) {
      setErrorValuePin(false);
      setCheckingParentalControl(true);
      validateParentalControl();
    } else {
      setErrorValuePin(false);
    }
  }, [valuePin]);

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
    } else if (
      sheetRef.current &&
      responseValidate?.validateParentalControlPINResponseMessage?.responseCode === '1'
    ) {
      sheetRef.current!.close();
      setValuePin('');
      setCheckingParentalControl(false);
      dispatch(castDetail(parentalControlItem));
      return CastVideo(parentalControlItem, pcToken || '');
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

  const onPlay = async (episode?: any) => {
    if (!user.profile?.canStream || false) {
      dispatch(showSheetBottom());
      showSheet();
      return false;
    }

    if (isCast) {
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

      dispatch(castDetail(next || episode || item));
      return CastVideo(next || episode || item);
    }
    return navigation.navigate('VideoPlayer', { item });
  };

  const playTrailer = () => {
    return navigation.navigate('VideoPlayer', {
      item: data ? data?.moreInformation?.trailers.reduce((trailer) => trailer) : {},
    });
  };

  const getCategories = (information: any): any[] => {
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
  };

  const onScrollTo = (y: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: 0,
        y: Number(tabsOffset) + Number(y) - 300,
        animated: true,
      });
      if (getAutoPlay()) {
        setTimeout(() => {
          if (!user?.profile?.canStream || false) {
            dispatch(showSheetBottom());
            showSheet();
            return false;
          }
          if (isCast) {
            dispatch(castDetail(item));
            return CastVideo(item);
          }
          return navigate('VideoPlayer', { item });
        }, 1000);
      }
    }
  };

  const onWatchlist = () => {
    dispatch(
      watchlistToggleRequest({
        itemId: item?.id || '0',
        isInWatchlist: getIsInWatchlist(item?.id || '0'),
      })
    );
  };
  return (
    <Container>
      <TopWrapper>
        <Button onPress={() => back()}>
          <BackIcon width={20} height={20} />
        </Button>
        <TopText>{data?.information.type}</TopText>
        <BackgroundTop
          style={{
            opacity: animatedOpacityValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        />
      </TopWrapper>
      <Scroll onScroll={(event) => handleScroll(event)} scrollEventThrottle={16} ref={scrollRef}>
        <Header {...{ data }} />
        <Poster>
          <Card
            url={
              data?.detail?.images
                ? getImage(
                    data?.detail?.images?.poster ||
                      data?.detail?.images?.square ||
                      data?.detail?.images?.tile,
                    'poster'
                  )
                : ''
            }
            width={185}
            height={275}
          />
        </Poster>
        <InnerContent>
          <Actions {...{ data }} id={item?.id || '0'} onPlay={onPlay} onWatchlist={onWatchlist} />
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
              <Action isTrailer width={40} height={40} loop={false} autoPlay={false} />
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
            alignItems: 'center',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
          draggableIcon: {
            backgroundColor: theme.PRIMARY_TEXT_COLOR_OPAQUE,
            width: 50,
            marginTop: 20,
          },
        }}
        onClose={() => {}}
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
    </Container>
  );
};

export default Detail;
