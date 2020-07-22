/* eslint-disable no-nested-ternary */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
import { ThemeState } from '@store/modules/theme/types';
import Storybook from '@screens/Storybook';
import Auth from '@screens/Auth';
import Login from '@screens/Login';
import SignUp from '@screens/SignUp';
import SignUpSubscription from '@screens/SignUpSubscription';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import Tabs from './Tabs';

const STORYBOOK_START = true && __DEV__;

const AppNavigator = ({ theme }: { theme: ThemeState }) => {
  const isLogged = useSelector((state: AppState) => state.core.isLogged);

  return createAppContainer(
    createStackNavigator(
      {
        Storybook,
        Auth: {
          screen: Auth,
          navigationOptions: {
            header: () => null,
          },
        },
        Login: {
          screen: Login,
          navigationOptions: {
            header: () => null,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          },
        },
        SignUp: {
          screen: SignUp,
          navigationOptions: {
            header: () => null,
          },
        },
        SignUpSubscription: {
          screen: SignUpSubscription,
          navigationOptions: {
            header: () => null,
          },
        },
        Tabs: {
          screen: Tabs,
          navigationOptions: {
            header: () => null,
          },
        },
      },
      {
        defaultNavigationOptions: {
          headerStyle: {
            borderBottomWidth: 0,
          },
          cardStyle: {
            backgroundColor: theme.theme.PRIMARY_COLOR,
          },
          // headerTintColor: 'white',
        },
        initialRouteName: STORYBOOK_START ? 'Storybook' : isLogged ? 'Tabs' : 'Auth',
      }
    )
  );
};

// const AppNavigator = createAppContainer(Tabs);

export default AppNavigator;
