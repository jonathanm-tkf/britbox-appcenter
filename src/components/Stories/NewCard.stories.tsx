/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import NewCard from '@components/NewCard';
import Theme from './Theme';

const url =
  'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217229%27&EntityType=%27Item%27&EntityId=%2716050%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us';

storiesOf('New Card', module)
  .addDecorator(Theme)
  .add('default', () => <NewCard url={url} onPress={() => {}} />)
  .add('loading', () => <NewCard url="loading" onPress={() => {}} />)
  .add('no image', () => <NewCard url="no-image" onPress={() => {}} />);
