import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Bookmark from '@components/Bookmark';
import Theme from './Theme';

storiesOf('Bookmark', module)
  .addDecorator(Theme)
  .add('default', () => <Bookmark>TV - PG</Bookmark>, {
    notes: 'A small component',
  })
  .add('bold', () => <Bookmark bold>HD</Bookmark>, {
    notes: 'A small component',
  });
