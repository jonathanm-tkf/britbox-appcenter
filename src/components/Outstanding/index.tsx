import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Logo } from '@assets/icons';
import { fill } from 'lodash';
import SwiperFlatList from 'react-native-swiper-flatlist';
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

const ACTIONS_HEIGHT = 170;

const Outstanding = ({ items, onPlay, onWatchlist, onDiscoverMore }: Props) => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return (
    <Wrapper>
      <SwiperFlatList
        index={0}
        style={{ width: screenData.width, height: screenData.width + ACTIONS_HEIGHT }}
        onChangeIndex={({ index }) => setActiveIndex(index)}
        disableVirtualization={false}
        removeClippedSubviews
        data={items}
        renderItem={({ item }) => (
          <Wrapper>
            <WrapperButton onPress={() => (onDiscoverMore ? onDiscoverMore(item) : {})}>
              <ImageWrapper
                style={{
                  width: screenData.width,
                  height: screenData.width,
                }}
              >
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
