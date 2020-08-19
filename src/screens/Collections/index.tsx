import React, { useState, useEffect } from 'react';
import { Animated, NativeScrollEvent } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BackIcon } from '@assets/icons';

import {
  MassiveSDKModelItemSummary,
  MassiveSDKModelPage,
  MassiveSDKModelItemList,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadCollectionPage, loadCollectionList } from '@src/services/detail';
import { getTemplate, getIsCollectionDetail } from '@src/utils/template';
import TitleTreatment from '@screens/Shared/TitleTreatment';
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
import { dataDummy } from './data';
import {
  Container,
  TopWrapper,
  Button,
  BackgroundTop,
  TopText,
  Scroll,
  SpaceNoHeroSlim,
} from './styles';

type RootParamList = {
  Collection: {
    item: MassiveSDKModelItemSummary;
  };
};

type CollectionScreenRouteProp = RouteProp<RootParamList, 'Collection'>;

const Collections = () => {
  const navigation = useNavigation();
  const [showBlueView, setShowBlueView] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const { params } = useRoute<CollectionScreenRouteProp>();
  const { item: itemData } = params || undefined;
  const [data, setData] = useState<MassiveSDKModelPage | undefined>(dataDummy);
  const [isContinuosScroll, setIsContinuosScroll] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingContinuosScroll, setIsLoadingContinuosScroll] = useState(false);
  const [animationContinuosScroll, setAnimationContinuosScroll] = useState(false);

  const back = () => {
    navigation.goBack();
  };

  const getDataDetail = async (path: string) => {
    const { response } = await loadCollectionPage(path);
    setData(response);

    if ((response?.entries || []).length === 0) {
      setError(true);
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

  const getMoreDataContinuosScroll = () => {
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
          page: nextPage,
          pageSize,
          sub,
        }).then(({ response }) => {
          const newData = (data?.entries || []).map((item) => {
            if (getTemplate(item.template || '') === 'grid-infinite') {
              return {
                ...item,
                list: {
                  ...item.list,
                  items: [...(item.list?.items || []), ...(response?.items || [])],
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

  const onDiscoverMore = (card: MassiveSDKModelItemList) => {
    navigateByPath(card);
  };

  return (
    <Container>
      <TopWrapper>
        <Button onPress={() => back()}>
          <BackIcon width={20} height={20} />
        </Button>
        <TopText>{getIsCollectionDetail(data?.template || '') ? '' : data?.title}</TopText>
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
                    onWatchlist={() => {}}
                    onPlay={(element) => onPlay(element)}
                    onDiscoverMore={(element) => onDiscoverMore(element)}
                  />
                ) : (
                  <NewSlider
                    key={key.toString()}
                    slim
                    data={item?.list?.items || []}
                    onWatchlist={() => {}}
                    onPlay={(element) => onPlay(element)}
                    onDiscoverMore={(element) => onDiscoverMore(element)}
                  />
                );
              case 'grid':
                return (
                  <Grid
                    key={key.toString()}
                    items={item?.list?.items || []}
                    title={item?.title || ''}
                  />
                );
              case 'grid-infinite':
                return (
                  <Grid
                    key={key.toString()}
                    items={item?.list?.items || []}
                    title={item?.title || ''}
                    loading={animationContinuosScroll}
                  />
                );
              case 'new':
                return <New key={key.toString()} {...{ item }} />;
              case 'episodes':
                return <Episodes key={key.toString()} {...{ item }} />;
              case 'large-programing':
                return <LargeProgramming key={key.toString()} {...{ item }} />;
              case 'title-treatment':
                return <TitleTreatment key={key.toString()} {...{ item }} />;
              case 'popular':
                return <Popular key={key.toString()} {...{ item }} />;
              case 'standard':
                return <Standard key={key.toString()} {...{ item }} />;
              case 'genre':
                return <Genre key={key.toString()} {...{ item }} />;
              case 'collections':
                return <Collections key={key.toString()} {...{ item }} />;
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
