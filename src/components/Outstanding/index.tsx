/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import { Image, StyleProp, ImageStyle, Dimensions } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Logo } from '@assets/icons';
import {
  Container,
  Gradient,
  LogoWrapper,
  Slider,
  PaginationWrapper,
  Pagination,
  PaginationContent,
  WrapperButton,
  Wrapper,
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
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

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
        showPagination
        data={items}
        PaginationComponent={PaginationComponent}
        disableVirtualization={false}
        renderItem={({ item }) => (
          <Slider width={screenData.width} height={(screenData.height * 60) / 100}>
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
            <Actions {...{ item, onPlay, onDiscoverMore, onWatchlist }} />
          </Slider>
        )}
      />
    </Wrapper>
  );
};

export default Outstanding;
