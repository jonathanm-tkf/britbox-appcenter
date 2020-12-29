import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useSelector } from 'react-redux';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { AppState } from '@store/modules/rootReducer';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { isTablet } from 'react-native-device-info';
import { getDimensions, percentageWidth, percentageHeight } from '@src/utils/dimension';
import CustomCard from './CustomCard';
import {
  Container,
  Slider,
  SliderWrapper,
  SlimDescriptionText,
  SlimDescription,
  ActionsWrapper,
  Button,
} from './styles';
import Actions from './Actions';

const { width, height } = getDimensions();

const styles = StyleSheet.create({
  sliderContainer: {
    overflow: 'visible',
  },
  sliderContentContainer: {
    overflow: 'visible',
  },
});

type CustomFiled = {
  description: string;
  cta: string;
};

interface Props {
  data: MassiveSDKModelItemList[];
  slim?: boolean;
  collection?: boolean;
  center?: boolean;
  onWatchlist?: (item: MassiveSDKModelItemList) => void;
  onPlay?: (item: MassiveSDKModelItemList) => void;
  onDiscoverMore?: (item: MassiveSDKModelItemList) => void;
}

const NewSlider = ({
  data,
  slim,
  collection,
  center,
  onWatchlist,
  onPlay,
  onDiscoverMore,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [orientation, setOrientation] = useState(height >= width ? 'PORTRAIT' : 'LANDSCAPE');
  const theme = useSelector((state: AppState) => state.theme.theme);

  const carouselData = data.map((item) => {
    const image = slim ? item.images?.poster : item.images?.tile || item.images?.wallpaper;
    const imageType = slim ? 'poster' : 'wallpaper';
    return {
      title: item.title,
      illustration: getImage(image, imageType),
      item,
    };
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [data]);

  const onOrientationDidChange = useCallback((newOrientation: OrientationType) => {
    if (newOrientation === 'PORTRAIT' || newOrientation === 'PORTRAIT-UPSIDEDOWN') {
      setOrientation(Platform.OS === 'ios' ? 'PORTRAIT' : 'LANDSCAPE');
    } else if (newOrientation === 'LANDSCAPE-LEFT' || newOrientation === 'LANDSCAPE-RIGHT') {
      setOrientation(Platform.OS === 'ios' ? 'LANDSCAPE' : 'PORTRAIT');
    }
  }, []);

  useEffect(() => {
    if (isTablet()) {
      Orientation.addDeviceOrientationListener(onOrientationDidChange);
      Orientation.getDeviceOrientation(onOrientationDidChange);

      return () => {
        Orientation.removeOrientationListener(onOrientationDidChange);
      };
    }

    return () => {};
  });

  const [sliderWidth, itemWidth] = useMemo(() => {
    const { width: screenWidth, height: screenHeight } = getDimensions();

    if (isTablet()) {
      const size = orientation === 'PORTRAIT' ? screenWidth : screenHeight;
      return [size, percentageWidth(isTablet() && slim ? 42 : isTablet() ? 55 : 40)];
    }

    const size = Math.min(screenWidth, screenHeight);
    return [size, 171, slim ? 274 : size / 3 + 40];
  }, [orientation, slim]);

  const renderItem = ({ item, index }: any, parallaxProps: any) => {
    return (
      <CustomCard
        data={item}
        even={(index + 1) % 2 === 0}
        parallax
        // collection
        center={center}
        enableTouch={carouselData.length > 1}
        {...{ parallaxProps, slim }}
        active={index === currentIndex}
      />
    );
  };

  const getImageSquare = (image: string) => {
    return image === 'no-image' ? false : image;
  };

  const getContent = useCallback(
    (item?: MassiveSDKModelItemList) => {
      const image = getImage(item?.images?.poster, 'wallpaper');
      const sizes = [75, 87, 82, 75];

      if (image === 'loading') {
        return (
          <ContentLoader
            speed={1}
            backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
            foregroundColor={theme.PRIMARY_COLOR}
            style={{ width: sliderWidth, height: 25 * sizes.length }}
          >
            {sizes.map((size, index) => (
              <Rect
                key={String(index)}
                x={
                  isTablet()
                    ? orientation === 'LANDSCAPE'
                      ? percentageHeight((175 - size) / 2)
                      : percentageWidth((140 - size) / 2)
                    : percentageWidth((100 - size) / 2)
                }
                y={`${index * 25}%`}
                rx="8"
                ry="8"
                width={
                  isTablet()
                    ? orientation === 'LANDSCAPE'
                      ? percentageHeight(size)
                      : percentageWidth(size - 40)
                    : percentageWidth(size)
                }
                height="15"
              />
            ))}
          </ContentLoader>
        );
      }
      return (
        <SlimDescriptionText>
          {item?.type === 'link' ? item?.customFields?.description : item?.shortDescription}
        </SlimDescriptionText>
      );
    },
    [orientation, theme.PRIMARY_COLOR, theme.PRIMARY_COLOR_OPAQUE, sliderWidth]
  );

  const getActions = useCallback(
    (item?: MassiveSDKModelItemList) => {
      const image = getImage(item?.images?.poster, 'wallpaper');
      const padding = 20;
      const smallBoxSize = 50;
      const bigBoxSize = 75;

      if (image === 'loading') {
        return (
          <ContentLoader
            speed={1}
            backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
            foregroundColor={theme.PRIMARY_COLOR}
            style={{ height: 110, width: sliderWidth }}
          >
            <Rect
              x={sliderWidth / 2 - smallBoxSize * 2}
              y="35"
              rx="8"
              ry="8"
              width="50"
              height="50"
            />
            <Rect
              x={sliderWidth / 2 - bigBoxSize / 4 - padding / 2}
              y="10"
              rx="8"
              ry="8"
              width="70"
              height="100"
            />
            <Rect
              x={sliderWidth / 2 + smallBoxSize + padding / 2}
              y="35"
              rx="8"
              ry="8"
              width="50"
              height="50"
            />
          </ContentLoader>
        );
      }

      return (
        <Actions
          item={item}
          onWatchlist={() => (onWatchlist ? onWatchlist(item) : {})}
          onPlay={() => (onPlay ? onPlay(item) : {})}
          onDiscoverMore={() => (onDiscoverMore ? onDiscoverMore(item) : {})}
        />
      );
    },
    [
      onDiscoverMore,
      onPlay,
      onWatchlist,
      sliderWidth,
      theme.PRIMARY_COLOR,
      theme.PRIMARY_COLOR_OPAQUE,
    ]
  );

  const stylesContainer = slim
    ? {
        paddingTop: getStatusBarHeight() + (isTablet() ? 70 : 50),
        position: 'absolute',
      }
    : {};

  return (
    <Container>
      <SliderWrapper slim={!!slim} collection={!!collection} width={sliderWidth}>
        <Slider
          {...{
            slim: !!slim,
            collection: !!collection,
            width: sliderWidth,
            height: Math.min(getDimensions().width, getDimensions().height) * 0.65,
            source:
              (slim || collection) &&
              getImageSquare(
                getImage(
                  data[currentIndex]?.images?.square ||
                    data[currentIndex]?.images?.wallpaper ||
                    data[currentIndex]?.images?.hero3x1,
                  'square'
                )
              )
                ? {
                    uri: getImageSquare(
                      getImage(
                        data[currentIndex]?.images?.square ||
                          data[currentIndex]?.images?.wallpaper ||
                          data[currentIndex]?.images?.hero3x1,
                        'square'
                      )
                    ),
                  }
                : {},
          }}
        />
        <Carousel
          data={carouselData}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          loop
          loopClonesPerSide={2}
          autoplay={false}
          firstItem={currentIndex}
          inactiveSlideScale={slim ? 0.8 : 0.92}
          inactiveSlideOpacity={slim ? 1 : 0.7}
          containerCustomStyle={[styles.sliderContainer, stylesContainer]}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={(index: number) => setCurrentIndex(index)}
          scrollEnabled={carouselData.length > 1}
        />
      </SliderWrapper>

      {slim && (
        <SlimDescription width={sliderWidth} space="no">
          {getContent(carouselData[currentIndex]?.item)}
        </SlimDescription>
      )}

      {collection && (carouselData[currentIndex].item?.customFields as CustomFiled)?.description && (
        <SlimDescription
          {...{ collection }}
          space={(carouselData[currentIndex].item?.customFields as CustomFiled)?.description}
        >
          {(carouselData[currentIndex].item?.customFields as CustomFiled)?.cta && (
            <Button
              size="big"
              fontWeight="medium"
              stretch
              onPress={() => navigateByPath({ path: carouselData[currentIndex].item.path })}
            >
              {(carouselData[currentIndex].item?.customFields as CustomFiled)?.cta}
            </Button>
          )}
        </SlimDescription>
      )}

      {slim && (
        <ActionsWrapper landscape={isTablet() && orientation === 'LANDSCAPE'}>
          {getActions(carouselData[currentIndex]?.item)}
        </ActionsWrapper>
      )}
    </Container>
  );
};

export default NewSlider;
