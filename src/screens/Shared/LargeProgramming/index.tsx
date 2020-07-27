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

const LargeProgramming = ({ item }: Props) => {
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
            hasDescription
            width={157}
            height={107}
            url={calculateSizeImage(card.images?.tile, 'tile')}
            data={{
              title: card?.title || '',
              description: card.type === 'movie' ? t('movie') : t('show'),
            }}
          />
        )}
      />
    </>
  );
};

export default LargeProgramming;
