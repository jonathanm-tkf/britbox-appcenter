/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import NewSlider from '@components/NewSlider';
import Theme from './Theme';

const NEW_TO_BRITBOX = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Earlier this morning, NYC',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'White Pocket Sunset',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Acrocorinth, Greece',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'Middle Earth, Germany',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

storiesOf('New Slider', module)
  .addDecorator(Theme)
  .add('default', () => <NewSlider data={NEW_TO_BRITBOX} />);
