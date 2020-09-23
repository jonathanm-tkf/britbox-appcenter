import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, ExploreIcon, MoreIcon, SearchIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';
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
          unmountOnBlur: true,
          tabBarLabel: t('home'),
          tabBarIcon: () => <HomeIcon width={24} height={24} />,
        }}
      />
      <AppTabs.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: t('explore'),
          tabBarIcon: () => <ExploreIcon width={34} height={34} />,
        }}
      />
      <AppTabs.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: t('search'),
          tabBarIcon: () => <SearchIcon width={26} height={26} />,
        }}
      />
      <AppTabs.Screen
        name="More"
        component={MoreStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: t('more'),
          tabBarIcon: () => <MoreIcon width={24} height={24} />,
        }}
      />
    </AppTabs.Navigator>
  );
};

export { AppTabsScreen };
