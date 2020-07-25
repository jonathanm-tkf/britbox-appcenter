import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Storybook from '@screens/Storybook';
import { rgba } from 'polished';
import Detail from '@screens/Detail';
import VideoPlayer from '@screens/VideoPlayer';
import Modal from '@screens/Modal';
import Loading from '@screens/Loading';
import { AppDrawerScreen } from '../Drawer';
import { AuthStackScreen } from '../Auth';

const STORYBOOK_START = false && __DEV__;

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const [isLoading] = React.useState(false);
  const user = useSelector((state: AppState) => state.user);
  const theme = useSelector((state: AppState) => state.theme.theme);

  React.useEffect(() => {
    // console.tron.log({ jona: true });
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 500);
  }, []);

  return (
    <RootStack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }} mode="modal">
      {STORYBOOK_START ? (
        <RootStack.Screen name="Storybook" component={Storybook} />
      ) : isLoading ? (
        <RootStack.Screen name="Loading" component={Loading} />
      ) : user.isLogged ? (
        <RootStack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
      ) : (
        <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
      )}
      <RootStack.Screen name="Modal" component={Modal} options={{ animationEnabled: true }} />
      <RootStack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{
          gestureEnabled: false,
          animationEnabled: true,
          cardStyle: { backgroundColor: rgba(theme.PRIMARY_COLOR, 0.15) },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />
      <RootStack.Screen
        name="Detail"
        component={Detail}
        options={{
          gestureEnabled: false,
          animationEnabled: true,
          cardStyle: { backgroundColor: rgba(theme.PRIMARY_COLOR, 0.15) },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />
    </RootStack.Navigator>
  );
};

export { RootStackScreen };
