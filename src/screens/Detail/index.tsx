import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { toggleTabs } from '@src/utils';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { SharedElement } from 'react-native-shared-element';
import FastImage from 'react-native-fast-image';
import { BackIcon } from '@assets/icons';
import {
  Container,
  HeaderBackgroundImage,
  ImageTop,
  Scroll,
  TopWrapper,
  Button,
  TopText,
  BackgroundTop,
} from './styled';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    position: 'absolute',
    top: 80,
    width,
    height: Math.round((width * 9) / 16),
    zIndex: 3,
  },
  image: {
    width: 185,
    height: 270,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: 'black',
  },
  background: {
    width,
    height: Math.round((width * 9) / 16),
    opacity: 1,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
    height: getStatusBarHeight() + 30,
    padding: 16,
    zIndex: 1,
  },
});

const Detail = () => {
  const { goBack, getParam, dangerouslyGetParent } = useNavigation();
  const { item } = getParam('item');
  const parent = dangerouslyGetParent();
  const back = () => {
    if (parent) {
      toggleTabs(parent, true);
    }
    goBack();
  };

  return (
    <Container>
      <TopWrapper>
        <Button onPress={() => back()}>
          <BackIcon width={20} height={20} />
        </Button>
        <TopText>SHOW</TopText>
        <BackgroundTop />
      </TopWrapper>
      <Scroll>
        <HeaderBackgroundImage>
          <ImageTop source={{ uri: item.url }} />
        </HeaderBackgroundImage>

        <View style={styles.wrapper}>
          <SharedElement id={item.id}>
            <FastImage style={styles.image} resizeMode="cover" source={{ uri: item.url }} />
          </SharedElement>
        </View>

        <View style={{ flex: 1 }}>
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
        </View>
      </Scroll>
    </Container>
  );
};

Detail.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const { item } = navigation.getParam('item');
  return [item.id];
};

export default Detail;
