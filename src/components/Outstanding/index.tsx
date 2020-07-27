import React, { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

import FastImage from 'react-native-fast-image';

import { StyleProp, ViewStyle } from 'react-native';
import { WatchlistIcon, DiscoverMoreIcon } from '@assets/icons';
import Action from '@components/Action';
import { useTranslation } from 'react-i18next';
import { Container, Gradient, GradientTop, Actions, ActionButton, ActionText } from './styles';

interface Props {
  item: {
    id: string;
    url: string;
  };
  onWatchlist?: () => void;
  onDiscoverMore?: () => void;
  onPlay?: () => void;
  isContinue?: boolean;
  isTrailer?: boolean;
}

const show: StyleProp<ViewStyle> = {
  display: 'flex',
  position: 'absolute',
  zIndex: 1,
};

const hide: StyleProp<ViewStyle> = {
  display: 'none',
};

const image: StyleProp<ViewStyle> = {
  width: '100%',
  height: '100%',
};

const Outstanding = ({ item, onPlay, onWatchlist, onDiscoverMore }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation('layout');
  return (
    <Container>
      <ContentLoader
        style={!loaded ? show : hide}
        speed={1}
        backgroundColor="#323c51"
        foregroundColor="#171b23"
      >
        <Rect x="0" y="0" width="100%" height="100%" />
      </ContentLoader>
      <GradientTop />
      <FastImage
        style={image}
        source={{ uri: item.url }}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={() => setLoaded(!loaded)}
      />
      <Actions>
        <ActionButton onPress={() => (onWatchlist ? onWatchlist() : {})}>
          <WatchlistIcon width={32} height={32} />
        </ActionButton>
        <ActionButton onPress={() => (onPlay ? onPlay() : {})}>
          <Action autoPlay loop width={100} height={100} />
        </ActionButton>
        <ActionButton onPress={() => (onDiscoverMore ? onDiscoverMore() : {})}>
          <DiscoverMoreIcon width={32} height={32} />
        </ActionButton>
      </Actions>
      <ActionText>{t('playnow')}</ActionText>
      <Gradient />
    </Container>
  );
};

export default Outstanding;
