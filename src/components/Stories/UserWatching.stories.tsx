/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import UserWatching from '@components/UserWatching';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import Theme from './Theme';

const continueWatchingItems = [
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',

    data: {
      title: 'Casually 1900s: London Hospital more text extensive',
      description: 'E68 - 56min',
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Coronation Street',
      description: 'E6 - 30min',
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Emmeralde',
      description: 'E74 - 30min',
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Coronation Street',
      description: 'E6 - 30min',
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Coronation Street',
      description: 'E6 - 30min',
    },
  },
  {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    data: {
      title: 'Coronation Street',
      description: 'E6 - 30min',
    },
  },
];

const DATA = [
  {
    key: 0,
    label: 'Continue Watching',
    active: true,
    content: () => (
      <Carousel
        items={continueWatchingItems}
        listProps={{ horizontal: true, noPadding: true }}
        renderItem={({ item: card }) => (
          <Card newEpisode width={157} height={107} url={card.url} data={card.data} />
        )}
      />
    ),
  },
  {
    key: 1,
    label: 'Watchlist',
    active: false,
    content: () => (
      <Carousel
        items={continueWatchingItems}
        listProps={{ horizontal: true, noPadding: true }}
        renderItem={({ item: card }) => (
          <Card width={102} height={162} url={card.url} data={card.data} />
        )}
      />
    ),
  },
];

storiesOf('User Watching', module)
  .addDecorator(Theme)
  .add('default', () => <UserWatching data={DATA} />);
