import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { AppState as AppStateRN } from 'react-native';
import { configRequest } from '@store/modules/core/actions';
import { RootStackScreen } from './Root';
import { navigationRef } from './rootNavigation';

export default () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.PRIMARY_COLOR,
      primary: theme.PRIMARY_COLOR,
      card: theme.PRIMARY_COLOR,
      border: theme.PRIMARY_COLOR,
    },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    AppStateRN.addEventListener('change', (event) => {
      if (event === 'active') {
        dispatch(configRequest());
      }
    });
    return () => {
      AppStateRN.removeEventListener('change', () => {});
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={MyTheme} ref={navigationRef}>
        <RootStackScreen />
      </NavigationContainer>
    </ThemeProvider>
  );
};
