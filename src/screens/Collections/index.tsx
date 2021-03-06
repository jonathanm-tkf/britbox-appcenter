/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { Animated, NativeScrollEvent, Dimensions, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BackIcon, ArrowBottomIcon } from '@assets/icons';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';

import {
  MassiveSDKModelItemSummary,
  MassiveSDKModelPage,
  MassiveSDKModelItemList,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadCollectionPage } from '@src/services/detail';
import {
  getTemplate,
  getIsCollectionDetail,
  getIsOurFavoritesMultiple,
  getIsListDetail,
} from '@src/utils/template';
// import TitleTreatment from '@screens/Shared/TitleTreatment';
import Genre from '@screens/Shared/Genre';
import Standard from '@screens/Shared/Standard';
// import Popular from '@screens/Shared/Popular';
import LargeProgramming from '@screens/Shared/LargeProgramming';
import Episodes from '@screens/Shared/Episodes';
import New from '@screens/Shared/New';
import NewSlider from '@components/NewSlider';
import Grid from '@screens/Shared/Grid';
import { navigateByPath } from '@src/navigation/rootNavigation';
import ErrorLanding from '@components/ErrorLanding';
import OurFavorites from '@screens/Shared/OurFavorites';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { Header } from '@store/modules/core/types';
import { Item } from '@screens/ModalFilter';
import { wp } from '@src/utils/dimension';
import { checkIsInWatchingList } from '@src/services/watchlist';
import { watchlistToggleRequest } from '@store/modules/user/actions';
import { isTablet } from 'react-native-device-info';
import { loadCollectionList } from '@src/services/util';
import { dataDummy } from './data';
import {
  Container,
  TopWrapper,
  Button,
  BackgroundTop,
  TopText,
  Scroll,
  SpaceNoHeroSlim,
  GridInnerContent,
  Gradient,
  ActionTitle,
  ChangeGenreButton,
  ChangeGenreText,
  ChangeOrderButton,
  ChangeOrderText,
  WrapperContinuosScroll,
  GridInnerContentAfter,
  ActionTitleAfter,
  FilterWrapper,
} from './styles';

const { width } = Dimensions.get('window');

type RootParamList = {
  Collection: {
    item: MassiveSDKModelItemSummary;
    genre: string;
    filter: Item;
  };
};

type CustomFiled = {
  description: string;
};

type CollectionScreenRouteProp = RouteProp<RootParamList, 'Collection'>;

const GridContent = ({ data }: { data: MassiveSDKModelItemSummary }) => {
  const wrapper = {
    width: width - 40,
  };

  return (
    <GridInnerContent style={wrapper}>
      <ActionTitle>{data?.contextualTitle || ''}</ActionTitle>
      <Gradient />
    </GridInnerContent>
  );
};

const GridContentAfter = ({ data }: { data: MassiveSDKModelItemSummary }) => {
  const wrapper = {
    width: width - 40,
  };

  return (
    <GridInnerContentAfter style={wrapper}>
      <ActionTitleAfter>{(data?.customFields as CustomFiled)?.description || ''}</ActionTitleAfter>
    </GridInnerContentAfter>
  );
};

const Collections = () => {
  const navigation = useNavigation();
  const [showBlueView, setShowBlueView] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const { params } = useRoute<CollectionScreenRouteProp>();
  const { item: itemData, genre, filter } = params || undefined;
  const [data, setData] = useState<MassiveSDKModelPage | undefined>(dataDummy);
  const [isContinuosScroll, setIsContinuosScroll] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingContinuosScroll, setIsLoadingContinuosScroll] = useState(false);
  const [animationContinuosScroll, setAnimationContinuosScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const menu = useSelector((state: AppState) => state.core?.menu?.navigation?.header);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { t } = useTranslation('layout');
  const [infiniteGridColumns, setInfiniteGridColumns] = useState<number | undefined>(undefined);
  const { isShowMiniController } = useSelector((state: AppState) => state.layout);
  const { segment } = useSelector((state: AppState) => state.core);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date-added');

  const dispatch = useDispatch();
  const bookmarklist = useSelector(
    (state: AppState) => state.user.profile?.bookmarkList || []
  ) as MassiveSDKModelItemList;

  const getIsInWatchlist = (item: any) =>
    checkIsInWatchingList(bookmarklist?.items || [], item) === 3;

  const containerStyles = {
    marginTop: 10,
    paddingHorizontal: wp(isTablet() ? 7 : 15),
  };

  const isGenre = useMemo(() => {
    if (menu && data) {
      const explore = (menu.filter((item: Header) => item.label === 'Explore') || []).reduce(
        (e) => e
      ).children;

      if (explore && explore?.length > 0) {
        const genreList = (explore.filter((list) => list.label === 'Genre') || [])
          .reduce((l) => l)
          .children.filter(
            (children) => children.label === (data.title || '')?.replace('Britbox - ', '')
          );
        return genreList.length ? t('genre') : data?.title || '';
      }
    }
    return '';
  }, [data, menu, t]);

  const back = () => {
    navigation.goBack();
  };

  const getDataDetail = async (path: string) => {
    const { response } = await loadCollectionPage(path);
    setData(response);

    if ((response?.entries || []).length === 0) {
      setError(true);
    }

    if (getIsListDetail(response?.template || '')) {
      setData({
        ...data,
        template: 'Collection (BBC)',
        title: response?.title,
        entries: [
          {
            template: 'Hero Slim (BBC)',
            list: {
              items: [
                {
                  title: response?.title,
                  images: response?.entries ? response?.entries[0]?.list?.images : {},
                  customFields: {
                    description: response?.entries
                      ? (response?.entries[0]?.list?.customFields as CustomFiled)?.description
                      : '',
                  },
                },
              ],
            },
          },
          ...(response?.entries || []),
        ],
      });
    }

    const checkIsContinuosScroll = getIsContinuosScroll(response || {});

    if (infiniteGridColumns === undefined) {
      setInfiniteGridColumns(
        getIsEpisodeGrid(
          (response?.entries || [])
            .filter((item) => getTemplate(item.template || '') === 'grid-infinite')
            .reduce((item) => item).list?.items || []
        )
          ? isTablet()
            ? 3
            : 2
          : isTablet()
          ? 4
          : 3
      );
    }

    setIsContinuosScroll(checkIsContinuosScroll);
  };

  useEffect(() => {
    Animated.timing(animatedOpacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setShowBlueView(true));

    getDataDetail(itemData?.path || '');

    return () => {
      setData(dataDummy);
      setIsLoadingContinuosScroll(false);
      setIsContinuosScroll(false);
      setError(false);
    };
  }, []);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
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

    if (isCloseToBottom(event.nativeEvent) && !isLoadingContinuosScroll && isContinuosScroll) {
      setIsLoadingContinuosScroll(true);
      getMoreDataContinuosScroll();
    }
  };

  const getIsHeroSlim = () => {
    if (
      data &&
      data.entries &&
      data.entries.filter((item) => getTemplate(item.template || '') === 'hero-slim').length === 0
    ) {
      return <SpaceNoHeroSlim />;
    }

    return null;
  };

  const getIsContinuosScroll = (response: MassiveSDKModelPage) => {
    const result =
      (response &&
        response.entries &&
        response.entries.filter((item) => getTemplate(item.template || '') === 'grid-infinite')) ||
      [];

    if (result.length > 0) {
      const {
        list: {
          paging: { page, total },
        },
      } = result.reduce((item) => item);

      setAnimationContinuosScroll(page !== total);
    }

    return result.length > 0;
  };

  const getListData = () => {
    const {
      paging: { page: nextPage, size: pageSize },
      id,
    } =
      (data?.entries || [])
        .filter((item) => getTemplate(item.template || '') === 'grid-infinite')
        .reduce((item) => item).list || {};

    return { nextPage, pageSize, sub: 'Subscriber', olderId: id };
  };

  const getMoreDataContinuosScroll = (
    reset?: boolean,
    orderFilter?: string,
    orderByFilter?: string
  ) => {
    const { next, page, total } =
      (data?.entries || [])
        .filter((item) => getTemplate(item.template || '') === 'grid-infinite')
        .reduce((item) => item).list?.paging || {};

    if (page !== total || reset) {
      const url = (next || '').split('?');

      if (url.length > 0) {
        const { page: nextPage, page_size: pageSize, sub, olderId } =
          url[url.length - 1] !== ''
            ? JSON.parse(
                `{"${url[url.length - 1].replace(/&/g, '","').replace(/=/g, '":"')}"}`,
                (key, value) => {
                  return key === '' ? value : decodeURIComponent(value);
                }
              )
            : getListData();

        const id = url[0].split('/').pop() || '';

        loadCollectionList(
          {
            id: url[url.length - 1] !== '' ? id : olderId,
            page: reset ? 1 : nextPage,
            pageSize,
            sub,
            order: orderFilter || order,
            orderBy: orderByFilter || orderBy,
          },
          segment
        ).then(({ response }) => {
          const newData = (data?.entries || []).map((item) => {
            if (getTemplate(item.template || '') === 'grid-infinite') {
              return {
                ...item,
                list: {
                  ...item.list,
                  items: reset
                    ? [...(response?.items || [])]
                    : [...(item.list?.items || []), ...(response?.items || [])],
                  paging: { ...response?.paging },
                },
              };
            }
            return item;
          });

          setData({ ...data, entries: newData });
          setIsLoadingContinuosScroll(false);

          if ((page || 0) + 1 === total) {
            setAnimationContinuosScroll(false);
          }
          setLoading(false);
        });
      }
    }
  };

  const onPlay = (card: MassiveSDKModelItemList) => {
    navigateByPath(card);
  };

  const onWatchlist = (card: MassiveSDKModelItemList) => {
    dispatch(
      watchlistToggleRequest({
        itemId: card.type === 'season' ? card?.showId || '0' : card?.id || '0',
        itemCustomId: card?.customId || '0',
        isInWatchlist: getIsInWatchlist(card),
      })
    );
  };

  const onDiscoverMore = (card: MassiveSDKModelItemList) => {
    navigateByPath(card);
  };

  const getIsEpisodeGrid = (items: MassiveSDKModelItemSummary[]) =>
    items.length > 0 ? items.reduce((i) => i).type === 'episode' : false;

  useEffect(() => {
    if (genre) {
      setData(dataDummy);
      getDataDetail(genre);
      setOrder('asc');
      setOrderBy('a-z');
    }
  }, [genre]);

  useEffect(() => {
    if (filter) {
      setLoading(true);
      setOrder(filter.value === 'date-added' ? 'desc' : 'asc');
      setOrderBy(filter.value);
      const newData = (data?.entries || []).map((item) => {
        if (getTemplate(item.template || '') === 'grid-infinite') {
          return {
            ...item,
            list: {
              ...item.list,
              items: [
                ...(dataDummy.entries
                  .filter(
                    (f: { template: string }) =>
                      f.template ===
                      (infiniteGridColumns === 3
                        ? 'Continuous Scroll Automatic'
                        : 'Continuous Scroll Automatic Episode')
                  )
                  .reduce((element) => element).list.items || []),
              ],
            },
          };
        }
        return item;
      });

      setData({ ...data, entries: newData });
      getMoreDataContinuosScroll(
        true,
        filter.value === 'date-added' ? 'desc' : 'asc',
        filter.value
      );
    }
  }, [filter]);

  return (
    <Container>
      <TopWrapper>
        <Button onPress={() => back()}>
          <BackIcon width={20} height={20} />
        </Button>
        <TopText>{getIsCollectionDetail(data?.template || '') ? data?.title : isGenre}</TopText>
        {isGenre === t('genre') && (
          <ChangeGenreButton
            onPress={() => navigation.navigate('ModalGenre', { genre: data?.title || '' })}
          >
            <ChangeGenreText>{data?.title || ''}</ChangeGenreText>
            <ArrowBottomIcon width={10} height={10} fill={theme.PRIMARY_FOREGROUND_COLOR} />
          </ChangeGenreButton>
        )}
        <BackgroundTop
          style={{
            opacity: animatedOpacityValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        />
      </TopWrapper>
      <Scroll onScroll={(event) => handleScroll(event)} scrollEventThrottle={16}>
        {getIsHeroSlim()}
        {data &&
          data.entries &&
          data.entries.map((item, key) => {
            if ((item?.list?.items || []).length === 0) {
              return null;
            }

            switch (getTemplate(item.template || '', true)) {
              case 'hero-slim':
                return getIsCollectionDetail(data?.template || '') ? (
                  <NewSlider
                    key={key.toString()}
                    collection
                    center
                    data={item?.list?.items || []}
                  />
                ) : (
                  <NewSlider
                    key={key.toString()}
                    slim
                    data={item?.list?.items || []}
                    onPlay={(element) => onPlay(element)}
                    onWatchlist={(element) => onWatchlist(element)}
                    onDiscoverMore={(element) => onDiscoverMore(element)}
                  />
                );
              case 'grid':
                return (
                  <Grid
                    key={key.toString()}
                    items={item?.list?.items || []}
                    title={item?.title || ''}
                    numColumns={isTablet() ? 4 : 3}
                    element={{
                      width: vw(isTablet() ? 25 : 33.333) - wp(isTablet() ? 10 : 20),
                      height: vw((isTablet() ? 25 : 33.333) * 1.25),
                      marginBottom: 20,
                      marginHorizontal: wp(isTablet() ? 3 : 5),
                    }}
                    containerStyle={containerStyles}
                  />
                );
              case 'grid-infinite': {
                return infiniteGridColumns ? (
                  <WrapperContinuosScroll key={key.toString()}>
                    <Grid
                      items={item?.list?.items || []}
                      filter={() => (
                        <FilterWrapper>
                          <ChangeOrderButton
                            onPress={() =>
                              navigation.navigate('ModalFilter', {
                                data: [
                                  {
                                    data: [
                                      {
                                        title: t('recent'),
                                        value: 'date-added',
                                        selected: orderBy === 'date-added',
                                      },
                                      {
                                        title: t('az'),
                                        value: 'a-z',
                                        selected: orderBy === 'a-z',
                                      },
                                    ],
                                  },
                                ],
                                previusRoute: 'Collections',
                              })
                            }
                          >
                            <ChangeOrderText>Filter +</ChangeOrderText>
                          </ChangeOrderButton>
                        </FilterWrapper>
                      )}
                      title={
                        getIsCollectionDetail(data?.template || '')
                          ? loading
                            ? `0 ${t('programmes')}`
                            : `${(item?.list?.items || []).length} ${
                                (item?.list?.items || []).length > 1
                                  ? t('programmes')
                                  : t('programme')
                              }`
                          : item?.title || ''
                      }
                      loading={animationContinuosScroll}
                      isEpisode={infiniteGridColumns === 2}
                      numColumns={infiniteGridColumns}
                      element={
                        infiniteGridColumns === 2
                          ? {
                              width: vw(50) - wp(26),
                              height: vw(50) - vw(26),
                              marginBottom: 70,
                              marginHorizontal: wp(5),
                            }
                          : infiniteGridColumns === 3
                          ? {
                              width: vw(33.333) - wp(20),
                              height: vw(33.333 * 1.25),
                              marginBottom: 20,
                              marginHorizontal: wp(5),
                            }
                          : {
                              width: vw(25) - wp(10),
                              height: vw(25 * 1.25),
                              marginBottom: 20,
                              marginHorizontal: wp(isTablet() ? 3 : 5),
                            }
                      }
                      containerStyle={containerStyles}
                      imageType={infiniteGridColumns === 2 ? 'wallpaper' : 'poster'}
                    />
                  </WrapperContinuosScroll>
                ) : null;
              }
              case 'new':
                return <New key={key.toString()} {...{ item }} />;
              case 'episodes':
                return <Episodes key={key.toString()} {...{ item }} />;
              case 'large-programing':
                return <LargeProgramming key={key.toString()} {...{ item }} />;
              case 'title-treatment':
                return (
                  <Grid
                    key={key.toString()}
                    items={item?.list?.items || []}
                    title={item?.title || ''}
                    imageType={['wallpaper', 'tile']}
                    numColumns={2}
                    element={{
                      width: vw(50) - wp(26),
                      height: vw(50) - vw(26),
                      marginBottom: 20,
                      marginHorizontal: wp(5),
                    }}
                    containerStyle={containerStyles}
                  />
                );
              // case 'popular':
              //   return <Popular key={key.toString()} {...{ item }} />;
              case 'standard':
                return <Standard key={key.toString()} {...{ item }} />;
              case 'genre':
                return <Genre key={key.toString()} {...{ item }} />;
              case 'collections':
                return <Collections key={key.toString()} {...{ item }} />;
              case 'our-favorites':
                return getIsOurFavoritesMultiple((item?.list?.items || []).length) ? (
                  <Grid
                    key={key.toString()}
                    items={item?.list?.items || []}
                    title={item?.list?.title || ''}
                    element={{ width: width - 40, height: 215 }}
                    imageType="wallpaper"
                    cardContent={(card: MassiveSDKModelItemSummary) => <GridContent data={card} />}
                    cardContentAfter={(card: MassiveSDKModelItemSummary) => (
                      <GridContentAfter data={card} />
                    )}
                  />
                ) : (
                  <OurFavorites key={key.toString()} data={item?.list || {}} />
                );
              default:
                return null;
            }
          })}
        <View style={[isShowMiniController ? { paddingBottom: 90 } : {}]} />
      </Scroll>
      {error && <ErrorLanding onPress={() => back()} />}
    </Container>
  );
};

export default Collections;
