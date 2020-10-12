import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Auth from '@screens/Auth';
import Login from '@screens/Login';
import SignUp from '@screens/SignUp';
import SignUpSubscription from '@screens/SignUpSubscription';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none" mode="modal">
    <AuthStack.Screen name="Auth" component={Auth} />
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <AuthStack.Screen
      name="SignUpSubscription"
      component={SignUpSubscription}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: false,
      }}
    />
  </AuthStack.Navigator>
);

export { AuthStackScreen };
