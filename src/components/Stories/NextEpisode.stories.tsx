/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import NextEpisode from '@components/NextEpisode';
import Theme from './Theme';

const DATA = {
  description:
    'When a washed-up rock star thinks the Devil is trying to kill him, Frank and Lu find themselves in a race to uncover the truth before the killer strikes again.',
  type: 'episode',
  title: 'Shakespeare & Hathaway - Private Investigators S3 E2',
  contextualTitle: '2. See Thyself, Devil!',
  shortDescription:
    'Frank and Lu encounter a washed-up rock star who thinks the Devil is trying to kill him.',
  episodeNumber: 2,
  episodeName: 'See Thyself, Devil!',
  showTitle: 'Shakespeare & Hathaway - Private Investigators',
  seasonTitle: 'Season 3',
  images: {
    wallpaper:
      "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='217666'&EntityType='Item'&EntityId='24435'&Width=1248&Height=702&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
  },
};

storiesOf('Next Episode', module)
  .addDecorator(Theme)
  .add('default', () => <NextEpisode data={DATA} onClose={() => {}} onNext={() => {}} active />);
