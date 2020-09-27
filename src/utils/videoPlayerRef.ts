import * as React from 'react';

export const webViewRef: any = React.createRef();

export const PostMessage = (data: Record<string, unknown>) => {
  if (webViewRef.current) {
    webViewRef.current.postMessage(
      JSON.stringify({
        ...data,
      })
    );
  }
};
