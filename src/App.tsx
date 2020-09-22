import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { StatusBar, View, ViewStyle } from 'react-native';
import WebView from 'react-native-webview';
import { getSystemName } from 'react-native-device-info';
import Navigation from './navigation/routes';
import Constants from './config/Constants';
import { randomString } from './services/token';

const webViewStyles: ViewStyle = {
  height: 0,
  overflow: 'hidden',
};

export default function App() {
  const webViewRef = useRef<any>(undefined);
  const theme = useSelector((state: AppState) => state.theme);
  const wrapper = {
    flex: 1,
    backgroundColor: theme.theme.PRIMARY_COLOR,
  };

  const onTrackEvent = (data: Record<string, unknown>) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          ...data,
        })
      );
    }
  };

  return (
    <View style={wrapper}>
      <StatusBar barStyle="light-content" backgroundColor={theme.theme.PRIMARY_COLOR} />
      <Navigation onTrackEvent={(data) => onTrackEvent(data)} />
      <View style={webViewStyles}>
        <WebView
          ref={webViewRef}
          source={{
            uri: `${Constants.analitycs}?id=${randomString()}&platform=${getSystemName()}`,
          }}
        />
      </View>
    </View>
  );
}
