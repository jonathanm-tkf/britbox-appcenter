/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { CloseIcon } from '@assets/icons';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  ContainerList,
  CloseButton,
  CloseButtonWrapper,
  FlatList,
  ItemTextWrapper,
  ItemText,
  Wrapper,
  Indicator,
  ModalTitle,
  WrapperList,
  ListTitle,
} from './styles';

export type Item = {
  title: string;
  value: string;
  selected: boolean;
  list?: string;
  paging: any;
  originalData: any;
};

type DataFilter = {
  title: string;
  list: string;
  data: Item[];
};

type RootParamList = {
  ModalFilter: {
    title: string;
    data: DataFilter[];
    previusRoute: string;
    originalData: any;
  };
};

type ModalFilterScreenRouteProp = RouteProp<RootParamList, 'ModalFilter'>;

const ModalFilter = () => {
  const { params } = useRoute<ModalFilterScreenRouteProp>();
  const { goBack, navigate } = useNavigation();
  const { data, title, previusRoute, originalData } = params;

  const goToDetail = (item: Item, type: string) => {
    navigate(previusRoute, { filter: { ...item, list: type, paging: item.paging, originalData } });
  };

  const renderItem = ({ item }: { item: Item }, type = '') => {
    return (
      <Wrapper key={item.title}>
        <TouchableOpacity onPress={() => goToDetail(item, type)}>
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
      <ContainerList>
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <WrapperList key={index.toString()}>
                {item.title && <ListTitle>{item.title}</ListTitle>}
                <FlatList
                  data={item.data}
                  renderItem={(element) => renderItem(element, item.list)}
                  keyExtractor={(_, i: number) => `${i.toString()}_flatList`}
                />
              </WrapperList>
            );
          })}
      </ContainerList>
      <CloseButtonWrapper>
        <CloseButton onPress={goBack}>
          <CloseIcon width={50} height={50} />
        </CloseButton>
      </CloseButtonWrapper>
    </Container>
  );
};

export default ModalFilter;
