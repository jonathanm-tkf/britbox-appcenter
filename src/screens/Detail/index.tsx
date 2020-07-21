import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { toggleTabs } from '@src/utils';
import { BackIcon, WatchlistIcon } from '@assets/icons';
import Card from '@components/Card';
import Action from '@components/Action';
import { Headline, Paragraph } from '@components/Typography';
import TabsComponent from '@components/TabsComponent';
import { useTranslation } from 'react-i18next';
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
} from './styled';
import Episodes from './Components/Episodes/indext';
import Information from './Components/Information';

type HeightType = string | number;

const Detail = () => {
  const { goBack, getParam, dangerouslyGetParent } = useNavigation();
  const { item } = getParam('item');
  const parent = dangerouslyGetParent();
  const [showBlueView, setShowBlueView] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));
  const { t } = useTranslation('detail');
  const [height, setHeight] = useState<HeightType>('auto');

  const [secondHeight, setSecondHeight] = useState('auto');
  const [threeHeight, setThreeHeight] = useState('auto');

  const DATA = [
    {
      key: 'first',
      title: t('episodes'),
      content: () => <Episodes />,
    },
    {
      key: 'second',
      title: t('information'),
      content: () => (
        <Information onLayout={(event) => setSecondHeight(event.nativeEvent.layout.height)} />
      ),
    },
    {
      key: 'three',
      title: t('more'),
      content: () => (
        <View
          style={[{ flex: 1, backgroundColor: '#6791b7' }]}
          onLayout={(event) => setThreeHeight(event.nativeEvent.layout.height)}
        />
      ),
    },
  ];

  const back = () => {
    if (parent) {
      toggleTabs(parent, true);
    }
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
        <TopText>SHOW</TopText>
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
          <ImageTop source={{ uri: item.url }} />
        </HeaderBackgroundImage>

        <Poster>
          <Card url={item.url} width={185} height={275} />
          <ActionWrapper>
            <ActionButton>
              <WatchlistIcon width={35} height={35} />
            </ActionButton>
            <ActionButton play>
              <Action isContinue={false} loop autoPlay width={80} height={80} />
              <ActionText>Play now</ActionText>
            </ActionButton>
            <ActionInformationWrapper>
              <ActionInformation>21</ActionInformation>
              <ActionInformation>seasons</ActionInformation>
            </ActionInformationWrapper>
          </ActionWrapper>
        </Poster>

        <InnerContent>
          <Headline>Midsumer Murders</Headline>
          <Paragraph fontSize={14}>
            Welcome to the idyllic Midsomer County filled with quaint villages, picturesque
            landscapes and monstrous murders.
          </Paragraph>
        </InnerContent>
        <TabsComponent routes={DATA} sceneContainerStyle={{ height }} onChangeTab={changeTab} />
      </Scroll>
    </Container>
  );
};

Detail.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const { item } = navigation.getParam('item');
  return [item.id];
};

export default Detail;
