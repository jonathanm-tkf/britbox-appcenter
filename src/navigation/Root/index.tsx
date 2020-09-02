/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Storybook from '@screens/Storybook';
import { rgba } from 'polished';
import VideoPlayer from '@screens/VideoPlayer';
import Modal from '@screens/Modal';
import Loading from '@screens/Loading';
// import { getConfigRequest } from '@store/modules/user/saga';
import { homeRequest } from '@store/modules/home/actions';
import ModalSeasons from '@screens/ModalSeasons';
import { Animated } from 'react-native';
import { ThemeProps } from '@store/modules/theme/types';
import ModalMoreInformation from '@screens/ModalMoreInformation';
import Orientation from 'react-native-orientation-locker';
import ModalGenre from '@screens/ModalGenre';
import ModalFilter from '@screens/ModalFilter';
import { Segment } from '@store/modules/core/types';
import ErrorLanding from '@components/ErrorLanding';
import { loadingOn, loadingOff } from '@store/modules/layout/actions';
import { AppDrawerScreen } from '../Drawer';
import { AuthStackScreen } from '../Auth';

const STORYBOOK_START = false && __DEV__;

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
  cardStyle: {
    backgroundColor: rgba(theme.PRIMARY_COLOR, 0.15),
  },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => EffectModal(progress),
});

const Error = () => {
  return <ErrorLanding onPress={() => {}} out />;
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const user = useSelector((state: AppState) => state.user);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const isLoading = useSelector((state: AppState) => state.layout.loading);
  const isOut = useSelector((state: AppState) => state.layout.out);
  const dispatch = useDispatch();

  useEffect(() => {
    Orientation.lockToPortrait();
    if (!user.isLogged) {
      dispatch(loadingOff());
    }
  }, []);

  return (
    <>
      <RootStack.Navigator
        headerMode="none"
        screenOptions={{ animationEnabled: false }}
        mode="modal"
      >
        {STORYBOOK_START ? (
          <RootStack.Screen name="Storybook" component={Storybook} />
        ) : isLoading ? (
          <RootStack.Screen name="Loading" component={Loading} />
        ) : isOut ? (
          <RootStack.Screen name="Out" component={Error} />
        ) : user.isLogged ? (
          <RootStack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
        ) : (
          <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
        )}
        <RootStack.Screen name="Modal" component={Modal} options={{ animationEnabled: true }} />
        <RootStack.Screen
          name="VideoPlayer"
          component={VideoPlayer}
          options={ModalOptions(theme)}
        />
        <RootStack.Screen
          name="ModalMoreInformation"
          component={ModalMoreInformation}
          options={ModalOptions(theme)}
        />
        <RootStack.Screen
          name="ModalSeasons"
          component={ModalSeasons}
          options={ModalOptions(theme)}
        />
        <RootStack.Screen name="ModalGenre" component={ModalGenre} options={ModalOptions(theme)} />
        <RootStack.Screen
          name="ModalFilter"
          component={ModalFilter}
          options={ModalOptions(theme)}
        />
      </RootStack.Navigator>
    </>
  );
};

export { RootStackScreen };
