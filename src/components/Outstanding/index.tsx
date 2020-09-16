import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import { Logo, WatchlistIcon, DiscoverMoreIcon, CheckedIcon } from '@assets/icons';
import Action from '@components/Action';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { checkIsInWatchingList } from '@src/services/watchlist';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
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
  WrapperButton,
  Wrapper,
} from './styles';

interface Props {
  items: {
    url: string;
  }[];
  onWatchlist?: (item: any, isInWatchlist: boolean) => void;
  onDiscoverMore?: (item: any) => void;
  onPlay?: (item: any) => void;
  isContinue?: boolean;
  isTrailer?: boolean;
}

const image: StyleProp<ImageStyle> = {
  width: '100%',
  height: '100%',
};

const Outstanding = ({ items, onPlay, onWatchlist, onDiscoverMore }: Props) => {
  const { t } = useTranslation('layout');
  const bookmarklist = useSelector(
    (state: AppState) => state.user.profile?.bookmarkList || []
  ) as MassiveSDKModelItemList;

  const getIsInWatchlist = (id: string) =>
    checkIsInWatchingList(bookmarklist?.items || [], id || '0') === 3;

  return (
    <Wrapper>
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
                <WrapperButton onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}>
                  <Image style={image} source={{ uri: item.url }} resizeMode="cover" />
                </WrapperButton>
              )}
              <Gradient />
            </Container>
            <Actions>
              <ActionButton
                onPress={() =>
                  onWatchlist ? onWatchlist(item, getIsInWatchlist(item?.id || '0')) : {}
                }
              >
                {getIsInWatchlist(item?.id || '0') ? (
                  <CheckedIcon fill="#FFFFFF" width={32} height={32} />
                ) : (
                  <WatchlistIcon width={32} height={32} />
                )}
              </ActionButton>
              <ActionButton onPress={() => (onPlay ? onPlay(item) : {})}>
                <Action autoPlay loop width={100} height={100} />
              </ActionButton>
              <ActionButton onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}>
                <DiscoverMoreIcon width={32} height={32} />
              </ActionButton>
            </Actions>
            <ActionText>{t('playnow')}</ActionText>
          </Slider>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default Outstanding;
