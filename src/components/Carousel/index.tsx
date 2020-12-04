import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Container, FlatList, ItemSeparator } from './styles';

interface Props {
  items: any;
  listProps?: any;
  renderItem: (item?: any) => any;
  style?: StyleProp<ViewStyle>;
}

const Carousel = ({ items, listProps, renderItem, style }: Props) => {
  const renderItemElement = (data: any) => {
    return renderItem({ ...data });
  };
  return (
    <Container {...{ style }}>
      <FlatList
        data={items}
        renderItem={(item) => renderItemElement(item)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        keyExtractor={(_, index) => `${index}`}
        {...listProps}
      />
    </Container>
  );
};

export default Carousel;
