import React, { useState, ReactNode } from 'react';

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
  const [active, setActive] = useState(0);

  const changeTab = (key: number) => {
    setActive(key);
  };

  return (
    <Container>
      <TabHeader>
        {data.map((item: DATA) => (
          <TabHeaderItem key={item.key.toString()} onPress={() => changeTab(item.key)}>
            {active === item.key && <TabHeaderItemIndicator />}
            <TabHeaderItemText active={active === item.key}>{item.label}</TabHeaderItemText>
          </TabHeaderItem>
        ))}
      </TabHeader>
      {data.map((item: DATA) => (
        <TabContent key={item.key.toString()}>
          {active === item.key && data[active].content()}
        </TabContent>
      ))}
    </Container>
  );
};

export default UserWatching;
