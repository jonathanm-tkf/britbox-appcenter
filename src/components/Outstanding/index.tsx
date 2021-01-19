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
  const [screenData, setScreenData] = useState({
    orientation: getDimensions().height >= getDimensions().width ? 'PORTRAIT' : 'LANDSCAPE',
    size: getDimensions(),
  });

  const stylesAspectRatio = useMemo(() => {
    return {
      width:
        Platform.OS === 'ios' ||
        (Platform.OS === 'android' && screenData.orientation === 'PORTRAIT')
          ? screenData.size.width
          : screenData.size.height,
      height:
        isTablet() && screenData.orientation === 'LANDSCAPE'
          ? Math.max(screenData.size.width, screenData.size.height) / 3
          : isTablet() && screenData.orientation === 'PORTRAIT'
          ? Math.min(screenData.size.width, screenData.size.height) / 3
          : screenData.size.width,
    };
  }, [screenData]);

  const onOrientationDidChange = useCallback((newOrientation: OrientationType) => {
    let parsedOrientation;

    if (newOrientation === 'LANDSCAPE-LEFT' || newOrientation === 'LANDSCAPE-RIGHT') {
      parsedOrientation = Platform.OS === 'ios' ? 'LANDSCAPE' : 'PORTRAIT';
    } else {
      parsedOrientation = Platform.OS === 'ios' ? 'PORTRAIT' : 'LANDSCAPE';
    }

    setScreenData({
      orientation: parsedOrientation,
      size: getDimensions(),
    });
  }, []);

  useEffect((): (() => void) => {
    if (isTablet()) {
      Orientation.getDeviceOrientation(onOrientationDidChange);
      Orientation.addDeviceOrientationListener(onOrientationDidChange);

      return () => {
        Orientation.removeDeviceOrientationListener(onOrientationDidChange);
      };
    }

    return () => {};
  }, [onOrientationDidChange]);

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
        top: screenData.size.width / (screenData.orientation === 'LANDSCAPE' ? 3 : 6) - height / 2,
        left: screenData.orientation === 'LANDSCAPE' ? '8%' : 0,
      };
    },
    [screenData]
  );

  return (
    <Wrapper
      style={{
        height: stylesAspectRatio.height + ACTIONS_HEIGHT,
      }}
    >
      <SwiperFlatList
        index={0}
        style={{
          width: stylesAspectRatio.width,
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
                      width={
                        isTablet() && screenData.orientation === 'LANDSCAPE'
                          ? Math.max(screenData.size.width, screenData.size.height)
                          : undefined
                      }
                      height={
                        isTablet() && screenData.orientation === 'LANDSCAPE'
                          ? Math.max(screenData.size.width, screenData.size.height) / 3
                          : undefined
                      }
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
                    <Gradient
                      height={
                        isTablet() && screenData.orientation === 'LANDSCAPE'
                          ? Math.max(screenData.size.width, screenData.size.height) / 3
                          : undefined
                      }
                    />
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
        tabletLandscape={isTablet() && screenData.orientation === 'LANDSCAPE'}
      />
    </Wrapper>
  );
};

export default Outstanding;
