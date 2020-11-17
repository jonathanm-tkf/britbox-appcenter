import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Action from '@components/Action';
import Theme from './Theme';

storiesOf('Action', module)
  .addDecorator(Theme)
  .add('play', () => <Action autoPlay loop animated width={150} height={150} />)
  .add('continue', () => <Action autoPlay loop isContinue animated width={150} height={150} />)
  .add('trailer', () => <Action autoPlay loop isTrailer animated width={150} height={150} />)
  .add('loading', () => <Action autoPlay loop loading animated width={150} height={150} />);
