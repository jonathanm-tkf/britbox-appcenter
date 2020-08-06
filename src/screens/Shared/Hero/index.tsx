import React from 'react';
import {
  MassiveSDKModelPageEntry,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { slice } from 'lodash';
import Outstanding from '@components/Outstanding';
import { getImage } from '@src/utils/images';
import { Container } from './styles';

type Props = {
  item: MassiveSDKModelPageEntry;
  onWatchlist?: () => void;
  onDiscoverMore?: (i: any) => void;
  onPlay?: (i: any) => void;
};

const Hero = ({ item, onWatchlist, onDiscoverMore, onPlay }: Props) => {
  const items = slice(item?.list?.items, 0, 20).map((data: MassiveSDKModelItemSummary) => {
    return {
      ...data,
      url:
        getImage(
          data?.images?.square || data?.images?.hero3x1 || data?.images?.wallpaper,
          'square'
        ) || '',
    };
  });

  return (
    <Container>
      <Outstanding
        items={items}
        onWatchlist={onWatchlist}
        onPlay={(i) => (onPlay ? onPlay(i) : {})}
        onDiscoverMore={(i) => (onDiscoverMore ? onDiscoverMore(i) : {})}
      />
    </Container>
  );
};

export default Hero;