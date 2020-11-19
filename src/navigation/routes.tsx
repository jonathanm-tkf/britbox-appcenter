/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { AppState as AppStateRN } from 'react-native';
import KochavaTracker from 'react-native-kochava-tracker';
import NetInfo from '@react-native-community/netinfo';
import {
  isTablet,
  getSystemVersion,
  getSystemName,
  getBuildNumber,
} from 'react-native-device-info';
import { connection } from '@store/modules/layout/actions';
import { refreshTokenWithExpiresIn } from '@src/services/token';
import { getProfileRequest, refreshTokenSuccess } from '@store/modules/user/actions';
import { TrackPageView } from '@src/services/analytics';
import { Segment } from '@store/modules/core/types';
import { activateApp } from '@store/modules/home/actions';
import { Config } from '@src/utils/config';
import { RootStackScreen } from './Root';
import { navigationRef } from './rootNavigation';

const configMapObject: { [name: string]: string } = {};

configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = Config.KOCHAVA_ANDROID;
configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] = Config.KOCHAVA_IOS;
KochavaTracker.configure(configMapObject);

type Access = {
  refreshToken: string;
  expiresIn: string;
};

type Profile = {
  analyticsSubscriptionStatus: string;
  isInFreeTrail: boolean;
};

type Props = {
  onTrackEvent: (data: Record<string, unknown>) => void;
};

export default ({ onTrackEvent }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { token, segment } = useSelector((state: AppState) => state.core);
  const { device } = useSelector((state: AppState) => state.layout);
  const { analyticsSubscriptionStatus, isInFreeTrail } = useSelector(
    (state: AppState) => (state.user?.profile as Profile) || {}
  );
  const { isLogged } = useSelector((state: AppState) => state.user);
  const refresh = useSelector(
    (state: AppState) => (state.user.access as Access)?.refreshToken || ''
  );
  const expiresIn = useSelector(
    (state: AppState) => (state.user.access as Access)?.expiresIn || ''
  );

  const routeNameRef = useRef<any>();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.PRIMARY_COLOR,
      primary: theme.PRIMARY_COLOR,
      card: theme.PRIMARY_COLOR,
      border: theme.PRIMARY_COLOR,
    },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    let unmonted = false;

    AppStateRN.addEventListener('change', (action) => {
      if (action === 'active') {
        dispatch(activateApp());
      }
    });

    if (!unmonted) {
      NetInfo.fetch().then((state) => {
        const { type } = state;
        const connectionType =
          type === 'wifi' && isTablet()
            ? 'mobile-tablet-main'
            : type === 'wifi'
            ? 'mobile-phone-main'
            : 'mobile-cellular-main';
        dispatch(connection(connectionType));
      });
    }

    return () => {
      AppStateRN.removeEventListener('change', () => {});
      unmonted = true;
    };
  }, []);

  useEffect(() => {
    if (segment !== Segment.OUT) {
      dispatch(getProfileRequest());
    }
  }, [segment]);

  const handleNavigationChange = async () => {
    const { response } = await refreshTokenWithExpiresIn(expiresIn, refresh);

    if (response) {
      dispatch(refreshTokenSuccess({ ...response }));
    }
  };

  return (
    <NavigationContainer
      theme={MyTheme}
      ref={navigationRef}
      onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute())}
      onStateChange={() => {
        const previousRoute = routeNameRef.current;
        const currentRoute = navigationRef.current.getCurrentRoute();

        if (previousRoute.name !== currentRoute.name) {
          const { user, terms } = TrackPageView(currentRoute, token, {
            account_status: !isLogged
              ? 'Unauth'
              : typeof analyticsSubscriptionStatus !== 'undefined' ||
                analyticsSubscriptionStatus !== ''
              ? analyticsSubscriptionStatus
              : 'Guest',
            isFreeTrail: isInFreeTrail,
            platform: getSystemName(),
            os_version: getSystemVersion(),
            device_name: device,
            app_version: getBuildNumber(),
            segment,
          });

          if (terms?.page !== '.page')
            onTrackEvent({
              type: 'trackPageView',
              user,
              terms,
            });
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRoute;

        handleNavigationChange();
      }}
    >
      <RootStackScreen />
    </NavigationContainer>
  );
};
