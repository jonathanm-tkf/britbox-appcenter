import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import { Logo, WatchlistIcon, DiscoverMoreIcon } from '@assets/icons';
import Action from '@components/Action';
import {
  Container,
  Gradient,
  GradientTop,
  Actions,
  ActionButton,
  ActionText,
  LogoWrapper,
  Slider,
  PaginationWrapper,
  Pagination,
  PaginationContent,
} from './styles';

interface Props {
  items: {
    url: string;
  }[];
  onWatchlist?: () => void;
  onDiscoverMore?: (item: any) => void;
  onPlay?: () => void;
  isContinue?: boolean;
  isTrailer?: boolean;
}

const image: StyleProp<ImageStyle> = {
  width: '100%',
  height: '100%',
};

const Outstanding = ({ items, onPlay, onWatchlist, onDiscoverMore }: Props) => {
  const { t } = useTranslation('layout');

  return (
    <Swiper
      renderPagination={(index, total) => (
        <PaginationWrapper>
          <PaginationContent />
          <Pagination dotsLength={total} activeDotIndex={index} />
        </PaginationWrapper>
      )}
    >
      {items.map((item: any, key: any) => (
        <Slider key={key.toString()}>
          <Container>
            <GradientTop />
            {item.url === 'no-image' ? (
              <LogoWrapper>
                <Logo width="80%" />
              </LogoWrapper>
            ) : (
              <Image style={image} source={{ uri: item.url }} resizeMode="cover" />
            )}
            <Gradient />
          </Container>
          <Actions>
            <ActionButton onPress={() => (onWatchlist ? onWatchlist() : {})}>
              <WatchlistIcon width={32} height={32} />
            </ActionButton>
            <ActionButton onPress={() => (onPlay ? onPlay() : {})}>
              <Action autoPlay loop width={100} height={100} />
            </ActionButton>
            <ActionButton onPress={() => (onDiscoverMore ? onDiscoverMore({ item }) : {})}>
              <DiscoverMoreIcon width={32} height={32} />
            </ActionButton>
          </Actions>
          <ActionText>{t('playnow')}</ActionText>
        </Slider>
      ))}
    </Swiper>
  );
};

export default Outstanding;
