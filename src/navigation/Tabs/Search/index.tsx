import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '@screens/Search';
import AZ from '@screens/AZ';
import { ThemeProps } from '@store/modules/theme/types';
import { rgba } from 'polished';
import { Animated } from 'react-native';
import Collections from '@screens/Collections';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';

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

const SearchStack = createStackNavigator();
const SearchStackScreen = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <SearchStack.Navigator headerMode="none">
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="AZ" component={AZ} options={ModalOptions(theme)} />
      <SearchStack.Screen
        name="Collections"
        component={Collections}
        options={ModalOptions(theme)}
      />
    </SearchStack.Navigator>
  );
};

export { SearchStackScreen };
