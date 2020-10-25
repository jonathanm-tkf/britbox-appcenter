import * as React from 'react';
import WebView from 'react-native-webview';

export const webViewRef = React.createRef<WebView>();

export const PostMessage = (data: Record<string, unknown>) => {
  if (webViewRef.current) {
    webViewRef.current.postMessage(
      JSON.stringify({
        ...data,
      })
    );
  }
};
