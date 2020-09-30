import React, { useState, ReactNode } from 'react';

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
  active: boolean;
  content: () => ReactNode;
};

interface Props {
  data: DATA[];
}

const UserWatching = ({ data }: Props) => {
  const [active, setActive] = useState(
    data.filter((item) => item.active).reduce((element) => element).key
  );

  const changeTab = (key: number) => {
    setActive(key);
  };

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
