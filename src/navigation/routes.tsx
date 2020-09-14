/* eslint-disable no-return-assign */
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { AppState as AppStateRN, View, ViewStyle } from 'react-native';
import { configRequest } from '@store/modules/core/actions';
import KochavaTracker from 'react-native-kochava-tracker';
import NetInfo from '@react-native-community/netinfo';
import { isTablet, getSystemVersion, getSystemName, getDeviceName } from 'react-native-device-info';
import { connection, hideSheetBottom } from '@store/modules/layout/actions';
import { refreshToken } from '@src/services/token';
import { refreshTokenSuccess } from '@store/modules/user/actions';
import { WebView } from 'react-native-webview';
import Constants from '@src/config/Constants';
import { TrackPageView } from '@src/services/analytics';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RootStackScreen } from './Root';
import { navigationRef } from './rootNavigation';

const configMapObject: { [name: string]: string } = {};

configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = 'kobbcww-android-test-8gnh';
configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] = 'kobbcww-ios-test-hh8756t';
KochavaTracker.configure(configMapObject);

type Access = {
  refreshToken: string;
};

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
};

type Profile = {
  analyticsSubscriptionStatus: string;
  isInFreeTrail: boolean;
};

export default () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { sheet, isSheetVisible } = useSelector((state: AppState) => state.layout);
  const token = useSelector((state: AppState) => state.core.token);
  const { analyticsSubscriptionStatus, isInFreeTrail } = useSelector(
    (state: AppState) => (state.user?.profile as Profile) || {}
  );
  const { isLogged } = useSelector((state: AppState) => state.user);
  const refresh = useSelector(
    (state: AppState) => (state.user.access as Access)?.refreshToken || ''
  );

  const webViewRef = useRef<any>(undefined);
  const routeNameRef = useRef<any>();
  const sheetRef = useRef<any>(null);

  const webViewStyles: ViewStyle = {
    height: 0,
    overflow: 'hidden',
  };

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

    AppStateRN.addEventListener('change', (event) => {
      if (event === 'active') {
        dispatch(configRequest());
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
    if (isSheetVisible) {
      sheetRef.current!.open();
    } else {
      sheetRef.current!.close();
    }
  }, [isSheetVisible]);

  const handleNavigationChange = async () => {
    const { response } = await refreshToken(token, refresh);

    if (response) {
      dispatch(refreshTokenSuccess({ ...response }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer
        theme={MyTheme}
        ref={navigationRef}
        onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute())}
        onStateChange={() => {
          const previousRoute = routeNameRef.current;
          const currentRoute = navigationRef.current.getCurrentRoute();
          let deviceName = '';

          getDeviceName().then((name) => (deviceName = name));

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
              device_name: deviceName,
            });
            if (webViewRef.current && terms) {
              webViewRef.current.postMessage(
                JSON.stringify({
                  type: 'trackPageView',
                  user,
                  terms,
                })
              );
            }
          }

          // Save the current route name for later comparision
          routeNameRef.current = currentRoute;

          handleNavigationChange();
        }}
      >
        <RootStackScreen />
      </NavigationContainer>
      <View style={webViewStyles}>
        <WebView ref={webViewRef} source={{ uri: `${Constants.analitycs}?id=${uuid()}` }} />
      </View>
      <RBSheet
        ref={sheetRef}
        height={sheet.height}
        closeOnDragDown
        closeOnPressMask={false}
        customStyles={{
          container: {
            alignItems: 'center',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
          draggableIcon: {
            backgroundColor: theme.PRIMARY_TEXT_COLOR_OPAQUE,
            width: 50,
            marginTop: 20,
          },
        }}
        onClose={() => dispatch(hideSheetBottom())}
      >
        {sheet.content()}
      </RBSheet>
    </ThemeProvider>
  );
};
