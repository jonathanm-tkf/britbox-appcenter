/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview';
import HeaderCustom from '@components/HeaderCustom';
import Action from '@components/Action';
import { Container, WebViewWrapper, Wrapper } from './styles';

const webview = {
  flex: 1,
};

interface Props {
  uri?: string;
  onNavigationStateChange?: any;
}

const WebViewComponent = ({ uri = '', onNavigationStateChange }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [loading, setLaoding] = useState(true);

  return (
    <Container
      style={{
        backgroundColor: theme.PRIMARY_COLOR,
        flex: 1,
      }}
    >
      <HeaderCustom isBack shadow />
      <WebViewWrapper>
        <WebView
          source={{
            uri,
          }}
          allowsInlineMediaPlayback
          style={webview}
          onLoad={() => setLaoding(false)}
          onNavigationStateChange={onNavigationStateChange}
        />
        {loading && (
          <Wrapper>
            <Action autoPlay loop loading width={70} height={70} />
          </Wrapper>
        )}
      </WebViewWrapper>
    </Container>
  );
};

export default WebViewComponent;
