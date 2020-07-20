import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { toggleTabs } from '@src/utils';
import { BackIcon, WatchlistIcon } from '@assets/icons';
import Card from '@components/Card';
import Action from '@components/Action';
import { Headline, Paragraph } from '@components/Typography';
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

const Detail = () => {
  const { goBack, getParam, dangerouslyGetParent } = useNavigation();
  const { item } = getParam('item');
  const parent = dangerouslyGetParent();
  const [showBlueView, setShowBlueView] = useState(false);
  const [animatedOpacityValue] = useState(new Animated.Value(0));

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
          <View style={{ width: 100, height: 300 }}>
            <Text>Label</Text>
          </View>

          <View style={{ width: 100, height: 300 }}>
            <Text>Label</Text>
          </View>
          <View style={{ width: 100, height: 300 }}>
            <Text>Label</Text>
          </View>
          <View style={{ width: 100, height: 300 }}>
            <Text>Label</Text>
          </View>
          <View style={{ width: 100, height: 300 }}>
            <Text>Label</Text>
          </View>
        </InnerContent>
      </Scroll>
    </Container>
  );
};

Detail.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const { item } = navigation.getParam('item');
  return [item.id];
};

export default Detail;
