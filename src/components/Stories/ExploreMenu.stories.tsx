/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import ExploreMenu from '@components/ExploreMenu';
import { action } from '@storybook/addon-actions';
import Theme from './Theme';

const DATA = [
  {
    label: 'Explore',
    depth: 0,
    children: [
      {
        depth: 1,
        label: 'Genre',
        children: [
          {
            label: 'Mystery',
            path: '/genre/mystery',
            depth: 2,
          },
          {
            label: 'Comedy',
            path: '/genre/comedy',
            depth: 2,
          },
          {
            label: 'Drama',
            path: '/genre/drama',
            depth: 2,
          },
          {
            label: 'Doc & Lifestyle',
            path: '/genre/doclifestyle',
            depth: 2,
          },
        ],
      },
      {
        depth: 1,
        label: 'Collection',
        children: [
          {
            label: 'Now',
            path: '/collection/now',
            depth: 2,
          },
          {
            label: 'Midsomer Murders',
            path: '/midsomer',
            depth: 2,
          },
          {
            label: 'Classic Doctor Who',
            path: '/doctorwho',
            depth: 2,
          },
        ],
      },
    ],
  },
  {
    label: 'New',
    path: '/new_titles',
    depth: 0,
  },
  {
    label: 'A-Z',
    path: '/programmes',
    depth: 0,
  },
  {
    label: 'Watchlist',
    path: '/account/watchlist',
    depth: 0,
  },
  {
    label: 'Help',
    path: 'https://help.britbox.com ',
    depth: 0,
  },
];

storiesOf('Explore Menu', module)
  .addDecorator(Theme)
  .add('default', () => <ExploreMenu data={DATA} onPress={action('onPress')} />);
