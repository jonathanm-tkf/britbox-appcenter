import React, { useCallback, memo, useMemo } from 'react';
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
import { isTablet } from '@src/utils/tablet';
import { navigateByPath } from '@src/navigation/rootNavigation';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const Genre = ({ item }: Props) => {
  const goToDetail = useCallback((card: MassiveSDKModelItemList) => {
    navigateByPath(card);
  }, []);

  const dimensions = useMemo(
    () => ({
      width: isTablet() ? 250 : 190,
      height: isTablet() ? 250 : 190,
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
        listProps={{ horizontal: true }}
        renderItem={({ item: card }: { item: MassiveSDKModelItemList }) => (
          <NewCard
            url={getImage(card.images?.square, 'square')}
            width={dimensions.width}
            height={dimensions.height}
            onPress={() => ((item?.list?.title || '') !== 'loading' ? goToDetail(card) : {})}
          />
        )}
      />
    </>
  );
};

export default memo(Genre);
