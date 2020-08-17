/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import CustomCard from './CustomCard';
import { sliderWidth, itemWidth, sliderWidthSlim, itemWidthSlim } from './CustomCard/styles';
import { Container, Slider, SliderWrapper, SlimDescriptionText, SlimDescription } from './styles';
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

interface Props {
  data: MassiveSDKModelItemList[];
  slim?: boolean;
  onWatchlist?: (item: MassiveSDKModelItemList) => void;
  onPlay?: (item: MassiveSDKModelItemList) => void;
  onDiscoverMore?: (item: MassiveSDKModelItemList) => void;
}

const NewSlider = ({ data, slim, onWatchlist, onPlay, onDiscoverMore }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const carouselData = data.map((item) => {
    const image = slim
      ? item.images?.poster
      : item.images?.hero3x1 || item.images?.wallpaper || item.images?.square;
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
          <Rect x="11%" y="0" rx="8" ry="8" width="75%" height="20" />
          <Rect x="4%" y="30" rx="8" ry="8" width="87%" height="20" />
          <Rect x="2%" y="60" rx="8" ry="8" width="89%" height="20" />
          <Rect x="11%" y="90" rx="8" ry="8" width="75%" height="20" />
          <Rect x={width / 2 - 105 - 20 + 8} y="165" rx="8" ry="8" width="50" height="50" />
          <Rect x={width / 2 - 35 - 20 + 16} y="140" rx="8" ry="8" width="70" height="100" />
          <Rect x={width / 2 + 55 - 20 + 24} y="165" rx="8" ry="8" width="50" height="50" />
        </ContentLoader>
      );
    }
    return (
      <>
        <SlimDescriptionText>{item?.shortDescription}</SlimDescriptionText>
        <Actions
          onWatchlist={() => (onWatchlist ? onWatchlist(item) : {})}
          onPlay={() => (onPlay ? onPlay(item) : {})}
          onDiscoverMore={() => (onDiscoverMore ? onDiscoverMore(item) : {})}
        />
      </>
    );
  };

  return (
    <Container>
      <SliderWrapper {...{ slim: !!slim }}>
        <Slider
          {...{
            slim: !!slim,
            source:
              slim && getImageSquare(getImage(data[currentIndex]?.images?.square, 'square'))
                ? { uri: getImageSquare(getImage(data[currentIndex]?.images?.square, 'square')) }
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
          containerCustomStyle={[
            styles.sliderContainer,
            slim
              ? {
                  top: getStatusBarHeight() + (Platform.OS === 'ios' ? 50 : 20),
                  position: 'absolute',
                }
              : {},
          ]}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={(index: number) => setCurrentIndex(index)}
        />
        {/* </Slider> */}
      </SliderWrapper>

      {slim && <SlimDescription>{getContent(carouselData[currentIndex].item)}</SlimDescription>}
    </Container>
  );
};

export default NewSlider;
