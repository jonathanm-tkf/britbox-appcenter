import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { StatusBar, View } from 'react-native';
// import AppNavigator from './navigation/routes';

import Navigation from './navigation/routes';

export default function App() {
  const theme = useSelector((state: AppState) => state.theme);
  const wrapper = {
    flex: 1,
    backgroundColor: theme.theme.PRIMARY_COLOR,
  };
  // const Navigation = AppNavigator({ theme });
  return (
    <View style={wrapper}>
      <StatusBar barStyle="light-content" backgroundColor={theme.theme.PRIMARY_COLOR} />
      {/* <Navigation screenProps={theme} /> */}

      <Navigation />
    </View>
  );
}
