import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import { Button } from '../Button';
import Theme from './Theme';

storiesOf('Button', module)
  .addDecorator(Theme)
  .add('default', () => <Button onPress={action('tapped-default')}>Press Me</Button>, {
    notes: 'A small component',
  })
  .add(
    'secondary',
    () => (
      <Button onPress={action('tapped-secondary')} secondary>
        Press Me
      </Button>
    ),
    {
      notes: 'A small component',
    }
  )
  .add('outline', () => (
    <Button onPress={action('tapped-outline')} outline>
      Press Me
    </Button>
  ))
  .add('opaque', () => (
    <Button onPress={action('tapped-opaque')} opaque>
      Press Me
    </Button>
  ))
  .add('stretch', () => (
    <Button onPress={action('tapped-stretch')} stretch>
      Press Me
    </Button>
  ))
  .add('big', () => (
    <Button onPress={action('tapped-big')} stretch size="big">
      Press Me
    </Button>
  ))
  .add('loading', () => (
    <Button onPress={action('tapped-big')} stretch loading size="big" color="#fff">
      Press Me
    </Button>
  ))
  .add('link', () => (
    <Button onPress={action('tapped-link')} link color="#fff">
      Press Me
    </Button>
  ))
  .add('link secondary', () => (
    <Button onPress={action('tapped-link')} link color="#2d6eff">
      Press Me
    </Button>
  ));
