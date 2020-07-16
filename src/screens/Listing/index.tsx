import React from 'react';
import { Dimensions, Image, StyleSheet, View, Button } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { SharedElement } from 'react-navigation-shared-element';

import { Description } from '@components/index';
import { Listing as ListingModel } from '@components/Listing';
import { toggleTabs } from '@src/utils';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 4,
    height: '100%',
    // height: 500,
    backgroundColor: '#171b23',
    // backgroundColor: 'white',
  },
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
const Listing = () => {
  const { goBack, getParam, dangerouslyGetParent } = useNavigation();
  const listing: ListingModel = getParam('listing');
  const parent = dangerouslyGetParent();

  const back = () => {
    if (parent) {
      toggleTabs(parent, true);
    }
    goBack();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.background} resizeMode="cover" source={listing.picture} />
      <View style={styles.wrapper}>
        <SharedElement id={listing.id}>
          <Image style={styles.image} resizeMode="cover" source={listing.picture} />
        </SharedElement>
      </View>
      <View style={styles.thumbnailOverlay}>
        <Button title="X" onPress={() => back()} />
      </View>
      {/* <SafeAreaView style={styles.thumbnailOverlay}> */}
      {/* </SafeAreaView> */}
      <Description />
    </View>
  );
};

Listing.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
  const listing = navigation.getParam('listing');
  return [listing.id];
};

export default Listing;
