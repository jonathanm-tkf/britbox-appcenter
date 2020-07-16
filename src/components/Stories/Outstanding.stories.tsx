/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Outstanding from '@components/Outstanding';
import Theme from './Theme';

const DATA = {
  item: {
    url:
      'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217229%27&EntityType=%27Item%27&EntityId=%2716050%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    // 'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217273%27&EntityType=%27Item%27&EntityId=%272756%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
  },
};

storiesOf('Outstanding', module)
  .addDecorator(Theme)
  .add('default', () => (
    <Outstanding
      item={DATA.item}
      onPlay={action('tapped-play')}
      onWatchlist={action('tapped-watchlist')}
      onDiscoverMore={action('tapped-discover-more')}
    />
  ));
