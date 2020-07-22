/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Explore from '@screens/Explore';
import Home from '@screens/Home';
import Listing from '@screens/Listing';
import Detail from '@screens/Detail';
import Search from '@screens/Search';
import More from '@screens/More';
import { LayoutState } from '@src/store/modules/layout/types';
import { ThemeProvider } from 'styled-components/native';
import { WebView } from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
import Constants from '@src/config/Constants';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { HomeIcon, ExploreIcon, SearchIcon, MoreIcon, BackIcon } from '@assets/icons';
import { StatusBar } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import Tabs from '@components/Tabs';
import { toggleModal } from '@store/modules/layout/actions';
import Orientation from 'react-native-orientation-locker';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { ThemeProps } from '@store/modules/theme/types';
import { useNavigation } from 'react-navigation-hooks';
import { createStackNavigator } from 'react-navigation-stack';
import { Modal, TabsWrapper, BackButton } from './styles';

const HomeScreens = createStackNavigator(
  {
    Home,
    Listing,
    Detail,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: 'transparent',
      },
      cardStyleInterpolator: ({ current: { progress } }) => {
        const opacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return { cardStyle: { opacity } };
      },
    },
  }
);

const ExploreScreens = createSharedElementStackNavigator(
  {
    Explore,
    Listing,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: 'transparent',
      },
    },
  }
);

const TabNavigator = createSwitchNavigator({
  Home: HomeScreens,
  More,
  Explore: ExploreScreens,
  Search,
});

interface Props {
  navigation: ReturnType<typeof useNavigation>;
  screenProps: {
    theme: ThemeProps;
  };
  layout: LayoutState;
}
const show = {
  from: {
    zIndex: 0,
    opacity: 0,
  },
  to: {
    zIndex: 4,
    opacity: 1,
  },
};
const hide = {
  from: {
    zIndex: 4,
    opacity: 1,
  },
  to: {
    zIndex: 0,
    opacity: 0,
  },
};

const showTabsAnimation = {
  from: {
    bottom: -getBottomSpace() - 70,
  },
  to: {
    bottom: 0,
  },
};

const hideTabsAnimation = {
  from: {
    bottom: 0,
  },
  to: {
    bottom: -getBottomSpace() - 70,
  },
};

Animatable.initializeRegistryWithDefinitions({
  show,
  hide,
  showTabsAnimation,
  hideTabsAnimation,
});

const webview = {
  backgroundColor: 'transparent',
};

const styleExplore = {
  top: -8,
};

export default function TabsScreens({ navigation, screenProps: { theme } }: Props) {
  const modalActive = useSelector((state: AppState) => state.layout.modalActive);
  const token = useSelector((state: AppState) => state.core.token);
  const dispatch = useDispatch();
  const [url, setUrl] = useState(Constants.url_player + token);
  const [count, setCount] = useState(0);

  const [tabs, setTabs] = useState(true);

  const items = [
    {
      id: 1,
      icon: <HomeIcon width={24} height={24} />,
      text: 'Home',
      focus: true,
      goTo: 'Home',
    },
    {
      id: 2,
      icon: <ExploreIcon width={34} height={34} style={styleExplore} />,
      text: 'Explore',
      focus: false,
      goTo: 'Explore',
    },
    {
      id: 3,
      icon: <SearchIcon width={26} height={26} />,
      text: 'Search',
      focus: false,
      goTo: 'Search',
    },
    {
      id: 4,
      icon: <MoreIcon width={24} height={24} />,
      text: 'More',
      focus: false,
      goTo: 'More',
    },
  ];

  useEffect(() => {
    Orientation.lockToPortrait();
    // StatusBar.setHidden(false);
    StatusBar.setHidden(false);
  }, []);

  useEffect(() => {
    if (modalActive) {
      StatusBar.setHidden(true);
      setUrl(Constants.url_player + token);
      Orientation.lockToLandscape();
    }
  }, [modalActive]);

  const backArrow = () => {
    StatusBar.setHidden(false);
    Orientation.lockToPortrait();
    dispatch(toggleModal());
    setCount(count + 1);
    setUrl('');
  };

  useEffect(() => {
    if (navigation.state.params) {
      const { showTabs } = navigation.state.params;
      setTabs(showTabs);
    }
  }, [navigation.state.params]);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <TabsWrapper>
        <TabNavigator {...{ navigation, screenProps: theme }} />
        <Tabs {...{ items, showTabs: tabs }} />
      </TabsWrapper>
      <Modal {...(modalActive === true ? { animation: 'show' } : {})} duration={100}>
        <BackButton onPress={() => backArrow()}>
          <BackIcon />
        </BackButton>
        {url !== '' && (
          <WebView
            key={count.toString()}
            source={{
              uri: `${url}`,
            }}
            onLoad={() => console.log('success')}
            onError={(error) => console.log('onError', error)}
            onHttpError={(error) => console.log('onHttpError', error)}
            allowsInlineMediaPlayback
            style={webview}
          />
        )}
      </Modal>
    </ThemeProvider>
  );
}

TabsScreens.router = TabNavigator.router;
