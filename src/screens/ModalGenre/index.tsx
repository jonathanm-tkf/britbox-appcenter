import React, { useEffect, useState } from 'react';

import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { CloseIcon } from '@assets/icons';
import { TouchableOpacity } from 'react-native';
import { Header } from '@store/modules/core/types';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { useTranslation } from 'react-i18next';
import {
  Container,
  CloseButton,
  CloseButtonWrapper,
  FlatList,
  SeasonItemTextWrapper,
  SeasonItemText,
  SeasonWrapper,
  Indicator,
  GenreTitle,
} from './styles';

type RootParamList = {
  ModalGenre: {
    genre: string;
  };
};

type ModalGenreScreenRouteProp = RouteProp<RootParamList, 'ModalGenre'>;

const ModalGenre = () => {
  const { t } = useTranslation('layout');
  const { params } = useRoute<ModalGenreScreenRouteProp>();
  const { goBack, navigate } = useNavigation();
  const menu = useSelector((state: AppState) => state.core?.menu?.navigation?.header);
  const [items, setItems] = useState<Header[]>([]);
  const { genre } = params;

  const goToDetail = (item: Header) => {
    navigate('Collections', { genre: item.path });
  };

  useEffect(() => {
    if (menu) {
      const explore = (menu.filter((item: Header) => item.label === 'Explore') || []).reduce(
        (e) => e
      ).children;

      if (explore && explore?.length > 0) {
        const genres = (explore.filter((list) => list.label === 'Genre') || []).reduce((l) => l)
          .children;
        setItems(genres);
      }
    }
  }, [menu]);

  const renderItem = ({ item }: { item: Header }) => {
    return (
      <SeasonWrapper key={item.label}>
        <TouchableOpacity onPress={() => goToDetail(item)}>
          <SeasonItemTextWrapper>
            {genre === item.label && <Indicator />}
            <SeasonItemText active={genre === item.label}>{item.label}</SeasonItemText>
          </SeasonItemTextWrapper>
        </TouchableOpacity>
      </SeasonWrapper>
    );
  };

  return (
    <Container>
      {items.length > 0 && (
        <FlatList
          data={items}
          ListHeaderComponent={() => <GenreTitle>{t('genre')}</GenreTitle>}
          renderItem={renderItem}
          keyExtractor={(_, index: number) => `${index.toString()}_flatList`}
        />
      )}
      <CloseButtonWrapper>
        <CloseButton onPress={goBack}>
          <CloseIcon width={50} height={50} />
        </CloseButton>
      </CloseButtonWrapper>
    </Container>
  );
};

export default ModalGenre;
