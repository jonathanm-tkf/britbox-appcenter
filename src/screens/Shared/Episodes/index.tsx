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
import { calculateSizeImage } from '@src/utils/images';
import { useTranslation } from 'react-i18next';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const Episodes = ({ item }: Props) => {
  const { t } = useTranslation('home');
  return (
    <>
      <Row>
        <Headline>{item.title}</Headline>
      </Row>
      <Carousel
        items={slice(item?.list?.items, 0, 20)}
        listProps={{ horizontal: true }}
        renderItem={({ item: card }: { item: MassiveSDKModelItemSummary }) => (
          <Card
            isEpisode
            width={157}
            height={107}
            url={calculateSizeImage(card.images?.wallpaper, 'wallpaper')}
            data={{
              title: card?.title || '',
              description:
                card.type === 'movie'
                  ? card.shortDescription || ''
                  : card.type === 'show'
                  ? t('season', {
                      context: 'plural',
                      count: card?.availableSeasonCount,
                    })
                  : `E ${card.episodeNumber} - ${card.duration} min`,
            }}
          />
        )}
      />
    </>
  );
};

export default Episodes;
