import React from 'react';
import { storiesOf } from '@storybook/react-native';

import ErrorLanding from '@components/ErrorLanding';
import { action } from '@storybook/addon-actions';
import Theme from './Theme';

storiesOf('Error Landing', module)
  .addDecorator(Theme)
  .add('default', () => <ErrorLanding onPress={action('onPress')} />);
