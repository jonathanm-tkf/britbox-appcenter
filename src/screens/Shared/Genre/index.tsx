import React from 'react';
import { MassiveSDKModelPageEntry } from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import { slice } from 'lodash';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import { calculateSizeImage } from '@src/utils/images';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const Genre = ({ item }: Props) => {
  return (
    <>
      <Row>
        <Headline>{item.title}</Headline>
      </Row>
      <Carousel
        items={slice(item?.list?.items, 0, 20)}
        listProps={{ horizontal: true }}
        renderItem={({ item: card }) => (
          <Card url={calculateSizeImage(card.images?.square, 'square')} width={130} height={130} />
        )}
      />
    </>
  );
};

export default Genre;
