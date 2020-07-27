import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppTabsScreen } from '../Tabs';

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator screenOptions={{ gestureEnabled: false }}>
    <AppDrawer.Screen name="Tabs" component={AppTabsScreen} options={{ drawerLabel: 'Home' }} />
  </AppDrawer.Navigator>
);

export { AppDrawerScreen };
