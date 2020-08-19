import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
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

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={MyTheme} ref={navigationRef}>
        <RootStackScreen />
      </NavigationContainer>
    </ThemeProvider>
  );
};
