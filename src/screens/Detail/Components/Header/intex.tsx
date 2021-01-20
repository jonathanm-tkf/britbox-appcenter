/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { Animated } from 'react-native';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { isTablet } from '@src/utils/tablet';
import { getImage } from '@src/utils/images';
import { getDimensions } from '@src/utils/dimension';
import { LoadDetailPageResponse } from '@store/modules/detail/types';
import { Container, HeaderBackgroundImage, ImageTop } from './styles';

type Props = {
  data: LoadDetailPageResponse | undefined;
};

const Header = ({ data }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [animatedOpacityBackground] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loaded) {
      Animated.timing(animatedOpacityBackground, {
        toValue: 0,
        useNativeDriver: true,
        duration: 1000,
      }).start();
    }
  }, [loaded]);

  useEffect(() => {
    Animated.timing(animatedOpacityBackground, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  // FIXME: Try to replace this logic with useOrientation
  const [dimensions, setDimensions] = useState({
    orientation: getDimensions().height >= getDimensions().width ? 'PORTRAIT' : 'LANDSCAPE',
    width: getDimensions().width,
    height: getDimensions().height,
  });

  const onOrientationDidChange = useCallback((newOrientation: OrientationType) => {
    const orientation =
      newOrientation === 'LANDSCAPE-LEFT' || newOrientation === 'LANDSCAPE-RIGHT'
        ? 'LANDSCAPE'
        : 'PORTRAIT';
    const screenDimensions = getDimensions();
    const width =
      orientation === 'PORTRAIT'
        ? Math.min(screenDimensions.width, screenDimensions.height)
        : Math.max(screenDimensions.width, screenDimensions.height);

    setDimensions({
      orientation,
      width,
      height: width * (orientation === 'PORTRAIT' ? 0.4 : 0.25),
    });
  }, []);

  useEffect((): (() => void) => {
    if (isTablet()) {
      Orientation.getDeviceOrientation(onOrientationDidChange);
      Orientation.addDeviceOrientationListener(onOrientationDidChange);

      return () => {
        Orientation.removeDeviceOrientationListener(onOrientationDidChange);
      };
    }

    return () => {};
  }, [onOrientationDidChange]);

  return (
    <Container paddingBottom={isTablet() ? 40 : 0}>
      <HeaderBackgroundImage
        width={isTablet() ? dimensions.width : 300}
        height={isTablet() ? dimensions.height : 300}
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
            const image = getImage(
              data?.detail.images.wallpaper,
              'wallpaper',
              isTablet() ? 30 : 10,
              isTablet() ? dimensions.width : 300,
              isTablet() ? dimensions.height : 300
            );

            return image !== 'no-image' ? (
              <ImageTop
                source={{ uri: image }}
                width={dimensions.width}
                height={dimensions.height}
                resizeMode="cover"
                onLoadEnd={() => setLoaded(true)}
              />
            ) : null;
          })()}
        </Animated.View>
      </HeaderBackgroundImage>
    </Container>
  );
};

export default Header;
