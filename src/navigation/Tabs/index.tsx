import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, ExploreIcon, MoreIcon, SearchIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';
import { isTablet } from 'react-native-device-info';
import { MoreStackScreen } from './More';
import { HomeStackScreen } from './Home';
import { SearchStackScreen } from './Search';
import { ExploreStackScreen } from './Explore';
import TabBar from './Components/TabBar';

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => {
  const { t } = useTranslation('tabs');
  return (
    <AppTabs.Navigator tabBar={(props) => <TabBar {...props} />}>
      <AppTabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: () => <HomeIcon width={isTablet() ? 28 : 24} height={isTablet() ? 28 : 24} />,
        }}
      />
      <AppTabs.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: t('explore'),
          tabBarIcon: () => (
            <ExploreIcon width={isTablet() ? 38 : 34} height={isTablet() ? 38 : 34} />
          ),
        }}
      />
      <AppTabs.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: t('search'),
          tabBarIcon: () => (
            <SearchIcon width={isTablet() ? 30 : 26} height={isTablet() ? 30 : 26} />
          ),
        }}
      />
      <AppTabs.Screen
        name="More"
        component={MoreStackScreen}
        options={{
          tabBarLabel: t('more'),
          tabBarIcon: () => <MoreIcon width={isTablet() ? 28 : 24} height={isTablet() ? 28 : 24} />,
        }}
      />
    </AppTabs.Navigator>
  );
};

export { AppTabsScreen };
