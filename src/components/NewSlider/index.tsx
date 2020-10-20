import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import CustomCard from './CustomCard';
import { sliderWidth, itemWidth, sliderWidthSlim, itemWidthSlim } from './CustomCard/styles';
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

const { width } = Dimensions.get('window');

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

  const getContent = (item: MassiveSDKModelItemList) => {
    const image = getImage(item?.images?.poster, 'wallpaper');

    if (image === 'loading') {
      return (
        <ContentLoader
          speed={1}
          backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
          foregroundColor={theme.PRIMARY_COLOR}
        >
          <Rect x="11%" y="0" rx="8" ry="8" width="75%" height="15" />
          <Rect x="4%" y="25" rx="8" ry="8" width="87%" height="15" />
          <Rect x="2%" y="50" rx="8" ry="8" width="89%" height="15" />
          <Rect x="11%" y="75" rx="8" ry="8" width="75%" height="15" />
        </ContentLoader>
      );
    }
    return <SlimDescriptionText>{item?.shortDescription}</SlimDescriptionText>;
  };

  const getActions = (item: MassiveSDKModelItemList) => {
    const image = getImage(item?.images?.poster, 'wallpaper');

    if (image === 'loading') {
      return (
        <ContentLoader
          speed={1}
          backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
          foregroundColor={theme.PRIMARY_COLOR}
        >
          <Rect x={width / 2 - 105 - 20 + 8} y="35" rx="8" ry="8" width="50" height="50" />
          <Rect x={width / 2 - 35 - 20 + 16} y="10" rx="8" ry="8" width="70" height="100" />
          <Rect x={width / 2 + 55 - 20 + 24} y="35" rx="8" ry="8" width="50" height="50" />
        </ContentLoader>
      );
    }
    return (
      <>
        <Actions
          id={item?.id || '0'}
          type={item?.type}
          onWatchlist={() => (onWatchlist ? onWatchlist(item) : {})}
          onPlay={() => (onPlay ? onPlay(item) : {})}
          onDiscoverMore={() => (onDiscoverMore ? onDiscoverMore(item) : {})}
        />
      </>
    );
  };

  const stylesContainer = slim
    ? {
        paddingTop: getStatusBarHeight() + 50,
        // bottom: slim ? -hp(40) : 0,
        position: 'absolute',
      }
    : {};

  return (
    <Container>
      <SliderWrapper {...{ slim: !!slim, collection: !!collection }}>
        <Slider
          {...{
            slim: !!slim,
            collection: !!collection,
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
          sliderWidth={slim ? sliderWidthSlim : sliderWidth}
          itemWidth={slim ? itemWidthSlim : itemWidth}
          hasParallaxImages
          loop
          loopClonesPerSide={2}
          autoplay={false}
          firstItem={currentIndex}
          inactiveSlideScale={slim ? 0.8 : 0.92}
          inactiveSlideOpacity={slim ? 0.5 : 0.7}
          containerCustomStyle={[styles.sliderContainer, stylesContainer]}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={(index: number) => setCurrentIndex(index)}
          scrollEnabled={carouselData.length > 1}
        />
      </SliderWrapper>

      {slim && (
        <SlimDescription space="no">{getContent(carouselData[currentIndex].item)}</SlimDescription>
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

      {slim && <ActionsWrapper>{getActions(carouselData[currentIndex].item)}</ActionsWrapper>}
    </Container>
  );
};

export default NewSlider;
