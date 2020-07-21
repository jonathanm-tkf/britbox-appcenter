import React from 'react';

import { Container, FlatList, ItemSeparator } from './styles';

interface Props {
  items: any;
  listProps?: any;
  renderItem: (item?: any) => any;
}

const Carousel = ({ items, listProps, renderItem }: Props) => {
  const renderItemElement = (data: any) => {
    return renderItem({ ...data });
  };
  return (
    <Container>
      <FlatList
        data={items}
        renderItem={(item) => renderItemElement(item)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        keyExtractor={(_, index) => `${index}`}
        removeClippedSubviews={false}
        {...listProps}
      />
    </Container>
  );
};

export default Carousel;
