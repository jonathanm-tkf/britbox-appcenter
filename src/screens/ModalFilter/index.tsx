import React from 'react';

import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { CloseIcon } from '@assets/icons';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  CloseButton,
  CloseButtonWrapper,
  FlatList,
  ItemTextWrapper,
  ItemText,
  Wrapper,
  Indicator,
  ListTitle,
  ModalTitle,
} from './styles';

export type Item = {
  title: string;
  value: string;
  selected: boolean;
};

type DataFilter = {
  title: string;
  data: Item[];
};

type RootParamList = {
  ModalFilter: {
    title: string;
    data: DataFilter[];
  };
};

type ModalFilterScreenRouteProp = RouteProp<RootParamList, 'ModalFilter'>;

const ModalFilter = () => {
  const { params } = useRoute<ModalFilterScreenRouteProp>();
  const { goBack, navigate } = useNavigation();
  const { data, title } = params;

  const goToDetail = (item: Item) => {
    navigate('Collections', { filter: item });
  };

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <Wrapper key={item.title}>
        <TouchableOpacity onPress={() => goToDetail(item)}>
          <ItemTextWrapper>
            {item.selected && <Indicator />}
            <ItemText active={item.selected}>{item.title}</ItemText>
          </ItemTextWrapper>
        </TouchableOpacity>
      </Wrapper>
    );
  };

  return (
    <Container>
      {title && <ModalTitle>{title}</ModalTitle>}
      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <FlatList
              key={index.toString()}
              data={item.data}
              ListHeaderComponent={() => <ListTitle>{item.title}</ListTitle>}
              renderItem={renderItem}
              keyExtractor={(_, i: number) => `${i.toString()}_flatList`}
            />
          );
        })}
      <CloseButtonWrapper>
        <CloseButton onPress={goBack}>
          <CloseIcon width={50} height={50} />
        </CloseButton>
      </CloseButtonWrapper>
    </Container>
  );
};

export default ModalFilter;
