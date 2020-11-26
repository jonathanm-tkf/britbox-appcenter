import { randomString } from '@src/services/token';
import React, { memo, useImperativeHandle, useRef } from 'react';
import { View, ViewStyle } from 'react-native';
import Config from 'react-native-config';
import { getSystemName } from 'react-native-device-info';
import WebView from 'react-native-webview';

const webViewStyles: ViewStyle = {
  height: 0,
  overflow: 'hidden',
};

const Analitycs = React.forwardRef((_, ref) => {
  const webViewRef = useRef<any>(undefined);

  const onTrackEvent = (data: Record<string, unknown>) => {
    webViewRef.current.postMessage(
      JSON.stringify({
        ...data,
      })
    );
  };

  useImperativeHandle(ref, () => ({
    onTrackEvent,
  }));

  return (
    <View style={webViewStyles}>
      <WebView
        ref={webViewRef}
        source={{
          uri: `${Config.ANALITYCS}?id=${randomString()}&platform=${getSystemName()}`,
        }}
      />
    </View>
  );
});

export default memo(Analitycs);
