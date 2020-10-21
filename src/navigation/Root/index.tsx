import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { getBuildNumber } from 'react-native-device-info';
import { AppState } from '@store/modules/rootReducer';
import Storybook from '@screens/Storybook';
import { rgba } from 'polished';
import VideoPlayer from '@screens/VideoPlayer';
import Modal from '@screens/Modal';
import Loading from '@screens/Loading';
import ModalSeasons from '@screens/ModalSeasons';
import { Animated, Platform } from 'react-native';
import { ThemeProps } from '@store/modules/theme/types';
import ModalMoreInformation from '@screens/ModalMoreInformation';
import Orientation from 'react-native-orientation-locker';
import ModalGenre from '@screens/ModalGenre';
import ModalFilter from '@screens/ModalFilter';
import ModalTerms from '@screens/Terms';
import ModalPrivacyPolicy from '@screens/PrivacyPolicy';
import ErrorLanding from '@components/ErrorLanding';
import VersionUpgrade from '@components/VersionUpgrade';
import { getTextInConfigJSON } from '@src/utils/object';
import NetInfo from '@react-native-community/netinfo';
import LostConnection from '@screens/LostConnection';
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

const VersionModal = () => {
  return <VersionUpgrade />;
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const user = useSelector((state: AppState) => state.user);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const isLoading = useSelector((state: AppState) => state.layout.loading);
  const isOut = useSelector((state: AppState) => state.layout.out);
  const [lostConnection, setLostConnection] = useState(false);
  const [versionModal, setVersionModal] = useState(false);

  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);

  const checkVersion = async () => {
    try {
      const minVersion = getTextInConfigJSON(['force-upgrade', `min-version-${Platform.OS}`], '');
      const curVersion = getBuildNumber();
      if (curVersion < minVersion) {
        setVersionModal(true);
      }
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    checkVersion();
  }, [britboxConfig]);

  useEffect(() => {
    Orientation.lockToPortrait();

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setLostConnection(true);
      } else {
        setLostConnection(false);
      }
    });
    return () => {
      unsubscribe();
    };
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
        ) : lostConnection ? (
          <RootStack.Screen name="LostConnection" component={LostConnection} />
        ) : isOut ? (
          <RootStack.Screen name="Out" component={Error} />
        ) : versionModal ? (
          <RootStack.Screen name="VersionModal" component={VersionModal} />
        ) : user.isLogged && !isOut ? (
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
        <RootStack.Screen name="Terms" component={ModalTerms} options={ModalOptions(theme)} />
        <RootStack.Screen
          name="PrivacyPolicy"
          component={ModalPrivacyPolicy}
          options={ModalOptions(theme)}
        />
      </RootStack.Navigator>
    </>
  );
};

export { RootStackScreen };
