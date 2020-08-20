/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import OurFavorites from '@components/OurFavorites';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import Theme from './Theme';

const DATA: MassiveSDKModelItemList = {
  itemTypes: ['link'],
  id: '23366',
  title: 'Exterminite Header (List of Link)',
  description: '',
  shortDescription: '',
  tagline: '',
  path: '/list/Exterminite_Header_(List_of_Link)_23366',
  size: 1,
  items: [
    {
      type: 'link',
      id: '23365',
      title: 'EXTERMI-NITE!',
      contextualTitle: 'EXTERMI-NITE!',
      shortDescription: 'LinkItem',
      path: '/',
      scopes: ['23365'],
      genres: [],
      customId: '',
      offers: [],
      images: {
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='186660'&EntityType='Item'&EntityId='23365'&Width=3838&Height=2158&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        description:
          'This Halloween join the Doctor for six stories where he faces down the ultimate figures of fear, the Daleks.  Streaming together for the first time.',
      },
    },
  ],
  paging: {
    page: 1,
    size: 18,
    total: 1,
    options: {
      pageSize: 18,
    },
  },
  themes: [],
};

storiesOf('Our Favorites', module)
  .addDecorator(Theme)
  .add('default', () => <OurFavorites data={DATA} onPress={action('press')} />, {
    notes: 'A small component',
  });
