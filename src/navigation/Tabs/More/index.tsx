import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import More from '@screens/More';
import MyAccount from '@screens/MyAccount';
import ParentalControls from '@screens/ParentalControls';
import SignUpSubscription from '@screens/SignUpSubscription';

const MoreStack = createStackNavigator();
const MoreStackScreen = () => (
  <MoreStack.Navigator headerMode="none">
    <MoreStack.Screen name="More" component={More} />
    <MoreStack.Screen name="MyAccount" component={MyAccount} />
    <MoreStack.Screen name="ParentalControls" component={ParentalControls} />
    <MoreStack.Screen name="AccountSubscription" component={SignUpSubscription} />
  </MoreStack.Navigator>
);

export { MoreStackScreen };
