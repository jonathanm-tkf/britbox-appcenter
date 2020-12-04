/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, memo } from 'react';
import { Animated } from 'react-native';
import { getImage } from '@src/utils/images';
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

  return (
    <Container>
      <HeaderBackgroundImage>
        <Animated.View
          style={{
            opacity: animatedOpacityBackground.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        >
          {(() => {
            const image = getImage(data?.detail.images.wallpaper, 'wallpaper', 30, 300, 300);
            return image !== 'no-image' ? (
              <ImageTop
                source={{ uri: image }}
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

export default memo(Header);
