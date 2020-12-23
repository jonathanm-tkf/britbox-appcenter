import { AppState } from '@store/modules/rootReducer';
import { ThemeProps } from '@store/modules/theme/types';
import React, { ReactNode, useMemo } from 'react';
import { View, Animated, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useSelector } from 'react-redux';
import { withTheme } from 'styled-components';
import { Container } from './styles';

type Props = {
  header: () => ReactNode;
  children: ReactNode;
  readonly theme: ThemeProps;
  onScroll?: (event: any) => void;
};

type PositionType = 'absolute' | 'relative' | undefined;

const StickyHeader = ({ header, children, theme, onScroll }: Props) => {
  const heightHeader = 80 + getStatusBarHeight();
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, heightHeader);
  const translateY = diffClamp.interpolate({
    inputRange: [0, heightHeader],
    outputRange: [0, -heightHeader],
  });

  const { isShowMiniController } = useSelector((state: AppState) => state.layout);

  const animationHeaderStyles = {
    position: 'absolute' as PositionType,
    top: Platform.OS === 'ios' ? 10 + getStatusBarHeight() : 0,
    width: '100%',
    elevation: 4,
    zIndex: 4,
    transform: [
      {
        translateY,
      },
    ],
  };

  const viewStyle = useMemo(() => {
    return {
      backgroundColor: theme.PRIMARY_COLOR,
      height: Platform.OS === 'ios' ? 10 + getStatusBarHeight() : 0,
      width: '100%',
      position: 'absolute' as PositionType,
      zIndex: 10,
    };
  }, [theme]);

  return (
    <>
      <View style={viewStyle} />
      <Animated.View style={animationHeaderStyles}>{header()}</Animated.View>
      <Animated.ScrollView
        overScrollMode="never"
        scrollEventThrottle={32}
        bounces={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: true,
            listener: onScroll,
          }
        )}
      >
        {/* <View
          style={{
            height: 75 + getStatusBarHeight(),
            width: '100%',
          }}
        /> */}
        <Container {...{ isShowMiniController }}>{children}</Container>
      </Animated.ScrollView>
    </>
  );
};

export default withTheme(StickyHeader);
