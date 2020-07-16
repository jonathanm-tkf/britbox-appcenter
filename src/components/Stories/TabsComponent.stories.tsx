/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import TabsComponent from '@components/TabsComponent';
import Theme from './Theme';

storiesOf('Tabs Component', module)
  .addDecorator(Theme)
  .add('default', () => <TabsComponent />);
