import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { HomeIcon, ExploreIcon, SearchIcon, MoreIcon } from '@assets/icons';

import Tabs from '@components/Tabs';
import Theme from './Theme';

const styleExplorer = {
  top: -8,
};

const items = [
  {
    id: 1,
    icon: <HomeIcon width={24} height={24} />,
    text: 'Home',
    focus: true,
  },
  {
    id: 2,
    icon: <ExploreIcon width={34} height={34} style={styleExplorer} />,
    text: 'Explore',
    focus: false,
  },
  {
    id: 3,
    icon: <SearchIcon width={26} height={26} />,
    text: 'Search',
    focus: false,
  },
  {
    id: 4,
    icon: <MoreIcon width={24} height={24} />,
    text: 'More',
    focus: false,
  },
];

storiesOf('Tabs', module)
  .addDecorator(Theme)
  .add('default', () => <Tabs {...{ items, showTabs: true }} />);
