/* eslint-disable max-len */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';

import UserWatching from '@components/UserWatching';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import { action } from '@storybook/addon-actions';
import Theme from './Theme';

const continueWatchingItems = [
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',

    data: {
      title: 'Casually 1900s: London Hospital more text extensive',
      description: 'Season 3 - 4',
      actionText: '56 min left',
      category: [
        {
          key: 1,
          label: 'TV - PG',
          bold: false,
        },
        {
          key: 2,
          label: 'CC',
          bold: false,
        },
        {
          key: 3,
          label: 'HD',
          bold: true,
        },
      ],
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Coronation Street',
      description: 'Season 1 - 2',
      actionText: '20 min left',
      category: [
        {
          key: 1,
          label: 'TV - PG',
          bold: false,
        },
        {
          key: 2,
          label: 'CC',
          bold: false,
        },
        {
          key: 3,
          label: 'HD',
          bold: true,
        },
      ],
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Emmeralde',
      description: 'Season 2 - 1',
      actionText: '19 min left',
      category: [
        {
          key: 1,
          label: 'TV - PG',
          bold: false,
        },
        {
          key: 2,
          label: 'CC',
          bold: false,
        },
        {
          key: 3,
          label: 'HD',
          bold: true,
        },
      ],
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Coronation Street',
      description: 'Casualty 1906 - 1',
      actionText: '56 min left',
      category: [
        {
          key: 1,
          label: 'TV - PG',
          bold: false,
        },
        {
          key: 2,
          label: 'CC',
          bold: false,
        },
        {
          key: 3,
          label: 'HD',
          bold: true,
        },
      ],
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Coronation Street',
      description: 'Casualty 1906 - 1',
      actionText: '56 min left',
      category: [
        {
          key: 1,
          label: 'TV - PG',
          bold: false,
        },
        {
          key: 2,
          label: 'CC',
          bold: false,
        },
        {
          key: 3,
          label: 'HD',
          bold: true,
        },
      ],
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Coronation Street',
      description: 'Casualty 1906 - 1',
      actionText: '56 min left',
      category: [
        {
          key: 1,
          label: 'TV - PG',
          bold: false,
        },
        {
          key: 2,
          label: 'CC',
          bold: false,
        },
        {
          key: 3,
          label: 'HD',
          bold: true,
        },
      ],
    },
  },
];

const DATA = [
  {
    key: 0,
    label: 'Continue Watching',
    content: () => (
      <Carousel
        items={continueWatchingItems}
        listProps={{ horizontal: true, noPadding: true }}
        renderItem={({ item: card }) => (
          <Card
            isContinue
            newEpisode
            width={157}
            height={107}
            url={card.url}
            data={card.data}
            actionText={card.data.actionText}
            onRemove={action('on-remove')}
          />
        )}
      />
    ),
  },
  {
    key: 1,
    label: 'Watchlist',
    content: () => (
      <Carousel
        items={continueWatchingItems}
        listProps={{ horizontal: true, noPadding: true }}
        renderItem={({ item: card }) => (
          <Card
            isWatchlist
            width={122}
            height={162}
            url={card.url}
            data={card.data}
            onRemove={action('on-watchlist')}
          />
        )}
      />
    ),
  },
];

const Component = () => {
  const [tabActive, setTabActive] = useState(0);
  return <UserWatching active={tabActive} data={DATA} changeTab={(item) => setTabActive(item)} />;
};

storiesOf('User Watching', module)
  .addDecorator(Theme)
  .add('default', () => <Component />);
