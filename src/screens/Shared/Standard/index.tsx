import React from 'react';
import { MassiveSDKModelPageEntry } from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import { slice } from 'lodash';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import { getImage } from '@src/utils/images';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const Standard = ({ item }: Props) => {
  return (
    <>
      <Row>
        <Headline>{item.title}</Headline>
      </Row>
      <Carousel
        items={slice(item?.list?.items, 0, 20)}
        listProps={{ horizontal: true }}
        renderItem={({ item: card }) => (
          <Card url={getImage(card.images?.poster, 'poster')} width={108} height={162} />
        )}
      />
    </>
  );
};

export default Standard;
