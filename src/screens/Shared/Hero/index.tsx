import React from 'react';
import {
  MassiveSDKModelPageEntry,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { slice } from 'lodash';
import Outstanding from '@components/Outstanding';
import { getImage } from '@src/utils/images';
import { isTablet } from 'react-native-device-info';
import { Container } from './styles';

type Props = {
  item: MassiveSDKModelPageEntry;
  onWatchlist?: (i: any, y: boolean) => void;
  onDiscoverMore?: (i: any) => void;
  onPlay?: (i: any) => void;
};

const Hero = ({ item, onWatchlist, onDiscoverMore, onPlay }: Props) => {
  const list = slice(item?.list?.items, 0, 20);
  // states in watchlist
  // 3 On
  // 2 Loading
  // 1 Off
  const items = list.map((data: MassiveSDKModelItemSummary) => {
    return {
      ...data,
      url:
        getImage(
          (isTablet() ? data?.images?.tile : data?.images?.square) ||
            data?.images?.hero3x1 ||
            data?.images?.wallpaper,
          'square'
        ) || '',
      images:
        isTablet() && data?.images?.brand
          ? {
              brand: getImage(data.images.brand, '', 0, 0, 0, 'png'),
              hero3x1: data.images?.hero3x1,
            }
          : data.images,
    };
  });

  return (
    <Container>
      <Outstanding
        items={items}
        onWatchlist={(i, y) => (onWatchlist ? onWatchlist(i, y) : {})}
        onPlay={(i) => (onPlay ? onPlay(i) : {})}
        onDiscoverMore={(i) => (onDiscoverMore ? onDiscoverMore(i) : {})}
      />
    </Container>
  );
};

export default Hero;
