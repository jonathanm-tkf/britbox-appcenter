/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Image, StyleProp, ImageStyle } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
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
  // GradientTop,
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
  // SpaceLink,
  DiscoverMoreText,
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

const PaginationComponent = ({
  size,
  paginationIndex,
}: {
  size: number;
  paginationIndex: number;
}) => {
  return (
    <PaginationWrapper>
      <PaginationContent />
      <Pagination dotsLength={size} activeDotIndex={paginationIndex} />
    </PaginationWrapper>
  );
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
      <SwiperFlatList index={0} showPagination PaginationComponent={PaginationComponent}>
        {items.map((item: any, key: any) => (
          <Slider key={key.toString()}>
            <Container>
              {/* <GradientTop /> */}
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
              {item.type !== 'link' && (
                <>
                  <ActionButton
                    onPress={() =>
                      onWatchlist
                        ? onWatchlist(
                            item,
                            getIsInWatchlist(
                              item.type === 'season' ? item?.showId || '0' : item?.id || '0'
                            )
                          )
                        : {}
                    }
                  >
                    {getIsInWatchlist(
                      item.type === 'season' ? item?.showId || '0' : item?.id || '0'
                    ) ? (
                      <CheckedIcon fill="#FFFFFF" width={32} height={32} />
                    ) : (
                      <WatchlistIcon width={32} height={32} />
                    )}
                  </ActionButton>
                  <ActionButton onPress={() => (onPlay ? onPlay(item) : {})}>
                    <Action autoPlay loop width={100} height={100} />
                  </ActionButton>
                </>
              )}
              <ActionButton
                link={item.type === 'link'}
                onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}
              >
                <DiscoverMoreIcon width={32} height={32} />
                {item.type === 'link' && <DiscoverMoreText>{t('discover')}</DiscoverMoreText>}
              </ActionButton>
            </Actions>
            {item.type !== 'link' && <ActionText>{t('playnow')}</ActionText>}
          </Slider>
        ))}
      </SwiperFlatList>
    </Wrapper>
  );
};

export default Outstanding;
