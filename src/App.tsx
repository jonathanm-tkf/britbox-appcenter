/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { StatusBar, View, ViewStyle } from 'react-native';
import WebView from 'react-native-webview';
import { getSystemName } from 'react-native-device-info';
import RBSheet from 'react-native-raw-bottom-sheet';
import { hideSheetBottom, sheetComponent } from '@store/modules/layout/actions';
import { ThemeProvider } from 'styled-components';
import { BottomSheetWrapper, Headline, Paragraph } from '@components/Layout';
import { Button } from '@components/Button';
import Navigation from './navigation/routes';
import Constants from './config/Constants';
import { randomString } from './services/token';
import { hideSheet, sheetRef, showSheet } from './utils/sheetBottom';
import { getTextInConfigJSON } from './utils/object';

const webViewStyles: ViewStyle = {
  height: 0,
  overflow: 'hidden',
};

export default function App() {
  const { sheet, event } = useSelector((state: AppState) => state.layout);
  const webViewRef = useRef<any>(undefined);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { welcomeMessage } = useSelector((state: AppState) => state.layout);

  const wrapper = {
    flex: 1,
    backgroundColor: theme.PRIMARY_COLOR,
  };
  const dispatch = useDispatch();

  const onTrackEvent = (data: Record<string, unknown>) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({
          ...data,
        })
      );
    }
  };

  useEffect(() => {
    if (event) {
      const { actionType, actionName, eventProperties } = event;
      onTrackEvent({
        type: 'event',
        actionType,
        actionName,
        eventProperties,
      });
    }
  }, [event]);

  useEffect(() => {
    if (welcomeMessage) {
      dispatch(sheetComponent(300, () => renderBottomContent()));
      setTimeout(() => {
        showSheet();
      }, 2000);
    }
  }, [welcomeMessage]);

  const renderBottomContent = () => (
    <BottomSheetWrapper>
      <Headline center color={theme.PRIMARY_TEXT_COLOR}>
        {getTextInConfigJSON(['successful-purchase', 'title'], '')}
      </Headline>
      <Paragraph>
        {getTextInConfigJSON(['successful-purchase', 'message-1'], '')}
        {'\n'}
        {getTextInConfigJSON(['successful-purchase', 'message-2'], '')}
      </Paragraph>
      <Button
        stretch
        size="big"
        fontWeight="medium"
        onPress={() => {
          hideSheet();
        }}
      >
        {getTextInConfigJSON(['successful-purchase', 'ctas'], '')}
      </Button>
    </BottomSheetWrapper>
  );

  return (
    <ThemeProvider theme={theme}>
      <View style={wrapper}>
        <StatusBar barStyle="light-content" backgroundColor={theme.PRIMARY_COLOR} />
        <Navigation onTrackEvent={(data) => onTrackEvent(data)} />
        <View style={webViewStyles}>
          <WebView
            ref={webViewRef}
            source={{
              uri: `${Constants.analitycs}?id=${randomString()}&platform=${getSystemName()}`,
            }}
          />
        </View>
        <RBSheet
          ref={sheetRef}
          height={sheet.height}
          closeOnDragDown
          closeOnPressMask={false}
          customStyles={{
            container: {
              alignItems: 'center',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            },
            draggableIcon: {
              backgroundColor: theme.PRIMARY_TEXT_COLOR_OPAQUE,
              width: 50,
              marginTop: 20,
            },
          }}
          onClose={() => {
            dispatch(hideSheetBottom());
          }}
        >
          {sheet.content()}
        </RBSheet>
      </View>
    </ThemeProvider>
  );
}
