import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@screens/Home';
import AZ from '@screens/AZ';
import { ThemeProps } from '@store/modules/theme/types';
import { rgba } from 'polished';
import { Animated } from 'react-native';
import Detail from '@screens/Detail';
import Collections from '@screens/Collections';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import Watchlist from '@screens/Watchlist';

const EffectModal = (progress: Animated.AnimatedInterpolation) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.25, 0.7, 1],
    }),
  },
  overlayStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: 'clamp',
    }),
  },
});

const ModalOptions = (theme: ThemeProps) => ({
  gestureEnabled: false,
  animationEnabled: true,
  cardStyle: { backgroundColor: rgba(theme.PRIMARY_COLOR, 0.15) },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => EffectModal(progress),
});

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="AZ" component={AZ} options={ModalOptions(theme)} />
      <HomeStack.Screen name="Watchlist" component={Watchlist} options={ModalOptions(theme)} />
      <HomeStack.Screen name="Detail" component={Detail} options={ModalOptions(theme)} />
      <HomeStack.Screen name="Collections" component={Collections} options={ModalOptions(theme)} />
    </HomeStack.Navigator>
  );
};

export { HomeStackScreen };
