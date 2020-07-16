import React, { useState, ReactNode } from 'react';

import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';
import { useNavigation } from 'react-navigation-hooks';
import { Container, ItemButton, ItemText, ItemIconWrapper, TabsAnimate } from './styles';

interface Item {
  id: number;
  icon: ReactNode;
  text: string;
  focus: boolean;
  goTo?: string;
}

interface Props {
  items: Item[];
  showTabs: boolean;
}

const Tabs = ({ items, showTabs }: Props) => {
  const [elements, setElements] = useState(items);
  const { navigate } = useNavigation();

  const onPress = (item: Item) => {
    const oldItemSelected = elements
      .filter((e) => e.focus === true)
      .map((element) => {
        element.focus = false;
        return element;
      });

    const newItemSelected = elements
      .filter((e) => e.id === item.id)
      .map((element) => {
        element.focus = true;
        return element;
      });
    setElements(
      orderBy(uniqBy([...newItemSelected, ...oldItemSelected, ...elements], 'id'), 'id', 'asc')
    );

    if (item.goTo) {
      navigate(item.goTo);
    }
  };

  return (
    <TabsAnimate animation={showTabs ? 'showTabsAnimation' : 'hideTabsAnimation'} duration={150}>
      <Container>
        {elements.map((item: Item) => (
          <ItemButton key={item.id} onPress={() => onPress(item)} onLongPress={() => onPress(item)}>
            <ItemIconWrapper {...{ focus: item.focus }}>{item.icon}</ItemIconWrapper>
            <ItemText {...{ focus: item.focus }}>{item.text}</ItemText>
          </ItemButton>
        ))}
      </Container>
    </TabsAnimate>
  );
};

export default Tabs;
