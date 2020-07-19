/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';

import TabsComponent from '@components/TabsComponent';
import { View } from 'react-native';
import Theme from './Theme';

const FirstRoute = () => <View style={[{ flex: 1, backgroundColor: '#ff4081' }]} />;
const SecondRoute = () => <View style={[{ flex: 1, backgroundColor: '#673ab7' }]} />;
const ThreeRoute = () => <View style={[{ flex: 1, backgroundColor: '#6791b7' }]} />;
const FourRoute = () => <View style={[{ flex: 1, backgroundColor: '#123ab7' }]} />;
const FiveRoute = () => <View style={[{ flex: 1, backgroundColor: '#63beb7' }]} />;
const SixRoute = () => <View style={[{ flex: 1, backgroundColor: '#453ae7' }]} />;

const DATA = [
  { key: 'first', title: 'First Tab', content: () => <FirstRoute /> },
  { key: 'second', title: 'Second Tab', content: () => <SecondRoute /> },
  { key: 'three', title: 'Three Tab', content: () => <ThreeRoute /> },
  { key: 'four', title: 'Four Tab', content: () => <FourRoute /> },
  { key: 'five', title: 'Five Tab', content: () => <FiveRoute /> },
  { key: 'six', title: 'Six Tab', content: () => <SixRoute /> },
];

storiesOf('Tabs Component', module)
  .addDecorator(Theme)
  .add('default', () => <TabsComponent routes={DATA} />);
