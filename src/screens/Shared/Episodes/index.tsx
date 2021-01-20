import React from 'react';
import {
  MassiveSDKModelPageEntry,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import { slice } from 'lodash';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import { getImage } from '@src/utils/images';
import { isTablet } from '@src/utils/tablet';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { withTheme } from 'styled-components';
import { ThemeProps } from '@store/modules/theme/types';
import { Container } from './styles';

type Props = {
  item: MassiveSDKModelPageEntry;
  readonly theme: ThemeProps;
};

const Episodes = ({ item, theme }: Props) => {
  const goToDetail = (card: any) => {
    navigateByPath(card, card.type === 'episode' || card.path.includes('/episode/'));
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
        renderItem={({ item: card }: { item: MassiveSDKModelItemSummary }) => {
          const dataInformation = {
            title: card.type === 'episode' ? card?.showTitle || '' : card?.title || '',
          };

          if (card.type !== 'link') {
            dataInformation.description =
              card.type === 'episode'
                ? `${card.seasonTitle}・${card.episodeName}`
                : `${card.type?.toUpperCase()}`;
          }

          return (
            <Card
              isEpisode={card.type === 'episode'}
              hasDescription
              width={isTablet() ? 250 : 187}
              height={isTablet() ? 140 : 105}
              url={getImage(
                card.type === 'episode' ? card.images?.wallpaper : card.images?.tile,
                'wallpaper'
              )}
              resizeMode={card.type === 'movie' || card.type === 'episode' ? 'cover' : 'contain'}
              cardElement={card}
              element={{ marginBottom: 20 }}
              data={dataInformation}
              onPress={() => ((item?.list?.title || '') !== 'loading' ? goToDetail(card) : {})}
            />
          );
        }}
      />
    </>
  );
};

export default withTheme(Episodes);
