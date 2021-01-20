import React, { useState, useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Logo } from '@assets/icons';
import { fill } from 'lodash';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { isTablet } from '@src/utils/tablet';
import {
  Gradient,
  LogoWrapper,
  PaginationWrapper,
  PaginationButtonWrapper,
  PaginationContent,
  Image,
  TTImage,
  ImageWrapper,
  PaginationDot,
  PaginationButton,
  PaginationDotsWrapper,
  Wrapper,
  WrapperButton,
} from './styles';
import Actions from './components/Actions';

type Item = {
  url: string;
  images: {
    brand?: string;
    hero3x1: string;
  };
};

interface Props {
  items: Item[];
  onWatchlist?: (item: any, isInWatchlist: boolean) => void;
  onDiscoverMore?: (item: any) => void;
  onPlay?: (item: any) => void;
  isContinue?: boolean;
  isTrailer?: boolean;
}

const Pagination = ({ size, paginationIndex, onPress, tabletLandscape }: any) => {
  return (
    <PaginationDotsWrapper>
      {fill(new Array(size), 1).map((item, index) => (
        <PaginationButtonWrapper key={index.toString()}>
          <PaginationButton onPress={onPress}>
            <PaginationDot active={index === paginationIndex} tabletLandscape={tabletLandscape} />
          </PaginationButton>
          <PaginationContent visible={index < size - 1} />
        </PaginationButtonWrapper>
      ))}
    </PaginationDotsWrapper>
  );
};

const PaginationComponent = ({
  size,
  paginationIndex,
  tabletLandscape,
}: {
  size: number;
  paginationIndex: number;
  tabletLandscape: boolean;
}) => {
  return (
    <PaginationWrapper tabletLandscape={tabletLandscape}>
      <Pagination size={size} paginationIndex={paginationIndex} tabletLandscape={tabletLandscape} />
    </PaginationWrapper>
  );
};

const ACTIONS_HEIGHT = 150;

const Outstanding = ({ items, onPlay, onWatchlist, onDiscoverMore }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const getItemTTIImageSize = useCallback(
    (item: Item) => {
      if (!item.images.brand) {
        return { width: 0, height: 0 };
      }

      const width = 400;
      const height = (Number(item.images.brand?.split('Height=')[1].split('&')[0]) * 100) / width;

      return {
        width,
        height,
        top: size.width / 6 - height / 2,
        left: size.height >= size.width ? '8%' : 0,
      };
    },
    [size]
  );

  return (
    <Wrapper
      style={{
        height: (isTablet() ? size.width / 3 : size.width) + ACTIONS_HEIGHT,
      }}
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }: LayoutChangeEvent) => {
        setSize({ width, height });
      }}
    >
      <SwiperFlatList
        index={0}
        style={{ width: size.width }}
        onChangeIndex={({ index }: { index: number }) => setActiveIndex(index)}
        disableVirtualization={false}
        removeClippedSubviews
        data={items}
        renderItem={({ item }: { item: Item }) => (
          <Wrapper>
            <WrapperButton onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}>
              <ImageWrapper>
                {item.url === 'no-image' ? (
                  <LogoWrapper>
                    <Logo width="80%" />
                  </LogoWrapper>
                ) : (
                  <>
                    <Image
                      width={size.width}
                      height={isTablet() ? size.width / 3 : size.width}
                      source={{
                        uri: isTablet() ? item.images?.hero3x1 : item.url || '',
                      }}
                      resizeMode="cover"
                    />
                    {isTablet() && item.images?.brand && (
                      <TTImage
                        source={{
                          uri: item.images.brand,
                        }}
                        style={getItemTTIImageSize(item)}
                        resizeMode="contain"
                      />
                    )}
                    <Gradient height={isTablet() ? size.width / 3 : size.width} />
                  </>
                )}
              </ImageWrapper>
            </WrapperButton>
            <Actions {...{ item, onPlay, onDiscoverMore, onWatchlist }} />
          </Wrapper>
        )}
      />
      <PaginationComponent
        size={items.length}
        paginationIndex={activeIndex}
        tabletLandscape={isTablet() && size.height >= size.width}
      />
    </Wrapper>
  );
};

export default Outstanding;
