import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Orientation from 'react-native-orientation-locker';
import { AppTabsScreen } from '../Tabs';

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <AppDrawer.Navigator screenOptions={{ gestureEnabled: false }}>
      <AppDrawer.Screen name="Tabs" component={AppTabsScreen} options={{ drawerLabel: 'Home' }} />
    </AppDrawer.Navigator>
  );
};

export { AppDrawerScreen };
