/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import CustomCard from './CustomCard';
import { sliderWidth, itemWidth, sliderWidthSlim, itemWidthSlim } from './CustomCard/styles';
import { Container, Slider, SlimDescriptionText } from './styles';
import Actions from './Actions';

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
}

const NewSlider = ({ data, slim }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = data.map((item) => {
    return {
      title: item.title,
      illustration: getImage(item.images?.hero3x1, 'wallpaper'),
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

  const getContent = (item: MassiveSDKModelItemList) => {
    return null;
  };

  return (
    <Container>
      <Slider>
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
          containerCustomStyle={styles.sliderContainer}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={(index: number) => setCurrentIndex(index)}
        />
      </Slider>

      {slim && (
        <>
          {getContent(carouselData[currentIndex].item)}
          {/* <SlimDescriptionText>
            {carouselData[currentIndex].item.shortDescription}
          </SlimDescriptionText>
          <Actions data={carouselData[currentIndex].item} /> */}
        </>
      )}
    </Container>
  );
};

export default NewSlider;
