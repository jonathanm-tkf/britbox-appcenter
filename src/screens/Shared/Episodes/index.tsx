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
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { getDuration } from '@src/utils/template';
import { Container } from './styles';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const Episodes = ({ item }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  const goToDetail = (card: any) => {
    navigateByPath(card, true);
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
          return (
            <Card
              isEpisode={card.type === 'episode'}
              width={187}
              height={105}
              url={getImage(
                card.type === 'episode' ? card.images?.wallpaper : card.images?.tile,
                'wallpaper'
              )}
              resizeMode={card.type === 'movie' || card.type === 'episode' ? 'cover' : 'contain'}
              cardElement={card}
              data={{
                title: card.type === 'episode' ? card?.showTitle || '' : card?.title || '',
                description:
                  card.type === 'episode'
                    ? `${card.seasonTitle}・${card.episodeName}`
                    : `${getDuration(card?.duration || 0)} min`,
                // description:
                //   card.type === 'movie'
                //     ? card.shortDescription || ''
                //     : card.type === 'show'
                //     ? t('season', {
                //         context: 'plural',
                //         count: card?.availableSeasonCount,
                //       })
                //     : `E ${card.episodeNumber} - ${card.duration} min`,
              }}
              onPress={() => ((item?.list?.title || '') !== 'loading' ? goToDetail(card) : {})}
            />
          );
        }}
      />
    </>
  );
};

export default Episodes;
