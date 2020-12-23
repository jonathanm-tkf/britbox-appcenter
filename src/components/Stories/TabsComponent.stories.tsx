import React from 'react';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import TabsComponent from '@components/TabsComponent';
import Theme from './Theme';

const FirstRoute = styled.View`
  flex: 1;
  background-color: #ff4081;
`;

const SecondRoute = styled.View`
  flex: 1;
  background-color: #673ab7;
`;

const ThreeRoute = styled.View`
  flex: 1;
  background-color: #6791b7;
`;

const FourRoute = styled.View`
  flex: 1;
  background-color: #123ab7;
`;

const FiveRoute = styled.View`
  flex: 1;
  background-color: #63beb7;
`;

const SixRoute = styled.View`
  flex: 1;
  background-color: #453ae7;
`;

const DATA = [
  { key: 'first', title: 'First Tab ', content: () => <FirstRoute /> },
  { key: 'second', title: 'Second Tab ', content: () => <SecondRoute /> },
  { key: 'three', title: 'Three Tab ', content: () => <ThreeRoute /> },
  { key: 'four', title: 'Four Tab ', content: () => <FourRoute /> },
  { key: 'five', title: 'Five Tab ', content: () => <FiveRoute /> },
  { key: 'six', title: 'Six Tab ', content: () => <SixRoute /> },
];

storiesOf('Tabs Component', module)
  .addDecorator(Theme)
  .add('default', () => <TabsComponent routes={DATA} />);
