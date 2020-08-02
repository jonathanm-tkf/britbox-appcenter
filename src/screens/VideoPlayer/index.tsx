/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import Constants from '@src/config/Constants';
import { BackIcon } from '@assets/icons';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { isTablet } from 'react-native-device-info';
import { BackButton } from './styles';

const { width, height } = Dimensions.get('window');
const webview = {
  backgroundColor: 'transparent',
  flex: 1,
  width: height,
  height: width,
};

const VideoPlayer = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const token = useSelector((state: AppState) => state.core.token);

  const [connection, setConnection] = useState<NetInfoStateType | undefined>(undefined);

  const { goBack } = useNavigation();
  useEffect(() => {
    Orientation.lockToLandscape();

    NetInfo.fetch().then((state) => {
      const { type } = state;
      setConnection(type || undefined);
    });
  }, []);

  const backArrow = () => {
    Orientation.lockToPortrait();
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
            uri: `${Constants.url_player}${token}&connection=${
              connection === 'wifi' && isTablet()
                ? 'mobile-tablet-main'
                : connection === 'wifi'
                ? 'mobile-phone-main'
                : 'mobile-cellular-main'
            }`,
          }}
          // onLoad={() =>
          //   console.tron.log({
          //     url: `${Constants.url_player}${token}&connection=${
          //       connection === 'wifi' && isTablet()
          //         ? 'mobile-tablet-main'
          //         : connection === 'wifi'
          //         ? 'mobile-phone-main'
          //         : 'mobile-cellular-main'
          //     }`,
          //   })
          // }
          allowsInlineMediaPlayback
          style={webview}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
