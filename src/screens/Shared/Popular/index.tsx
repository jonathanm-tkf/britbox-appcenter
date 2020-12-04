import React, { useCallback, useMemo } from 'react';
import {
  MassiveSDKModelPageEntry,
  MassiveSDKModelItemList,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import { slice } from 'lodash';
import Carousel from '@components/Carousel';
import NewCard from '@components/NewCard';
import { getImage } from '@src/utils/images';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { isTablet } from 'react-native-device-info';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const Popular = ({ item }: Props) => {
  const goToDetail = useCallback((card: MassiveSDKModelItemList) => {
    navigateByPath(card);
  }, []);

  const dimensions = useMemo(
    () => ({
      width: isTablet() ? 158 : 108,
      height: isTablet() ? 212 : 162,
    }),
    []
  );

  return (
    <>
      <Row>
        <Headline>{item.title !== 'loading' && item.title}</Headline>
      </Row>
      <Carousel
        items={slice(item?.list?.items, 0, 20)}
        listProps={{
          horizontal: true,
          style: {
            paddingBottom: 30,
          },
        }}
        renderItem={({ item: card }) => (
          <NewCard
            url={getImage(
              card.images?.poster || card.images?.square || card.images?.tile,
              'poster'
            )}
            width={dimensions.width}
            height={dimensions.height}
            onPress={() => ((item?.list?.title || '') !== 'loading' ? goToDetail(card) : {})}
          />
        )}
      />
    </>
  );
};

export default Popular;
