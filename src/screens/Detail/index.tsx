/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

import { BackIcon, WatchlistIcon } from '@assets/icons';
import Card from '@components/Card';
import Action from '@components/Action';
import { Headline, Paragraph } from '@components/Typography';
import TabsComponent from '@components/TabsComponent';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { getDuration } from '@src/utils/template';
import { loadDetailPage, LoadDetailPageResponse } from '@src/services/detail';
import Shimmer from '@components/Shimmer';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { calculateSizeImage } from '@src/utils/images';
import {
  Container,
  HeaderBackgroundImage,
  ImageTop,
  Scroll,
  TopWrapper,
  Button,
  TopText,
  BackgroundTop,
  Poster,
  InnerContent,
  ActionWrapper,
  ActionButton,
  ActionText,
  ActionInformation,
  ActionInformationWrapper,
  PreloadDescription,
} from './styled';
// import Episodes from './Components/Episodes/indext';
import Information from './Components/Information';
import More from './Components/More';

type HeightType = string | number;

type customItem = {
  url: string;
};

type RootParamList = {
  Detail: {
    item: {
      item: MassiveSDKModelItemSummary & customItem;
    };
  };
};

type DetailScreenRouteProp = RouteProp<RootParamList, 'Detail'>;

const Detail = () => {
  const { params } = useRoute<DetailScreenRouteProp>();
  const { item } = params?.item || undefined;

  // console.tron.log({ item });

  const { goBack } = useNavigation();
  const [showBlueView, setShowBlueView] = useState(false);

  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const [animatedOpacityBackground] = useState(new Animated.Value(0));

  const { t } = useTranslation(['detail', 'layout']);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState<HeightType>('auto');
  const [secondHeight, setSecondHeight] = useState('auto');
  const [threeHeight, setThreeHeight] = useState('auto');
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [data, setData] = useState<LoadDetailPageResponse | undefined>(undefined);

  // const [tabsData, setTabsData] = useState([
  //   {
  //     key: 'second',
  //     title: t('information'),
  //     content: () => (
  //       <Information onLayout={(event) => setSecondHeight(event.nativeEvent.layout.height)} />
  //     ),
  //   },
  //   {
  //     key: 'three',
  //     title: t('more'),
  //     content: () => (
  //       <More
  //         onLayout={(event) => {
  //           setThreeHeight(event.nativeEvent.layout.height);
  //         }}
  //       />
  //     ),
  //   },
  // ]);
  const [tabsData, setTabsData] = useState<any>([]);

  // const DATA = [];

  // useEffect(() => {
  //   if (firstLoad) {
  //     if (item.type === 'show') {
  //       setData([
  //         {
  //           key: 'first',
  //           title: t('episodes'),
  //           content: () => <Episodes />,
  //         },
  //         ...data,
  //       ]);
  //     }
  //     // setFirstLoad(false);
  //   }
  // }, [item, firstLoad]);

  const getDataDetail = async (path: string) => {
    const { response }: { response: LoadDetailPageResponse } = await loadDetailPage(path);
    console.tron.log({ response });
    setData(response);

    // if (response.detail.relatedId) {
    //   const { response: relatedResponse } = await loadRelated(response.detail.relatedId);

    // }
    const tabs = [];

    if (response.information) {
      // setTabsData([
      //   {
      //     key: 'second',
      //     title: t('information'),
      //     content: () => (
      //       <Information
      //         data={response.information}
      //         onLayout={(event) => setSecondHeight(event.nativeEvent.layout.height)}
      //       />
      //     ),
      //   },
      //   ...tabsData,
      // ]);
      tabs.push({
        key: 'second',
        title: t('information'),
        content: () => (
          <Information
            data={response.information}
            onLayout={(event) => setSecondHeight(event.nativeEvent.layout.height)}
          />
        ),
      });
    }

    if (response.related) {
      //   setTabsData([
      //     {
      //       key: 'three',
      //       title: t('more'),
      //       content: () => (
      //         <More
      //           onLayout={(event) => {
      //             setThreeHeight(event.nativeEvent.layout.height);
      //           }}
      //         />
      //       ),
      //     },
      //     ...tabsData,
      //   ]);
      tabs.push({
        key: 'three',
        title: t('more'),
        content: () => (
          <More
            onLayout={(event) => {
              setThreeHeight(event.nativeEvent.layout.height);
            }}
          />
        ),
      });
    }

    if (tabs.length > 0) {
      setTabsData(tabs);
      setFirstLoad(false);
    }

    console.tron.log({
      tabsData,
      tabs,
      information: response.information,
      related: response.related,
    });
    // setFirstLoad(false);
  };

  useEffect(() => {
    getDataDetail(item?.path || '');
  }, [item]);

  const back = () => {
    goBack();
  };

  useEffect(() => {
    Animated.timing(animatedOpacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start(() => setShowBlueView(true));

    Animated.timing(animatedOpacityBackground, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (loaded) {
      Animated.timing(animatedOpacityBackground, {
        toValue: 0,
        useNativeDriver: true,
        duration: 1000,
      }).start();
    }
  }, [loaded]);

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

  const changeTab = (index: number) => {
    switch (index) {
      case 1:
        setHeight(secondHeight);
        break;
      case 2:
        setHeight(threeHeight);
        break;
      default:
        setHeight('auto');
        break;
    }
  };

  return (
    <Container>
      <TopWrapper>
        <Button onPress={() => back()}>
          <BackIcon width={20} height={20} />
        </Button>
        <TopText>{item.type}</TopText>
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
        <HeaderBackgroundImage>
          <Shimmer
            visible={loaded}
            shimmerComponent={() => (
              <ContentLoader
                speed={1}
                backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                foregroundColor={theme.PRIMARY_COLOR}
              >
                <Rect x="0" y="0" width="100%" height="100%" />
              </ContentLoader>
            )}
          >
            <Animated.View
              style={{
                opacity: animatedOpacityBackground.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              }}
            >
              {(() => {
                const image = calculateSizeImage(data?.detail.images.wallpaper, 'wallpaper');
                return image !== 'no-image' ? (
                  <ImageTop
                    source={{ uri: image }}
                    resizeMode="cover"
                    onLoadEnd={() => setLoaded(true)}
                  />
                ) : null;
              })()}
            </Animated.View>
          </Shimmer>
        </HeaderBackgroundImage>

        <Poster>
          <Card
            url={
              data?.detail.images.poster
                ? calculateSizeImage(data?.detail.images.poster, 'poster')
                : ''
            }
            width={185}
            height={275}
          />
          <ActionWrapper>
            <ActionButton>
              <WatchlistIcon width={35} height={35} />
            </ActionButton>
            <ActionButton play>
              <Action isContinue={false} loop autoPlay width={80} height={80} />
              <ActionText>Play now</ActionText>
            </ActionButton>
            <ActionInformationWrapper>
              <ActionInformation>
                {item.type === 'show' || item.type === 'season'
                  ? item.availableSeasonCount
                  : getDuration(item.duration || 0)}
              </ActionInformation>
              <ActionInformation>
                {item.type === 'show' || item.type === 'season'
                  ? Number(item.availableSeasonCount) > 1
                    ? t('seasons')
                    : t('season')
                  : t('min')}
              </ActionInformation>
            </ActionInformationWrapper>
          </ActionWrapper>
        </Poster>

        <InnerContent>
          <Shimmer
            visible={!!data?.detail}
            shimmerComponent={() => (
              <PreloadDescription>
                <ContentLoader
                  speed={1}
                  backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                  foregroundColor={theme.PRIMARY_COLOR}
                >
                  <Rect x="0" y="0" rx="8" ry="8" width="50%" height="40" />
                  <Rect x="0" y="50" rx="8" ry="8" width="100%" height="20" />
                  <Rect x="0" y="80" rx="8" ry="8" width="100%" height="20" />
                  <Rect x="0" y="110" rx="8" ry="8" width="100%" height="20" />
                </ContentLoader>
              </PreloadDescription>
            )}
          >
            <>
              <Headline>{data?.detail.title}</Headline>
              <Paragraph fontSize={14}>{data?.detail.description}</Paragraph>
            </>
          </Shimmer>
        </InnerContent>

        {!firstLoad && (
          <TabsComponent
            routes={tabsData}
            sceneContainerStyle={{ height }}
            onChangeTab={changeTab}
          />
        )}
      </Scroll>
    </Container>
  );
};

export default Detail;
