import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Action from '@components/Action';
import Theme from './Theme';

storiesOf('Action', module)
  .addDecorator(Theme)
  .add('play', () => <Action autoPlay loop />)
  .add('continue', () => <Action autoPlay loop isContinue />)
  .add('trailer', () => <Action autoPlay loop isTrailer />)
  .add('loading', () => <Action autoPlay loop loading />);
