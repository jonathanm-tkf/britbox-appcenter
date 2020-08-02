import React from 'react';
import {
  MassiveSDKModelPageEntry,
  MassiveSDKModelItemSummary,
  MassiveSDKModelItemList,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import { slice } from 'lodash';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import { getImage } from '@src/utils/images';
import { useNavigation } from '@react-navigation/native';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const TitleTreatment = ({ item }: Props) => {
  const navigation = useNavigation();

  const goToDetail = (card: MassiveSDKModelItemList) => {
    navigation.push('Detail', { item: { ...card } });
  };

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
            width={137}
            height={107}
            url={getImage(card.images?.tile, 'tile')}
            onPress={() => goToDetail(card)}
          />
        )}
      />
    </>
  );
};

export default TitleTreatment;
