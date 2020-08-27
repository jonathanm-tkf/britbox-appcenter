import React from 'react';
import { storiesOf } from '@storybook/react-native';

import ModalCustom from '@components/ModalCustom';
import Theme from './Theme';

storiesOf('ModalCustom', module)
  .addDecorator(Theme)
  .add('default', () => <ModalCustom isVisible />);
