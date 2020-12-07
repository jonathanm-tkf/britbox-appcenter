import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import More from '@screens/More';
import MyAccount from '@screens/MyAccount';
import ParentalControls from '@screens/ParentalControls';
import SignUpSubscription from '@screens/SignUpSubscription';
import Detail from '@screens/Detail';
import { AppState } from '@store/modules/rootReducer';
import { ModalOptions } from '../Home';

const MoreStack = createStackNavigator();
const MoreStackScreen = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <MoreStack.Navigator headerMode="none">
      <MoreStack.Screen name="More" component={More} />
      <MoreStack.Screen name="MyAccount" component={MyAccount} />
      <MoreStack.Screen name="ParentalControls" component={ParentalControls} />
      <MoreStack.Screen name="AccountSubscription" component={SignUpSubscription} />
      <MoreStack.Screen name="Detail" component={Detail} options={ModalOptions(theme)} />
    </MoreStack.Navigator>
  );
};

export { MoreStackScreen };
