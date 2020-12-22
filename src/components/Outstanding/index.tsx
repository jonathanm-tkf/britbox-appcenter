import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { Logo } from '@assets/icons';
import { fill } from 'lodash';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { isTablet } from 'react-native-device-info';
import { getDimensions } from '@src/utils/dimension';
import {
  Gradient,
  LogoWrapper,
  PaginationWrapper,
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
  const [screenSize, setScreenSize] = useState(getDimensions());
  const [activeIndex, setActiveIndex] = useState(0);
  const [orientation, setOrientation] = useState('PORTRAIT');

  const stylesAspectRatio = useMemo(() => {
    return {
      width:
        Platform.OS === 'ios' || (isTablet() && orientation === 'PORTRAIT')
          ? screenSize.width
          : screenSize.height,
      height:
        Platform.OS === 'ios'
          ? screenSize.width
          : isTablet() && orientation === 'PORTRAIT'
          ? screenSize.width / 3
          : screenSize.height / 3,
    };
  }, [screenSize.width, screenSize.height, orientation]);

  const onOrientationDidChange = useCallback((newOrientation: OrientationType) => {
    setScreenSize(getDimensions());

    if (isTablet()) {
      if (newOrientation === 'LANDSCAPE-LEFT' || newOrientation === 'LANDSCAPE-RIGHT') {
        setOrientation(Platform.OS === 'ios' ? 'LANDSCAPE' : 'PORTRAIT');
      } else {
        setOrientation(Platform.OS === 'ios' ? 'PORTRAIT' : 'LANDSCAPE');
      }
    }
  }, []);

  useEffect((): (() => void) => {
    if (isTablet()) {
      Orientation.addDeviceOrientationListener(onOrientationDidChange);
      Orientation.getDeviceOrientation(onOrientationDidChange);

      return () => {
        Orientation.removeDeviceOrientationListener(onOrientationDidChange);
      };
    }

    return () => {};
  });

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
        top:
          (Platform.OS === 'ios' || (isTablet() && orientation === 'PORTRAIT')
            ? screenSize.width
            : screenSize.height) /
            6 -
          height / 2,
        left: orientation === 'LANDSCAPE' ? '8%' : 0,
      };
    },
    [screenSize.width, screenSize.height, orientation]
  );

  return (
    <Wrapper>
      <SwiperFlatList
        index={0}
        style={{
          width:
            Platform.OS === 'ios' || (isTablet() && orientation === 'PORTRAIT')
              ? screenSize.width
              : screenSize.height,
          height: isTablet() ? undefined : screenSize.width + ACTIONS_HEIGHT,
        }}
        onChangeIndex={({ index }: { index: number }) => setActiveIndex(index)}
        disableVirtualization={false}
        removeClippedSubviews
        data={items}
        renderItem={({ item }: { item: Item }) => (
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
