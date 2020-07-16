/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Card from '@components/Card';
import Theme from './Theme';

const url =
  'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217229%27&EntityType=%27Item%27&EntityId=%2716050%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us';

const episodeUrl =
  'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us';

const episodeData = {
  title: 'Casually 1900s: London Hospital more text extensive',
  description: 'E68 - 56min',
};

storiesOf('Card', module)
  .addDecorator(Theme)
  .add('default', () => <Card url={url} />)
  .add('episode', () => (
    <Card width={157} height={107} url={episodeUrl} newEpisode data={episodeData} />
  ));
