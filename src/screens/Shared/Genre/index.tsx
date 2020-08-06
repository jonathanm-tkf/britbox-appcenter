import React from 'react';
import {
  MassiveSDKModelPageEntry,
  MassiveSDKModelItemList,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import { slice } from 'lodash';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import { getImage } from '@src/utils/images';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Container } from './styles';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const Genre = ({ item }: Props) => {
  const navigation = useNavigation();
  const theme = useSelector((state: AppState) => state.theme.theme);

  const goToDetail = (card: MassiveSDKModelItemList) => {
    navigation.push('Collections', { item: { ...card } });
  };

  return (
    <>
      <Row>
        {item.title === 'loading' ? (
          <Container>
            <ContentLoader
              speed={1}
              backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
              foregroundColor={theme.PRIMARY_COLOR}
            >
              <Rect x="0" y="0" rx="8" ry="8" width="50%" height="40" />
            </ContentLoader>
          </Container>
        ) : (
          <Headline>{item.title}</Headline>
        )}
      </Row>
      <Carousel
        items={slice(item?.list?.items, 0, 20)}
        listProps={{ horizontal: true }}
        renderItem={({ item: card }) => (
          <Card
            url={getImage(card.images?.square, 'square')}
            width={190}
            height={190}
            onPress={() => ((item?.list?.title || '') !== 'loading' ? goToDetail(card) : {})}
          />
        )}
      />
    </>
  );
};

export default Genre;