/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Card from '@components/Card';
import Carousel from '@components/Carousel';
import Theme from './Theme';

const url =
  'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217229%27&EntityType=%27Item%27&EntityId=%2716050%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us';

const ITEMS = [
  {
    url,
  },
  {
    url,
  },
  {
    url,
  },
  {
    url,
  },
];

storiesOf('Carousel', module)
  .addDecorator(Theme)
  .add('default', () => (
    <Carousel
      items={ITEMS}
      listProps={{ horizontal: true }}
      renderItem={({ item }) => <Card url={item.url} />}
    />
  ));
