import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Title, Paragraph, Headline } from '../Typography';
import Theme from './Theme';

storiesOf('Typography', module)
  .addDecorator(Theme)
  .add('Title', () => <Title>Title</Title>, {
    notes: 'A small component',
  })
  .add('Headline', () => <Headline>Headline</Headline>, {
    notes: 'A small component',
  })
  .add('Paragraph', () => <Paragraph>Paragraph</Paragraph>, {
    notes: 'A small component',
  });
