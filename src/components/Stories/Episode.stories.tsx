/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Episode from '@components/Episode';
import Theme from './Theme';

const url =
  "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='217690'&EntityType='Item'&EntityId='24441'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US";

storiesOf('Episode', module)
  .addDecorator(Theme)
  .add('default', () => (
    <Episode
      url={url}
      onPress={() => {}}
      width={157}
      height={107}
      progress={0.2}
      data={{
        title:
          '1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet modi dolores suscipit fugiat amet, delectus illum veritatis assumenda repellat necessitatibus ipsa! Excepturi voluptate',
        description: '60 min',
        summary:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet modi dolores suscipit fugiat amet, delectus illum veritatis assumenda repellat necessitatibus ipsa! Excepturi voluptate cum in minima voluptatibus consequuntur aliquam eligendi.',
        // summary: 'Lorem ipsum dolor,',
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
      }}
    />
  ))
  .add('no image', () => (
    <Episode
      url="no-image"
      onPress={() => {}}
      width={157}
      height={107}
      progress={0.5}
      data={{
        title:
          '1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet modi dolores suscipit fugiat amet, delectus illum veritatis assumenda repellat necessitatibus ipsa! Excepturi voluptate',
        description: '60 min',
        summary:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet modi dolores suscipit fugiat amet, delectus illum veritatis assumenda repellat necessitatibus ipsa! Excepturi voluptate cum in minima voluptatibus consequuntur aliquam eligendi.',
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
      }}
    />
  ))
  .add('loading', () => <Episode url="loading" onPress={() => {}} width={157} height={107} />);
