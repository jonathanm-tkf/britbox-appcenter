import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Input } from '../Input';
import Theme from './Theme';

storiesOf('Input', module)
  .addDecorator(Theme)
  .add('default', () => <Input label="Lorem Ipsum" />, {
    notes: 'A small component',
  })
  .add('label', () => <Input label="Lorem Ipsum" />, {
    notes: 'A small component',
  })
  .add('error', () => <Input label="Lorem Ipsum" error={{ text: 'Lorem Ipsum' }} />, {
    notes: 'A small component',
  });
