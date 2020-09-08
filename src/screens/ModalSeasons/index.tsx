import React from 'react';

import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { CloseIcon } from '@assets/icons';
import {
  MassiveSDKModelSeasonsItem,
  MassiveSDKModelSeasons,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  CloseButton,
  CloseButtonWrapper,
  FlatList,
  SeasonItemTextWrapper,
  SeasonItemText,
  SeasonWrapper,
  Indicator,
} from './styles';

type RootParamList = {
  ModalSeasons: {
    show: {
      seasons: MassiveSDKModelSeasons;
      releaseYear: number;
      seasonNumber: number;
      id: number;
    };
  };
};

type ModalSeasonsScreenRouteProp = RouteProp<RootParamList, 'ModalSeasons'>;

const ModalSeasons = () => {
  const { params } = useRoute<ModalSeasonsScreenRouteProp>();
  const { goBack, navigate } = useNavigation();

  const {
    show: { seasons, id },
  } = params;

  const goToDetail = (item: MassiveSDKModelSeasonsItem) => {
    navigate('Detail', { seasonModal: { ...item } });
  };

  const renderItem = ({ item }: { item: MassiveSDKModelSeasonsItem }) => {
    return (
      <SeasonWrapper>
        <TouchableOpacity onPress={() => goToDetail(item)}>
          <SeasonItemTextWrapper>
            {parseInt(item.id || '0', 10) === parseInt(id.toString(), 10) && <Indicator />}
            <SeasonItemText
              numberOfLines={1}
              active={parseInt(item.id || '0', 10) === parseInt(id.toString() || '0', 10)}
            >
              {item.contextualTitle}
            </SeasonItemText>
          </SeasonItemTextWrapper>
        </TouchableOpacity>
      </SeasonWrapper>
    );
  };

  return (
    <Container>
      {seasons && (
        <FlatList
          data={seasons?.items || []}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
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

export default ModalSeasons;
