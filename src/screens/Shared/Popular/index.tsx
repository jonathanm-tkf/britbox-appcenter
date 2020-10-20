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
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { Container } from './styles';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const Popular = ({ item }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  const goToDetail = (card: MassiveSDKModelItemList) => {
    navigateByPath(card);
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
            url={getImage(
              card.images?.poster || card.images?.square || card.images?.tile,
              'poster'
            )}
            element={{ marginBottom: 30 }}
            onPress={() => ((item?.list?.title || '') !== 'loading' ? goToDetail(card) : {})}
          />
        )}
      />
    </>
  );
};

export default Popular;
