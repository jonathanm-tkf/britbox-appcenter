import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Explore from '@screens/Explore';
import { ThemeProps } from '@store/modules/theme/types';
import { rgba } from 'polished';
import { Animated } from 'react-native';
import Detail from '@screens/Detail';
import Collections from '@screens/Collections';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import AZ from '@screens/AZ';
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

const ExploreStack = createStackNavigator();
const ExploreStackScreen = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <ExploreStack.Navigator headerMode="none">
      <ExploreStack.Screen name="Explore" component={Explore} />
      <ExploreStack.Screen name="AZ" component={AZ} options={ModalOptions(theme)} />
      <ExploreStack.Screen name="Watchlist" component={Watchlist} options={ModalOptions(theme)} />
      <ExploreStack.Screen name="Detail" component={Detail} options={ModalOptions(theme)} />
      <ExploreStack.Screen
        name="Collections"
        component={Collections}
        options={ModalOptions(theme)}
      />
    </ExploreStack.Navigator>
  );
};

export { ExploreStackScreen };
