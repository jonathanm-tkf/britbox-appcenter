/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import HeaderCustom from '@components/HeaderCustom';

const webview = {
  flex: 1,
};

interface Props {
  uri?: string;
}

const WebViewComponent = ({ uri = '' }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <View
      style={{
        backgroundColor: theme.PRIMARY_COLOR,
        flex: 1,
      }}
    >
      <HeaderCustom isBack shadow />
      <WebView
        source={{
          uri,
        }}
        allowsInlineMediaPlayback
        style={webview}
      />
    </View>
  );
};

export default WebViewComponent;
