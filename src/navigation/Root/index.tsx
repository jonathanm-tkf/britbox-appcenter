import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Storybook from '@screens/Storybook';
import { rgba } from 'polished';
import Detail from '@screens/Detail';
import VideoPlayer from '@screens/VideoPlayer';
import Modal from '@screens/Modal';
import Loading from '@screens/Loading';
import { homeRequest } from '@store/modules/home/actions';
import ModalSeasons from '@screens/ModalSeasons';
import { Animated } from 'react-native';
import { ThemeProps } from '@store/modules/theme/types';
import Collections from '@screens/Collections';
import ModalMoreInformation from '@screens/ModalMoreInformation';
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
  cardStyle: { backgroundColor: rgba(theme.PRIMARY_COLOR, 0.15) },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => EffectModal(progress),
});

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const user = useSelector((state: AppState) => state.user);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const dispatch = useDispatch();
  const home = useSelector((state: AppState) => state.home);

  useEffect(() => {
    if (!user.isLogged) {
      setIsLoading(false);
    }
    dispatch(homeRequest());
  }, []);

  useEffect(() => {
    if (!home.loading && (home.data?.entries || []).length > 0) {
      setIsLoading(false);
    }
  }, [home.data, home.loading, setIsLoading]);

  return (
    <RootStack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }} mode="modal">
      {STORYBOOK_START ? (
        <RootStack.Screen name="Storybook" component={Storybook} />
      ) : isLoading ? (
        <RootStack.Screen name="Loading" component={Loading} />
      ) : user.isLogged ? (
        <RootStack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
      ) : (
        <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
      )}
      <RootStack.Screen name="Modal" component={Modal} options={{ animationEnabled: true }} />
      <RootStack.Screen name="VideoPlayer" component={VideoPlayer} options={ModalOptions(theme)} />
      <RootStack.Screen name="Detail" component={Detail} options={ModalOptions(theme)} />
      <RootStack.Screen name="Collections" component={Collections} options={ModalOptions(theme)} />
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
    </RootStack.Navigator>
  );
};

export { RootStackScreen };
