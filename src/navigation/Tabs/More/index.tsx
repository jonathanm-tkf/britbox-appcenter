import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import More from '@screens/More';
import MyAccount from '@screens/MyAccount';
import ParentalControls from '@screens/ParentalControls';
import SignUpSubscription from '@screens/SignUpSubscription';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { Animated } from 'react-native';
import { ThemeProps } from '@store/modules/theme/types';
import { rgba } from 'polished';
import Detail from '@screens/Detail';

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

const MoreStack = createStackNavigator();
const MoreStackScreen = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <MoreStack.Navigator headerMode="none">
      <MoreStack.Screen name="More" component={More} />
      <MoreStack.Screen name="MyAccount" component={MyAccount} />
      <MoreStack.Screen name="ParentalControls" component={ParentalControls} />
      <MoreStack.Screen name="AccountSubscription" component={SignUpSubscription} />
      <MoreStack.Screen name="Detail" component={Detail} options={ModalOptions(theme)} />
    </MoreStack.Navigator>
  );
};

export { MoreStackScreen };
