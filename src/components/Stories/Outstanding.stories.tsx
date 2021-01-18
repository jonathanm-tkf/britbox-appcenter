/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { SafeAreaView } from 'react-native';

import Outstanding from '@components/Outstanding';
import Theme from './Theme';

const DATA = {
  items: [
    {
      url: 'no-image',
      // url:
      //   "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178148'&EntityType='Item'&EntityId='20165'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",

      // url:
      //   'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217229%27&EntityType=%27Item%27&EntityId=%2716050%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
      // 'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217273%27&EntityType=%27Item%27&EntityId=%272756%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    },
    {
      url:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178325'&EntityType='Item'&EntityId='22754'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      // url:
      //   'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217229%27&EntityType=%27Item%27&EntityId=%2716050%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
      // 'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217273%27&EntityType=%27Item%27&EntityId=%272756%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    },
    {
      url:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178325'&EntityType='Item'&EntityId='22754'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      // 'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217273%27&EntityType=%27Item%27&EntityId=%272756%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    },
    {
      url:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='211213'&EntityType='Item'&EntityId='23895'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      // 'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27217273%27&EntityType=%27Item%27&EntityId=%272756%27&Width=2160&Height=2160&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
    },
  ],
};

const LANDSCAPE_DATA = {
  items: [
    {
      url: 'no-image',
    },
    {
      url:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=80&ImageId='217628'&EntityType='Item'&EntityId='24431'&Width=888&Height=500&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp&imageType=square",
      images: {
        hero3x1:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='222876'&EntityType='Item'&EntityId='24431'&Width=3840&Height=1280&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        brand:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='png'&Quality=85&ImageId='217602'&EntityType='Item'&EntityId='24431'&Width=1610&Height=537&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
    },
    {
      url:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=80&ImageId='221317'&EntityType='Item'&EntityId='24730'&Width=888&Height=500&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp&imageType=square",
      images: {
        hero3x1:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='221332'&EntityType='Item'&EntityId='24730'&Width=3840&Height=1280&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        brand:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='png'&Quality=85&ImageId='221342'&EntityType='Item'&EntityId='24730'&Width=1610&Height=537&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
    },
    {
      url:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=80&ImageId='218060'&EntityType='Item'&EntityId='22754'&Width=888&Height=500&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp&imageType=square",
      images: {
        hero3x1:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178378'&EntityType='Item'&EntityId='22754'&Width=3840&Height=1280&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        brand:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='png'&Quality=85&ImageId='178408'&EntityType='Item'&EntityId='22754'&Width=1610&Height=537&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
    },
    {
      url:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=80&ImageId='198168'&EntityType='Item'&EntityId='22993'&Width=888&Height=500&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp&imageType=square",
      images: {
        brand:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='png'&Quality=85&ImageId='179082'&EntityType='Item'&EntityId='22993'&Width=1610&Height=537&device=tablet_android&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
    },
  ],
};

storiesOf('Outstanding', module)
  .addDecorator(Theme)
  .add('default', () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Outstanding
        items={DATA.items}
        onPlay={action('tapped-play')}
        onWatchlist={action('tapped-watchlist')}
        onDiscoverMore={action('tapped-discover-more')}
      />
    </SafeAreaView>
  ))
  .add('landscape', () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Outstanding
        items={LANDSCAPE_DATA.items}
        onPlay={action('tapped-play')}
        onWatchList={action('tapped-watchlist')}
        onDiscoverMode={action('tapped-discover-more')}
      />
    </SafeAreaView>
  ));
