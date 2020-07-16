import React from 'react';
import { Dimensions, StyleSheet, View, Button } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { SharedElement } from 'react-navigation-shared-element';

import { toggleTabs } from '@src/utils';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import FastImage from 'react-native-fast-image';
import { Container } from './styled';

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
    marginTop: getStatusBarHeight(),
    padding: 16,
  },
});
const Detail = () => {
  const { goBack, getParam, dangerouslyGetParent } = useNavigation();
  const { item } = getParam('item');
  const parent = dangerouslyGetParent();
  console.tron.log({ item });
  const back = () => {
    if (parent) {
      toggleTabs(parent, true);
    }
    goBack();
  };

  return (
    <Container>
      {/* <Image style={styles.background} resizeMode="cover" source={listing.picture} />
       */}
      <View style={styles.wrapper}>
        <SharedElement id={item.id}>
          <FastImage style={styles.image} resizeMode="cover" source={{ uri: item.url }} />
        </SharedElement>
      </View>
      <View style={styles.thumbnailOverlay}>
        <Button title="X" onPress={() => back()} />
      </View>
    </Container>
  );
};

Detail.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const { item } = navigation.getParam('item');
  return [item.id];
};

export default Detail;
