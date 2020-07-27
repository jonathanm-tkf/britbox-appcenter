import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Home from '@screens/Home';
import { HomeIcon, ExploreIcon, MoreIcon, SearchIcon } from '@assets/icons';
import Explore from '@screens/Explore';
import Search from '@screens/Search';
import { rgba } from 'polished';
import { useTranslation } from 'react-i18next';
import { MoreStackScreen } from './More';

type Tab = {
  focused: boolean;
};

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { t } = useTranslation('tabs');
  return (
    <AppTabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.PRIMARY_FOREGROUND_COLOR,
        activeBackgroundColor: theme.PRIMARY_COLOR,
        inactiveTintColor: rgba(theme.PRIMARY_FOREGROUND_COLOR, 0.6),
        inactiveBackgroundColor: theme.PRIMARY_COLOR,
        labelStyle: {
          fontSize: 14,
          fontFamily: theme.PRIMARY_FONT_FAMILY,
        },
      }}
    >
      <AppTabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ focused }: Tab) => (
            <HomeIcon
              style={{
                opacity: focused ? 1 : 0.6,
              }}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: t('explore'),
          tabBarIcon: ({ focused }: Tab) => (
            <ExploreIcon
              style={{
                opacity: focused ? 1 : 0.6,
              }}
              width={34}
              height={34}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: t('search'),
          tabBarIcon: ({ focused }: Tab) => (
            <SearchIcon
              style={{
                opacity: focused ? 1 : 0.6,
              }}
              width={26}
              height={26}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="More"
        component={MoreStackScreen}
        options={{
          tabBarLabel: t('more'),
          tabBarIcon: ({ focused }: Tab) => (
            <MoreIcon
              style={{
                opacity: focused ? 1 : 0.6,
              }}
              width={24}
              height={24}
            />
          ),
        }}
      />
    </AppTabs.Navigator>
  );
};

export { AppTabsScreen };
