import React from 'react';
import { FlatList, LayoutChangeEvent } from 'react-native';
import { Container } from './styles';

type Props = {
  data: ReadonlyArray<any> | null | undefined;
  numColumns?: number | undefined;
  renderItem: any;
  onLayout?: (event: LayoutChangeEvent) => void;
  initialNumToRender?: number;
  style?: any;
};

const NewGrid = ({
  data,
  renderItem,
  numColumns,
  onLayout,
  style,
  initialNumToRender = 15,
  ...rest
}: Props) => {
  return (
    <Container
      onLayout={(e) => {
        if (onLayout) onLayout(e);
      }}
    >
      <FlatList
        {...{ data, numColumns, style, rest }}
        scrollEnabled={false}
        listKey={Math.random().toString()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (renderItem ? renderItem({ item }) : null)}
        initialNumToRender={initialNumToRender}
      />
    </Container>
  );
};

export default NewGrid;
