/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Dimensions, StatusBar, BackHandler, Platform } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { getSystemVersion, isTablet } from 'react-native-device-info';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { immersiveModeOn, immersiveModeOff } from 'react-native-android-immersive-mode';
import { autoPlayOff, castVideoPlayerDetail } from '@store/modules/layout/actions';
import { PostMessage, webViewRef } from '@src/utils/videoPlayerRef';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import { continueWatchingRequest } from '@store/modules/user/actions';
import { Config } from '@src/utils/config';
import { HomeIndicator } from 'react-native-home-indicator';
import { ChromecastWrapper } from './styles';

const { width, height } = Dimensions.get('window');

type RootParamList = {
  VideoPlayer: {
    item: MassiveSDKModelItemSummary;
    isTrailer: boolean;
  };
};

type VideoPlayerScreenRouteProp = RouteProp<RootParamList, 'VideoPlayer'>;

const VideoPlayer = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const token = useSelector((state: AppState) => state.core.token);
  const refreshToken = useSelector((state: AppState) => state.user?.access?.refreshToken || '');
  const layout = useSelector((state: AppState) => state.layout);
  const segment = useSelector((state: AppState) => state.core.segment);
  const dispatch = useDispatch();
  const [connection, setConnection] = useState<NetInfoStateType | undefined>(undefined);
  const { goBack } = useNavigation();
  const { params } = useRoute<VideoPlayerScreenRouteProp>();
  const webview = {
    backgroundColor: 'transparent',
    flex: 1,
    width: height,
    height: width,
  };

  const processMessage = (message: { [name: string]: any }) => {
    const { close, chromecast } = message;
    if (chromecast) {
      GoogleCast.showCastPicker();
      const { currentTime } = message;

      if (currentTime) {
        dispatch(castVideoPlayerDetail({ currentTime, item: params.item }));
      }
    }

    if (close) {
      backArrow();
    }
  };

  const handleBackButtonClick = () => {
    Orientation.lockToPortrait();
    immersiveModeOff();
    backArrow();
    return true;
  };

  useEffect(() => {
    let unmonted = false;
    Orientation.lockToLandscape();
    immersiveModeOn();
    StatusBar.setHidden(true);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    if (!unmonted) {
      NetInfo.fetch().then((state) => {
        const { type } = state;
        setConnection(type || undefined);
      });
    }

    dispatch(autoPlayOff());

    return () => {
      unmonted = true;
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const backArrow = () => {
    Orientation.lockToPortrait();
    immersiveModeOff();
    StatusBar.setHidden(false);
    dispatch(continueWatchingRequest());
    // setParamsToNavigation({ autoPlay: false });
    // navigation.state.params.onSelect({ autoPlay: false });
    goBack();
  };

  const onTrackEvent = () => {
    if (webViewRef.current) {
      PostMessage({
        type: 'player',
        country: segment,
        connection:
          connection === 'wifi' && isTablet()
            ? 'mobile-tablet-main'
            : connection === 'wifi'
            ? 'mobile-phone-main'
            : 'mobile-cellular-main',
        platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
        device_name: layout.device,
        os_version: getSystemVersion(),
        videoid: params.item.id,
        staging: true,
        token,
        ert: refreshToken,
        isTrailer: params.isTrailer,
      });
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.PRIMARY_COLOR,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <HomeIndicator autoHidden />
      {token && (
        <WebView
          ref={webViewRef}
          style={webview}
          onMessage={(event) => {
            const { data } = event.nativeEvent;
            const { message } = JSON.parse(data);
            processMessage(message);
          }}
          // onError={(error) => console.tron.log(error)}
          cacheEnabled={false}
          onLoad={onTrackEvent}
          // onLoad={() => {
          //   onTrackEvent();
          //   console.tron.log({
          //     uri: `${Config.URL_PLAYER}?country=${segment?.toLocaleLowerCase()}&videoid=${
          //       params.item.id
          //     }&token=${token}&ert=${refreshToken}&allow=autoplay&isTrailer=${
          //       params.isTrailer
          //     }&connection=${
          //       connection === 'wifi' && isTablet()
          //         ? 'mobile-tablet-main'
          //         : connection === 'wifi'
          //         ? 'mobile-phone-main'
          //         : 'mobile-cellular-main'
          //     }`,
          //   });
          // }}
          allowsLinkPreview={false}
          originWhitelist={['*']}
          javaScriptEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          source={{
            // uri: `${Config.URL_PLAYER}?country=${segment?.toLocaleLowerCase()}&videoid=${
            uri: `${Config.URL_PLAYER}?country=${segment?.toLocaleLowerCase()}&videoid=${
              params.item.id
            }&token=${token}&ert=${refreshToken}&isTrailer=${params.isTrailer}&connection=${
              connection === 'wifi' && isTablet()
                ? 'mobile-tablet-main'
                : connection === 'wifi'
                ? 'mobile-phone-main'
                : 'mobile-cellular-main'
            }`,
          }}
        />
      )}
      {Platform.OS === 'android' && (
        <ChromecastWrapper>
          <CastButton />
        </ChromecastWrapper>
      )}
    </View>
  );
};

export default VideoPlayer;
