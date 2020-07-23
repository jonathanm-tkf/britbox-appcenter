import React from 'react';
import { storiesOf } from '@storybook/react-native';

import HeaderCustom from '@components/HeaderCustom';
import Theme from './Theme';

storiesOf('HeaderCustom', module)
  .addDecorator(Theme)
  .add('default', () => <HeaderCustom />)
  .add('default-with-back', () => <HeaderCustom isBack />)
  .add('default-with-back-title', () => <HeaderCustom isBack title="Header" />)
  .add('with-all-props', () => <HeaderCustom shadow isBack title="Header" />);
