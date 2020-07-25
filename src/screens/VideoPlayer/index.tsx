/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import Constants from '@src/config/Constants';
import { BackIcon } from '@assets/icons';
import { BackButton } from './styles';

const webview = {
  backgroundColor: 'transparent',
};

const VideoPlayer = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const token = useSelector((state: AppState) => state.core.token);

  const insets = useSafeAreaInsets();
  const { goBack } = useNavigation();
  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);

  const backArrow = () => {
    Orientation.lockToPortrait();
    goBack();
  };

  return (
    <View
      style={{
        backgroundColor: theme.PRIMARY_COLOR,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
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
            uri: `${Constants.url_player + token}`,
          }}
          onLoad={() => {}}
          allowsInlineMediaPlayback
          style={webview}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
