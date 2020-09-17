/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { BackIcon } from '@assets/icons';
import Card from '@components/Card';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import {
  MassiveSDKModelItemList,
  MassiveSDKModelItemSummary,
  MassiveSDKModelSeasonsItem,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadDetailPage, LoadDetailPageResponse, loadEpisodesBySeason } from '@src/services/detail';
import { getImage } from '@src/utils/images';
import { fill } from 'lodash';
import Bookmark from '@components/Bookmark';
import { CastVideo } from '@src/services/cast';
import { AppState } from '@store/modules/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { watchlistToggleRequest } from '@store/modules/user/actions';
import { checkIsInWatchingList } from '@src/services/watchlist';
import { showSheetBottom } from '@store/modules/layout/actions';
import {
  detailClear,
  detailRequestSuccess,
  detailWatchedSuccess,
} from '@store/modules/detail/actions';
import { MassiveSDKModelWatched } from '@src/sdks/Britbox.API.Account.TS/api';
import {
  Container,
  Scroll,
  TopWrapper,
  Button,
  TopText,
  BackgroundTop,
  Poster,
  InnerContent,
  WrapperBookmarks,
} from './styled';
import Header from './Components/Header/intex';
import Actions from './Components/Actions';
import Description from './Components/Description';
import Tabs from './Components/Tabs';

type RootParamList = {
  Detail: {
    item: MassiveSDKModelItemSummary;
    seasonModal: MassiveSDKModelSeasonsItem;
  };
};

type DetailScreenRouteProp = RouteProp<RootParamList, 'Detail'>;

const Detail = () => {
  const { params } = useRoute<DetailScreenRouteProp>();
  const { item, seasonModal } = params || undefined;
  const navigation = useNavigation();
  const [showBlueView, setShowBlueView] = useState(false);
  const [tabsOffset, setTabsOffset] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const isCast = useSelector((state: AppState) => state.layout.cast);
  const data = useSelector((state: AppState) => state.detail.data);

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
    dispatch(detailRequestSuccess(response));
  };

  useEffect(() => {
    if (item) {
      getDataDetail(item?.path || '', item?.customId || '');
    }
  }, [item]);

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
        dispatch(detailRequestSuccess(newData));
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
        dispatch(detailRequestSuccess(afterResponse));
      });
    }
  }, [seasonModal]);

  const back = () => {
    // goBack();
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
    };
  }, []);

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

  const onPlay = () => {
    if (!user.profile?.canStream || false) {
      dispatch(showSheetBottom());
      return false;
    }

    if (isCast) {
      return CastVideo(item);
    }

    return navigation.navigate('VideoPlayer', { item });
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
        </InnerContent>
        <Tabs
          {...{ data }}
          onScrollTo={(y) => onScrollTo(y)}
          onLayout={(event) => {
            const {
              layout: { y },
            } = event.nativeEvent;
            setTabsOffset(y);
          }}
        />
      </Scroll>
    </Container>
  );
};

export default Detail;
