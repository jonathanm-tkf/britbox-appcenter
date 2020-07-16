import React from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
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
  data: any;
}

const NewSlider = ({ data }: Props) => {
  const renderItem = ({ item, index }: any, parallaxProps: any) => (
    <CustomCard data={item} even={(index + 1) % 2 === 0} parallax parallaxProps={parallaxProps} />
  );

  return (
    <Container>
      <Slider>
        <Carousel
          data={data}
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
