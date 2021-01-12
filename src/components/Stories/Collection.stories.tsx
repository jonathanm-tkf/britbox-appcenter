/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Collection from '@components/Collection';
import Theme from './Theme';

const LOADED_DATA = [
  {
    type: 'link',
    id: '23368',
    title: 'New to Classic Who?',
    contextualTitle: 'New to Classic Who?',
    shortDescription: 'LinkItem',
    path: '/',
    scopes: ['23368'],
    images: {
      tile: `https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='186662'&EntityType='Item'&EntityId='23368'&Width=3273&Height=1841&device=tablet_android&subscriptions=Subscriber&segmentationTags=US`,
    },
    customFields: {
      description: `Don't know where to start? Try these essentials from each Doctor.`,
    },
  },
  {
    type: 'link',
    id: '23370',
    title: 'Power of the Daleks',
    contextualTitle: 'Power of the Daleks',
    shortDescription: 'LinkItem',
    path: '/',
    scopes: ['23370'],
    images: {
      tile: `https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='186758'&EntityType='Item'&EntityId='23370'&Width=1024&Height=576&device=tablet_android&subscriptions=Subscriber&segmentationTags=US`,
    },
    customFields: {
      description:
        'One of the most celebrated Doctor Who stories was thought to be lost forever until a team of animators helped to bring it back!',
      align: 'left',
    },
  },
  {
    type: 'link',
    id: '23372',
    title: 'Wheel in Space',
    contextualTitle: 'Wheel in Space',
    shortDescription: 'LinkItem',
    path: '/',
    scopes: ['23372'],
    images: {
      tile: `https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='186760'&EntityType='Item'&EntityId='23372'&Width=1131&Height=636&device=tablet_android&subscriptions=Subscriber&segmentationTags=US`,
    },
    customFields: {
      description:
        'BritBox and the Doctor Who Restoration team joined forces to revive this lost Patrick Troughton epic. ',
    },
  },
];

const LOADING_DATA = [
  {
    type: 'link',
    title: 'loading',
    contextualTitle: 'loading',
    shortDescription: 'loading',
    path: 'loading',
    scopes: ['loading'],
    genres: [],
    offers: [],
    images: {
      tile: `loading`,
    },
    customFields: {
      description: `loading`,
    },
  },
  {
    type: 'link',
    title: 'loading',
    contextualTitle: 'loading',
    shortDescription: 'loading',
    path: 'loading',
    scopes: ['loading'],
    genres: [],
    offers: [],
    images: {
      tile: `loading`,
    },
    customFields: {
      description: `loading`,
      align: 'left',
    },
  },
  {
    type: 'link',
    title: 'loading',
    contextualTitle: 'loading',
    shortDescription: 'loading',
    path: 'loading',
    scopes: ['loading'],
    genres: [],
    offers: [],
    images: {
      tile: `loading`,
    },
    customFields: {
      description: `loading`,
    },
  },
];

storiesOf('Collection', module)
  .addDecorator(Theme)
  .add('default', () => <Collection data={LOADED_DATA} />)
  .add('loading', () => <Collection data={LOADING_DATA} />);
