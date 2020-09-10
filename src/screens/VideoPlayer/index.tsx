/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Dimensions, StatusBar, BackHandler } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import Constants from '@src/config/Constants';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { isTablet } from 'react-native-device-info';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';

const { width, height } = Dimensions.get('window');

type RootParamList = {
  VideoPlayer: {
    item: MassiveSDKModelItemSummary;
  };
};

type VideoPlayerScreenRouteProp = RouteProp<RootParamList, 'VideoPlayer'>;

const VideoPlayer = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const token = useSelector((state: AppState) => state.core.token);
  const refreshToken = useSelector((state: AppState) => state.user?.access?.refreshToken || '');
  const segment = useSelector((state: AppState) => state.core.segment);

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
    const { close } = message;

    if (close) {
      backArrow();
    }
  };

  const handleBackButtonClick = () => {
    Orientation.lockToPortrait();
    backArrow();
    return true;
  };

  useEffect(() => {
    let unmonted = false;
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    if (!unmonted) {
      NetInfo.fetch().then((state) => {
        const { type } = state;
        setConnection(type || undefined);
      });
    }

    return () => {
      unmonted = true;
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const backArrow = () => {
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
    goBack();
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
      {/* <BackButton onPress={() => backArrow()}>
        <BackIcon />
      </BackButton> */}

      {token && (
        <WebView
          source={{
            uri: `${Constants.url_player}?country=${segment?.toLocaleLowerCase()}&videoid=${
              params.item.id
            }&token=${token}&ert=${refreshToken}&isTrailer=false&connection=${
              connection === 'wifi' && isTablet()
                ? 'mobile-tablet-main'
                : connection === 'wifi'
                ? 'mobile-phone-main'
                : 'mobile-cellular-main'
            }`,
          }}
          // onLoad={() =>
          //   console.tron.log({
          //     uri: `${Constants.url_player}?country=${segment?.toLocaleLowerCase()}&videoid=${
          //       params.item.id
          //     }&token=${token}&ert=${refreshToken}&isTrailer=false&connection=${
          //       connection === 'wifi' && isTablet()
          //         ? 'mobile-tablet-main'
          //         : connection === 'wifi'
          //         ? 'mobile-phone-main'
          //         : 'mobile-cellular-main'
          //     }`,
          //   })
          // }
          // onHttpError={(error) => console.tron.log({ error })}
          // onError={(error) => console.tron.log({ error })}
          onMessage={(event) => {
            const { data } = event.nativeEvent;
            const { message } = JSON.parse(data);
            processMessage(message);
          }}
          allowsInlineMediaPlayback
          style={webview}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
