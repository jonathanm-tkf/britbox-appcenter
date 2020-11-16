import React, { useState } from 'react';
import { Logo } from '@assets/icons';
import { fill } from 'lodash';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { isTablet } from 'react-native-device-info';
import { getDimensions } from '@src/utils/dimension';
import {
  Gradient,
  LogoWrapper,
  PaginationWrapper,
  PaginationContent,
  Image,
  ImageWrapper,
  PaginationDot,
  PaginationButton,
  PaginationDotsWrapper,
  Wrapper,
  WrapperButton,
} from './styles';
import Actions from './components/Actions';

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

const Pagination = ({ size, paginationIndex, onPress }: any) => {
  return (
    <PaginationDotsWrapper>
      <PaginationContent />
      {fill(new Array(size), 1).map((item, index) => (
        <PaginationButton onPress={onPress} key={index.toString()}>
          <PaginationDot active={index === paginationIndex} />
        </PaginationButton>
      ))}
    </PaginationDotsWrapper>
  );
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
      <Pagination size={size} paginationIndex={paginationIndex} />
    </PaginationWrapper>
  );
};

const ACTIONS_HEIGHT = 150;

const Outstanding = ({ items, onPlay, onWatchlist, onDiscoverMore }: Props) => {
  const [screenData] = useState(getDimensions());
  const [activeIndex, setActiveIndex] = useState(0);

  const stylesAspectRatio = {
    width: screenData.width,
    height: isTablet() ? undefined : screenData.width,
    aspectRatio: isTablet() ? 16 / 9 : 1,
  };

  return (
    <Wrapper>
      <SwiperFlatList
        index={0}
        style={{
          width: screenData.width,
          height: isTablet() ? undefined : screenData.width + ACTIONS_HEIGHT,
        }}
        onChangeIndex={({ index }) => setActiveIndex(index)}
        disableVirtualization={false}
        removeClippedSubviews
        data={items}
        renderItem={({ item }) => (
          <Wrapper>
            <WrapperButton onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}>
              <ImageWrapper style={stylesAspectRatio}>
                {item.url === 'no-image' ? (
                  <LogoWrapper>
                    <Logo width="80%" />
                  </LogoWrapper>
                ) : (
                  <>
                    <Image
                      source={{
                        uri: item.url,
                      }}
                      resizeMode="cover"
                    />
                    <Gradient />
                  </>
                )}
              </ImageWrapper>
            </WrapperButton>
            <Actions {...{ item, onPlay, onDiscoverMore, onWatchlist }} />
          </Wrapper>
        )}
      />
      <PaginationComponent size={items.length} paginationIndex={activeIndex} />
    </Wrapper>
  );
};

export default Outstanding;
