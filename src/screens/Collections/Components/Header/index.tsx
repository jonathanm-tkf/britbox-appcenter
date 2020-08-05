import React, { useState, useEffect } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

import Shimmer from '@components/Shimmer';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { Animated, Dimensions } from 'react-native';
import { Container, HeaderBackgroundImage } from './styles';

const { width } = Dimensions.get('window');

const ContainerStyle = {
  width: width + 16,
  flex: 1,
};

const Header = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [loaded] = useState(false);
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
          visible={false}
          shimmerComponent={() => (
            <ContentLoader
              speed={1}
              backgroundColor={theme.PRIMARY_COLOR}
              foregroundColor={theme.PRIMARY_COLOR_OPAQUE}
              style={ContainerStyle}
            >
              <Rect x={-8} y="64" rx="8" ry="8" width="20%" height="240" />
              <Rect x="80%" y="64" rx="8" ry="8" width="20%" height="240" />
              <Rect x={width / 2 - 90} y="50" rx="8" ry="8" width="180" height="275" />

              <Rect x="11%" y="350" rx="8" ry="8" width="75%" height="20" />
              <Rect x="4%" y="380" rx="8" ry="8" width="87%" height="20" />
              <Rect x="11%" y="410" rx="8" ry="8" width="75%" height="20" />

              <Rect x={width / 2 - 105 - 20 + 8} y="480" rx="8" ry="8" width="50" height="50" />
              <Rect x={width / 2 - 35 - 20 + 16} y="460" rx="8" ry="8" width="70" height="100" />
              <Rect x={width / 2 + 55 - 20 + 24} y="470" rx="8" ry="8" width="70" height="70" />
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
            {/* {(() => {
              const image = getImage(data?.detail.images.wallpaper, 'wallpaper');
              return image !== 'no-image' ? (
                <ImageTop
                  source={{ uri: image }}
                  resizeMode="cover"
                  onLoadEnd={() => setLoaded(true)}
                />
              ) : null;
            })()} */}
          </Animated.View>
        </Shimmer>
      </HeaderBackgroundImage>
    </Container>
  );
};

export default Header;
