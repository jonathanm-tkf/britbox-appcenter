/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { BackIcon } from '@assets/icons';
import Card from '@components/Card';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import {
  MassiveSDKModelItemSummary,
  MassiveSDKModelSeasonsItem,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadDetailPage, LoadDetailPageResponse, loadEpisodesBySeason } from '@src/services/detail';
import { getImage } from '@src/utils/images';
import { fill } from 'lodash';
import {
  Container,
  Scroll,
  TopWrapper,
  Button,
  TopText,
  BackgroundTop,
  Poster,
  InnerContent,
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
  const { goBack } = useNavigation();
  const [showBlueView, setShowBlueView] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const [data, setData] = useState<LoadDetailPageResponse | undefined>(undefined);

  const getDataDetail = async (path: string) => {
    const { response }: { response: LoadDetailPageResponse } = await loadDetailPage(path);
    setData(response);
  };

  useEffect(() => {
    getDataDetail(item?.path || '');
  }, [item]);

  useEffect(() => {
    if (data?.information.type === 'show' || data?.information.type === 'season') {
      const { id, releaseYear, seasonNumber, episodeCount, path } = seasonModal || {};
      const { show }: LoadDetailPageResponse = data;
      const newData: LoadDetailPageResponse = {
        ...data,
        show: {
          id: parseInt(id || '0', 10),
          releaseYear,
          seasonNumber,
          seasons: { ...show?.seasons },
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
          },
          episodes: response?.episodes,
        };
        setData(afterResponse);
      });
    }
  }, [seasonModal]);

  const back = () => {
    goBack();
  };

  useEffect(() => {
    Animated.timing(animatedOpacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setShowBlueView(true));
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
      <Scroll onScroll={(event) => handleScroll(event)} scrollEventThrottle={16}>
        <Header {...{ data }} />
        <Poster>
          <Card
            url={data?.detail?.images ? getImage(data?.detail?.images?.poster, 'poster') : ''}
            width={185}
            height={275}
          />
        </Poster>
        <InnerContent>
          <Actions {...{ data }} />
          <Description {...{ data }} />
        </InnerContent>
        <Tabs {...{ data }} />
      </Scroll>
    </Container>
  );
};

export default Detail;
