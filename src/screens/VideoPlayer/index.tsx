/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  StatusBar,
  BackHandler,
  NativeModules,
  NativeEventEmitter,
  Platform,
  InteractionManager,
} from 'react-native';
import { useNavigation, RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { getSystemVersion, getUniqueId, isTablet } from 'react-native-device-info';
import {
  MassiveSDKModelEpisodesItem,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { immersiveModeOn, immersiveModeOff } from 'react-native-android-immersive-mode';
import { autoPlayOff, castVideoPlayerDetail, layoutCasting } from '@store/modules/layout/actions';
import { PostMessage, webViewRef } from '@src/utils/videoPlayerRef';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import { continueWatchingRequest } from '@store/modules/user/actions';
import { Config } from '@src/utils/config';
import { HomeIndicator } from 'react-native-home-indicator';
import { getDimensions } from '@src/utils/dimension';
import { Dismissal, Pause, Play, VideoStart } from '@screens/Shared/Cast/services';
import { pickBy } from 'lodash';
import Action from '@components/Action';
import { BackIcon } from '@assets/icons';
import Orientation from 'react-native-orientation-locker';
import {
  BackButton,
  ChromecastWrapper,
  LoadingContainer,
  LoadingWrapper,
  SafeArea,
} from './styles';

const { width, height } = getDimensions();

type RootParamList = {
  VideoPlayer: {
    item: MassiveSDKModelItemSummary;
    isTrailer: boolean;
  };
};

type VideoPlayerScreenRouteProp = RouteProp<RootParamList, 'VideoPlayer'>;

const VideoPlayer = () => {
  const token = useSelector((state: AppState) => state.core.token);
  const refreshToken = useSelector((state: AppState) => state.user?.access?.refreshToken || '');
  const layout = useSelector((state: AppState) => state.layout);
  const segment = useSelector((state: AppState) => state.core.segment);
  const { watched } = useSelector(
    (state: AppState) => state.user?.profile || { watched: undefined }
  );
  const dispatch = useDispatch();
  const [connection, setConnection] = useState<NetInfoStateType | undefined>(undefined);
  const { goBack } = useNavigation();
  const { params } = useRoute<VideoPlayerScreenRouteProp>();
  const [isLoading, setIsLoading] = useState(true);
  const webview = useMemo(
    () => ({
      backgroundColor: 'transparent',
      flex: 1,
      width: height,
      height: width,
    }),
    [width, height]
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      const { Device } = NativeModules;
      const eventEmitterDevice = new NativeEventEmitter(Device);
      eventEmitterDevice.addListener('DEVICE_SCREEN_OFF', deviceScreenOff);
      eventEmitterDevice.addListener('DEVICE_SCREEN_ON', deviceScreenOn);

      return () => {
        eventEmitterDevice.removeListener('DEVICE_SCREEN_OFF', deviceScreenOff);
        eventEmitterDevice.removeListener('DEVICE_SCREEN_ON', deviceScreenOn);
      };
    }

    return () => {
      setIsLoading(true);
    };
  }, []);

  const deviceScreenOff = useCallback(() => {
    if (webViewRef.current) {
      PostMessage({
        type: 'pause',
      });
    }
    immersiveModeOff();
  }, []);

  const deviceScreenOn = useCallback(() => {
    immersiveModeOn();
  }, []);

  const processMessage = (message: { [name: string]: any }) => {
    const { close, chromecast, analytics } = message;
    if (chromecast) {
      GoogleCast.showCastPicker();
      const { currentTime } = message;
      if (currentTime) {
        dispatch(castVideoPlayerDetail({ currentTime, item: params.item }));
        dispatch(layoutCasting(true));
      }
    }

    if (message.type === 'startPlayer' || !message.loading) {
      setIsLoading(false);
    }

    if (Platform.OS === 'ios' && analytics && params.item) {
      const { type, actualMilisecond } = message;
      switch (type) {
        case 'startPlayer':
          VideoStart(message, getProgress(params.item), params.item);
          break;
        case 'play':
          Play();
          break;
        case 'pause':
          Pause(actualMilisecond / 1000);
          break;
        case 'stop':
          Dismissal(actualMilisecond / 1000);
          break;
        default:
          break;
      }
    }

    if (close) {
      backArrow();
    }
  };

  const handleBackButtonClick = useCallback(() => {
    if (!isTablet()) {
      Orientation.lockToPortrait();
    }

    StatusBar.setHidden(false);
    immersiveModeOff();
    backArrow();
    return true;
  }, []);

  useEffect(() => {
    let unmonted = false;
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

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // Expensive task
        if (!isTablet()) {
          Orientation.lockToLandscape();
        }
      });
      return () => task.cancel();
    }, [])
  );

  const backArrow = useCallback(() => {
    if (!isTablet()) {
      Orientation.lockToPortrait();
    }

    immersiveModeOff();
    StatusBar.setHidden(false);
    dispatch(continueWatchingRequest());
    goBack();
  }, []);

  const onTrackEvent = useCallback(() => {
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
        client_id: getUniqueId(),
        videoid: params.item.id,
        staging: true,
        token,
        ert: refreshToken,
        isTrailer: params.isTrailer || false,
      });
    }
  }, []);

  const getProgress = useCallback((item: MassiveSDKModelEpisodesItem) => {
    const filter = pickBy(watched, (value, key) => key.startsWith(item?.id || ''));
    if (filter[item?.id || '']) {
      const { isFullyWatched, position } = filter[item?.id || ''];
      if (isFullyWatched) {
        return 0;
      }
      return position || 0;
    }
    return 0;
  }, []);

  return (
    <SafeArea
      style={{
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <HomeIndicator autoHidden />
      {isLoading && (
        <LoadingContainer>
          <BackButton onPress={() => backArrow()}>
            <BackIcon width={22} height={22} />
          </BackButton>
          <LoadingWrapper>
            <Action width={88} height={88} loading animated loop autoPlay />
          </LoadingWrapper>
        </LoadingContainer>
      )}
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
          //   console.tron.log({ load: true });
          //   console.tron.log({
          //     // uri: `${'http://localhost:8000/index.html'}?country=${segment?.toLocaleLowerCase()}&videoid=${
          //     uri: `${Config.URL_PLAYER}?country=${segment?.toLocaleLowerCase()}&videoid=${
          //       params.item.id
          //     }&token=${token}&ert=${refreshToken}&allow=autoplay&isTrailer=${
          //       params.isTrailer || false
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
            // uri: `${'http://localhost:8000/index.html'}?country=${segment?.toLocaleLowerCase()}&videoid=${
            uri: `${Config.URL_PLAYER}?country=${segment?.toLocaleLowerCase()}&videoid=${
              params.item.id
            }&token=${token}&ert=${refreshToken}&isTrailer=${
              params.isTrailer || false
            }&connection=${
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
    </SafeArea>
  );
};

export default VideoPlayer;
