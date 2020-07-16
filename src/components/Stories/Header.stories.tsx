import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Header from '@components/Header';
import Theme from './Theme';

storiesOf('Header', module)
  .addDecorator(Theme)
  .add('default', () => <Header />)
  .add('shadow', () => <Header shadow />);
