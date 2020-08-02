import React from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import CustomCard from './CustomCard';
import { sliderWidth, itemWidth } from './CustomCard/styles';
import { Container, Slider } from './styles';

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
}

const NewSlider = ({ data }: Props) => {
  const carouselData = data.map((item) => {
    return {
      title: item.title,
      illustration: getImage(item.images?.hero3x1, 'wallpaper'),
    };
  });

  const renderItem = ({ item, index }: any, parallaxProps: any) => (
    <CustomCard data={item} even={(index + 1) % 2 === 0} parallax parallaxProps={parallaxProps} />
  );

  return (
    <Container>
      <Slider>
        <Carousel
          data={carouselData}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          loop
          loopClonesPerSide={2}
          autoplay={false}
          firstItem={0}
          inactiveSlideScale={0.92}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.sliderContainer}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
      </Slider>
    </Container>
  );
};

export default NewSlider;
