/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import Constants from '@src/config/Constants';
import { BackIcon } from '@assets/icons';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { isTablet } from 'react-native-device-info';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { BackButton } from './styles';

const { width, height } = Dimensions.get('window');
const webview = {
  backgroundColor: 'transparent',
  flex: 1,
  width: height,
  height: width,
};

type RootParamList = {
  VideoPlayer: {
    item: MassiveSDKModelItemSummary;
  };
};

type VideoPlayerScreenRouteProp = RouteProp<RootParamList, 'VideoPlayer'>;

const VideoPlayer = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const token = useSelector((state: AppState) => state.core.token);

  const [connection, setConnection] = useState<NetInfoStateType | undefined>(undefined);

  const { goBack } = useNavigation();
  const { params } = useRoute<VideoPlayerScreenRouteProp>();

  useEffect(() => {
    let unmonted = false;
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);

    if (!unmonted) {
      NetInfo.fetch().then((state) => {
        const { type } = state;
        setConnection(type || undefined);
      });
    }
    return () => {
      unmonted = true;
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
      <BackButton onPress={() => backArrow()}>
        <BackIcon />
      </BackButton>
      {token && (
        <WebView
          source={{
            uri: `${Constants.url_player}${params.item.id}?token=${token}&connection=${
              connection === 'wifi' && isTablet()
                ? 'mobile-tablet-main'
                : connection === 'wifi'
                ? 'mobile-phone-main'
                : 'mobile-cellular-main'
            }`,
          }}
          onLoad={() =>
            console.tron.log({
              url: `${Constants.url_player}${params.item.id}?token=${token}&connection=${
                connection === 'wifi' && isTablet()
                  ? 'mobile-tablet-main'
                  : connection === 'wifi'
                  ? 'mobile-phone-main'
                  : 'mobile-cellular-main'
              }`,
            })
          }
          allowsInlineMediaPlayback
          style={webview}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
