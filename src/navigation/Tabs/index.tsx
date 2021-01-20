import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, ExploreIcon, MoreIcon, SearchIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';
import { normalize } from '@src/utils/normalize';
import { withTheme } from 'styled-components';
import { ThemeProps } from '@store/modules/theme/types';
import { rgba } from 'polished';
import { useOrientation } from '@src/utils/orientation';
import { isTablet } from '@src/utils/tablet';
import { MoreStackScreen } from './More';
import { HomeStackScreen } from './Home';
import { SearchStackScreen } from './Search';
import { ExploreStackScreen } from './Explore';

const AppTabs = createBottomTabNavigator();
type Props = {
  readonly theme: ThemeProps;
};

type Icon = {
  focused: boolean;
};

const TabsScreen = ({ theme }: Props) => {
  const { t } = useTranslation('tabs');
  const orientation = useOrientation();

  return (
    <AppTabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.PRIMARY_FOREGROUND_COLOR,
        inactiveTintColor: rgba(theme.PRIMARY_FOREGROUND_COLOR, 0.6),
        style: {
          height: orientation === 'PORTRAIT' ? 90 : 70,
          borderTopWidth: 1,
          borderTopColor: theme.PRIMARY_COLOR_OPAQUE,
        },
        tabStyle: {
          marginTop: orientation === 'PORTRAIT' ? 10 : 0,
        },
        labelStyle: {
          fontSize: normalize(12, 16),
          fontFamily: theme.PRIMARY_FONT_FAMILY,
          marginTop: 5,
        },
      }}
    >
      <AppTabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ focused }: Icon) => (
            <HomeIcon
              width={isTablet() ? 28 : 24}
              height={isTablet() ? 28 : 24}
              opacity={focused ? 1 : 0.6}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: t('explore'),
          tabBarIcon: ({ focused }: Icon) => (
            <ExploreIcon
              width={isTablet() ? 38 : 34}
              height={isTablet() ? 38 : 34}
              opacity={focused ? 1 : 0.6}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: t('search'),
          tabBarIcon: ({ focused }: Icon) => (
            <SearchIcon
              width={isTablet() ? 30 : 26}
              height={isTablet() ? 30 : 26}
              opacity={focused ? 1 : 0.6}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="More"
        component={MoreStackScreen}
        options={{
          tabBarLabel: t('more'),
          tabBarIcon: ({ focused }: Icon) => (
            <MoreIcon
              width={isTablet() ? 28 : 24}
              height={isTablet() ? 28 : 24}
              opacity={focused ? 1 : 0.6}
            />
          ),
        }}
      />
    </AppTabs.Navigator>
  );
};

export const AppTabsScreen = withTheme(TabsScreen);
