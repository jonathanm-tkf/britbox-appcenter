/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { StatusBar, View } from 'react-native';
import { isTablet } from 'react-native-device-info';
import RBSheet from 'react-native-raw-bottom-sheet';
import { hideSheetBottom, sheetComponent } from '@store/modules/layout/actions';
import { ThemeProvider } from 'styled-components';
import { BottomSheetWrapper, Headline, Paragraph } from '@components/Layout';
import { Button } from '@components/Button';
import Hole from '@components/Hole';
import Analytics from '@components/Analytics';
import Navigation from './navigation/routes';
import { hideSheet, sheetRef, showSheet } from './utils/sheetBottom';
import { getTextInConfigJSON } from './utils/object';
import { analyticsRef } from './utils/analytics';

export default function App() {
  const { sheet } = useSelector((state: AppState) => state.layout);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { welcomeMessage } = useSelector((state: AppState) => state.layout);

  const wrapper = {
    flex: 1,
    backgroundColor: theme.PRIMARY_COLOR,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (welcomeMessage) {
      dispatch(sheetComponent(290, () => renderBottomContent()));
      setTimeout(() => {
        showSheet();
      }, 2000);
    }
  }, [welcomeMessage]);

  const renderBottomContent = useCallback(
    () => (
      <BottomSheetWrapper>
        <Headline center color={theme.PRIMARY_TEXT_COLOR}>
          {getTextInConfigJSON(['successful-purchase', 'title'], '')}
        </Headline>
        <Paragraph style={{ textAlign: 'center' }}>
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
    ),
    [theme]
  );

  return (
    <ThemeProvider theme={theme}>
      <View style={wrapper}>
        <StatusBar barStyle="light-content" backgroundColor={theme.PRIMARY_COLOR} />
        <Navigation />
        <Hole />
        <Analytics ref={analyticsRef} />
        <RBSheet
          ref={sheetRef}
          height={sheet.height}
          closeOnDragDown
          closeOnPressMask={false}
          customStyles={{
            container: {
              maxWidth: isTablet() ? 450 : '100%',
              alignItems: 'center',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            },
            wrapper: {
              alignItems: 'center',
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
