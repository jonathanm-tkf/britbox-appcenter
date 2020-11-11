/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import NewSlider from '@components/NewSlider';
import Theme from './Theme';

const NEW_TO_BRITBOX = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    shortDescription:
      'Detective Gil Mayo wise-cracks his way through murder mysteries. From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192465'&EntityType='Item'&EntityId='18052'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",

      hero3x1: 'https://i.imgur.com/UYiroysl.jpg',
      poster:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192484'&EntityType='Item'&EntityId='18052'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
    },
  },
  {
    title: 'Earlier this morning, NYC',
    shortDescription:
      'From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192465'&EntityType='Item'&EntityId='18052'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",

      hero3x1: 'https://i.imgur.com/UPrs1EWl.jpg',
      poster:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192484'&EntityType='Item'&EntityId='18052'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
    },
  },
  {
    title: 'White Pocket Sunset',
    shortDescription:
      'Detective Gil Mayo wise-cracks his way through murder mysteries. From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192465'&EntityType='Item'&EntityId='18052'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",

      hero3x1: 'https://i.imgur.com/MABUbpDl.jpg',
      poster:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192484'&EntityType='Item'&EntityId='18052'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
    },
  },
  {
    title: 'Acrocorinth, Greece',
    shortDescription:
      'From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192465'&EntityType='Item'&EntityId='18052'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",

      hero3x1: 'https://i.imgur.com/KZsmUi2l.jpg',
      poster:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192484'&EntityType='Item'&EntityId='18052'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
    },
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    shortDescription:
      'Detective Gil Mayo wise-cracks his way through murder mysteries. From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192465'&EntityType='Item'&EntityId='18052'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",

      hero3x1: 'https://i.imgur.com/2nCt3Sbl.jpg',
      poster:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192484'&EntityType='Item'&EntityId='18052'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
    },
  },
  {
    title: 'Middle Earth, Germany',
    shortDescription:
      'From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192465'&EntityType='Item'&EntityId='18052'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",

      hero3x1: 'https://i.imgur.com/lceHsT6l.jpg',
      poster:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192484'&EntityType='Item'&EntityId='18052'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
    },
  },
];

const NEW_TO_BRITBOX_LOADING = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    shortDescription:
      'Detective Gil Mayo wise-cracks his way through murder mysteries. From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper: 'loading',
      hero3x1: 'loading',
      poster: 'loading',
    },
  },
  {
    title: 'Earlier this morning, NYC',
    shortDescription:
      'From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper: 'loading',
      hero3x1: 'loading',
      poster: 'loading',
    },
  },
  {
    title: 'White Pocket Sunset',
    shortDescription:
      'Detective Gil Mayo wise-cracks his way through murder mysteries. From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper: 'loading',
      hero3x1: 'loading',
      poster: 'loading',
    },
  },
  {
    title: 'Acrocorinth, Greece',
    shortDescription:
      'From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper: 'loading',
      hero3x1: 'loading',
      poster: 'loading',
    },
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    shortDescription:
      'Detective Gil Mayo wise-cracks his way through murder mysteries. From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper: 'loading',
      hero3x1: 'loading',
      poster: 'loading',
    },
  },
  {
    title: 'Middle Earth, Germany',
    shortDescription:
      'From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper: 'loading',
      hero3x1: 'loading',
      poster: 'loading',
    },
  },
];

const HERO_SLIM_COLLECTION = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    shortDescription:
      'Detective Gil Mayo wise-cracks his way through murder mysteries. From having his ex-love interest as a colleague to raising his cheeky teenage daughter on his own, his life is full of complications.',
    images: {
      wallpaper:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192465'&EntityType='Item'&EntityId='18052'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",

      hero3x1: 'https://i.imgur.com/UYiroysl.jpg',
      poster:
        "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='192484'&EntityType='Item'&EntityId='18052'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
    },
  },
];

storiesOf('New Slider', module)
  .addDecorator(Theme)
  .add('default', () => <NewSlider data={NEW_TO_BRITBOX} />)
  .add('slim', () => <NewSlider data={NEW_TO_BRITBOX} slim />)
  .add('slim loading', () => <NewSlider data={NEW_TO_BRITBOX_LOADING} slim />)
  .add('slim collection', () => <NewSlider data={HERO_SLIM_COLLECTION} collection />);
