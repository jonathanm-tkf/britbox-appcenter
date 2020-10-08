import React, { ReactNode } from 'react';

import { Row } from '@components/Layout';
import {
  Container,
  TabHeader,
  TabHeaderItem,
  TabHeaderItemText,
  TabHeaderItemIndicator,
  TabContent,
} from './styles';

type DATA = {
  key: number;
  label: string;
  content: () => ReactNode;
};

interface Props {
  data: DATA[];
  active: number;
  changeTab: (index: number) => void;
}

const UserWatching = ({ data, active, changeTab }: Props) => {
  return (
    <Container>
      <Row>
        <TabHeader>
          {data.map((item: DATA) => (
            <TabHeaderItem key={item.key.toString()} onPress={() => changeTab(item.key)}>
              {active === item.key && <TabHeaderItemIndicator />}
              <TabHeaderItemText active={active === item.key}>{item.label}</TabHeaderItemText>
            </TabHeaderItem>
          ))}
        </TabHeader>
      </Row>
      {data.map((item: DATA) => (
        <TabContent key={item.key.toString()} active={active === item.key}>
          {item.content()}
        </TabContent>
      ))}
    </Container>
  );
};

export default UserWatching;
