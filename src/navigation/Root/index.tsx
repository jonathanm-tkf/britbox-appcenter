/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildNumber } from 'react-native-device-info';
import { AppState } from '@store/modules/rootReducer';
import Storybook from '@screens/Storybook';
import { rgba } from 'polished';
import VideoPlayer from '@screens/VideoPlayer';
import ModalSeasons from '@screens/ModalSeasons';
import { Animated, Linking, Platform } from 'react-native';
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
import FailedGetProfile from '@screens/FailedGetProfile';
import { BritboxAPIContentModelsItemsGetItemRelatedListResponse } from '@src/sdks/Britbox.API.Content.TS/api';
import { setDeepLinkUrl } from '@store/modules/home/actions';
import { getItemContent } from '@store/modules/home/saga';
import { AppDrawerScreen } from '../Drawer';
import { AuthStackScreen } from '../Auth';
import { navigateByPath } from '../rootNavigation';

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
  const { isLogged } = useSelector((state: AppState) => state.user);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const isOut = useSelector((state: AppState) => state.layout.out);
  const failedGetProfile = useSelector((state: AppState) => state.layout.failedGetProfile);
  const [lostConnection, setLostConnection] = useState(false);
  const [versionModal, setVersionModal] = useState(false);
  const dispatch = useDispatch();

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

  const appWokeUp = useCallback(async (event: any) => {
    const { url } = event;
    if (url) {
      if (Platform.OS === 'ios') {
        const route = url?.split('://');

        if (route && route[1]) {
          const routeName = route[1]?.split('/');

          if (routeName && routeName[0]) {
            if (routeName[0] === 'watch' || routeName[0] === 'open') {
              const response: BritboxAPIContentModelsItemsGetItemRelatedListResponse = await getItemContent(
                routeName[1]
              );

              if (response && response?.externalResponse) {
                const { externalResponse } = response;
                navigateByPath(externalResponse, routeName[0] === 'watch');
              }
            }
          }
        }
      } else {
        const route = url?.split('www.britbox.com');

        if (route[1] && route[1] !== '') {
          if (/\/show\/|\/movie\/|\/season\/|\/episode\//.test(route[1] || '')) {
            navigateByPath({ path: route[1], customId: true }, !(route[1] || '').includes('_'));
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', (event) => {
      if (isLogged) {
        appWokeUp(event);
      } else {
        dispatch(setDeepLinkUrl(event?.url));
      }
    });
  }, [appWokeUp]);

  return (
    <>
      <RootStack.Navigator
        headerMode="none"
        screenOptions={{ animationEnabled: false }}
        mode="modal"
      >
        {STORYBOOK_START ? (
          <RootStack.Screen name="Storybook" component={Storybook} />
        ) : lostConnection ? (
          <RootStack.Screen name="LostConnection" component={LostConnection} />
        ) : isOut ? (
          <RootStack.Screen name="Out" component={Error} />
        ) : versionModal ? (
          <RootStack.Screen name="VersionModal" component={VersionModal} />
        ) : failedGetProfile && user.isLogged ? (
          <RootStack.Screen name="FailedGetProfile" component={FailedGetProfile} />
        ) : user.isLogged && !isOut ? (
          <RootStack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
        ) : (
          <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
        )}
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
