import React, { useState, useEffect, useMemo } from 'react';
import { Animated, NativeScrollEvent, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BackIcon, ArrowBottomIcon } from '@assets/icons';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';

import {
  MassiveSDKModelItemSummary,
  MassiveSDKModelPage,
  MassiveSDKModelItemList,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadCollectionPage, loadCollectionList } from '@src/services/detail';
import {
  getTemplate,
  getIsCollectionDetail,
  getIsOurFavoritesMultiple,
  getIsListDetail,
} from '@src/utils/template';
// import TitleTreatment from '@screens/Shared/TitleTreatment';
import Genre from '@screens/Shared/Genre';
import Standard from '@screens/Shared/Standard';
import Popular from '@screens/Shared/Popular';
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
  const menu = useSelector((state: AppState) => state.core?.menu?.navigation?.header);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { t } = useTranslation('layout');

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date-added');

  const dispatch = useDispatch();
  const bookmarklist = useSelector(
    (state: AppState) => state.user.profile?.bookmarkList || []
  ) as MassiveSDKModelItemList;

  const getIsInWatchlist = (id: string) =>
    checkIsInWatchingList(bookmarklist?.items || [], id || '0') === 3;

  const containerStyles = {
    marginTop: 10,
    paddingHorizontal: wp(15),
  };

  const isGenre = useMemo(() => {
    if (menu && data) {
      const explore = (menu.filter((item: Header) => item.label === 'Explore') || []).reduce(
        (e) => e
      ).children;

      if (explore && explore?.length > 0) {
        const genreList = (explore.filter((list) => list.label === 'Genre') || [])
          .reduce((l) => l)
          .children.filter((children) => children.label === data.title);
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

  const getMoreDataContinuosScroll = (
    reset?: boolean,
    orderFilter?: string,
    orderByFilter?: string
  ) => {
    const { next, page, total } =
      (data?.entries || [])
        .filter((item) => getTemplate(item.template || '') === 'grid-infinite')
        .reduce((item) => item).list?.paging || {};

    if (page !== total) {
      const url = (next || '').split('?');

      if (url.length > 0) {
        const { page: nextPage, page_size: pageSize, sub } = JSON.parse(
          `{"${url[url.length - 1].replace(/&/g, '","').replace(/=/g, '":"')}"}`,
          (key, value) => {
            return key === '' ? value : decodeURIComponent(value);
          }
        );
        const id = url[0].split('/').pop() || '';

        loadCollectionList({
          id,
          page: reset ? 1 : nextPage,
          pageSize,
          sub,
          order: orderFilter || order,
          orderBy: orderByFilter || orderBy,
        }).then(({ response }) => {
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
        itemId: card?.id || '0',
        isInWatchlist: getIsInWatchlist(card?.id || '0'),
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
    }
  }, [genre]);

  useEffect(() => {
    if (filter) {
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
                  .filter((f: { template: string }) => f.template === 'Continuous Scroll Automatic')
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

            switch (getTemplate(item.template || '')) {
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
                    numColumns={3}
                    element={{
                      width: vw(33.333) - wp(20),
                      height: vw(33.333 * 1.25),
                      marginBottom: 20,
                      marginHorizontal: wp(5),
                    }}
                    containerStyle={containerStyles}
                  />
                );
              case 'grid-infinite':
                return (
                  <WrapperContinuosScroll key={key.toString()}>
                    <ChangeOrderButton
                      onPress={() =>
                        navigation.navigate('ModalFilter', {
                          // title: t('filter'),
                          data: [
                            {
                              // title: t('order'),
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
                    <Grid
                      items={item?.list?.items || []}
                      title={
                        getIsCollectionDetail(data?.template || '')
                          ? `${(item?.list?.items || []).length} ${
                              (item?.list?.items || []).length > 1
                                ? t('programmes')
                                : t('programme')
                            }`
                          : item?.title || ''
                      }
                      loading={animationContinuosScroll}
                      isEpisode={getIsEpisodeGrid(item?.list?.items || [])}
                      numColumns={getIsEpisodeGrid(item?.list?.items || []) ? 2 : 3}
                      element={
                        getIsEpisodeGrid(item?.list?.items || [])
                          ? {
                              width: vw(50) - wp(26),
                              height: vw(50) - vw(26),
                              marginBottom: 70,
                              marginHorizontal: wp(5),
                            }
                          : {
                              width: vw(33.333) - wp(20),
                              height: vw(33.333 * 1.25),
                              marginBottom: 20,
                              marginHorizontal: wp(5),
                            }
                      }
                      containerStyle={containerStyles}
                      imageType={getIsEpisodeGrid(item?.list?.items || []) ? 'wallpaper' : 'poster'}
                    />
                  </WrapperContinuosScroll>
                );
              case 'new':
                return <New key={key.toString()} {...{ item }} />;
              case 'episodes':
                return getIsCollectionDetail(data?.template || '') ? (
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
                ) : (
                  <Episodes key={key.toString()} {...{ item }} />
                );
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
              case 'popular':
                return <Popular key={key.toString()} {...{ item }} />;
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
      </Scroll>
      {error && <ErrorLanding onPress={() => back()} />}
    </Container>
  );
};

export default Collections;
