import React, { useEffect, useState } from 'react';

import { LoadDetailPageResponse } from '@src/services/detail';
import { Animated } from 'react-native';
import Shimmer from '@components/Shimmer';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { getImage } from '@src/utils/images';
import { Container, HeaderBackgroundImage, ImageTop } from './styles';

type Props = {
  data: LoadDetailPageResponse | undefined;
};

const Header = ({ data }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const theme = useSelector((state: AppState) => state.theme.theme);
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
              const image = getImage(data?.detail.images.wallpaper, 'wallpaper');
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
    </Container>
  );
};

export default Header;
