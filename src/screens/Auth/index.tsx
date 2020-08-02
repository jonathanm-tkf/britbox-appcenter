/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import Header from '@components/Header';
import Orientation from 'react-native-orientation-locker';
import { ThemeProps } from '@store/modules/theme/types';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import {
  Container,
  Button,
  Pagination,
  Content,
  HeaderWrapper,
  PaginationWrapper,
  PaginationContent,
  ScrollView,
} from './styles';
import SliderEntry from './SliderEntry';
import { sliderWidth, itemWidth } from './SliderEntry/styles';

import WellcomeImage from '../../../assets/images/WelcomeApp.png';
import AllDevice from '../../../assets/images/AllDevice.png';
import CancelAnyTime from '../../../assets/images/CancelAnyTime.png';
import MoreWatching from '../../../assets/images/MoreWatching.png';

interface Props {
  screenProps: {
    theme: ThemeProps;
  };
}

const styles = StyleSheet.create({
  slider: {
    // marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
});

const Auth = () => {
  // const theme = useSelector((state: AppState) => state.theme.theme);

  const isFocused = useIsFocused();
  const [sliderRef, setSliderRef] = useState(null);
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);
  const { t } = useTranslation('auth');

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const ENTRIES = [
    {
      title: t('slider1.title'),
      subtitle: t('slider1.description'),
      illustration: WellcomeImage,
      titleWidth: '100%',
    },
    {
      title: t('slider2.title'),
      subtitle: t('slider2.description'),
      illustration: AllDevice,
      titleWidth: '60%',
    },
    {
      title: t('slider3.title'),
      subtitle: t('slider3.description'),
      illustration: CancelAnyTime,
      titleWidth: '100%',
    },
    {
      title: t('slider4.title'),
      subtitle: t('slider4.description'),
      illustration: MoreWatching,
      titleWidth: '100%',
    },
  ];

  const renderItemWithParallax = ({ item, index }: any, parallaxProps: any) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        parallaxProps={parallaxProps}
      />
    );
  };

  return (
    <>
      <HeaderWrapper>
        <Header hideSignIn={!isFocused} />
      </HeaderWrapper>
      <ScrollView>
        <Container>
          <Content>
            <Carousel
              ref={(c: any) => setSliderRef(c)}
              data={ENTRIES}
              renderItem={renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages
              firstItem={0}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={false}
              loopClonesPerSide={2}
              autoplay={false}
              onSnapToItem={(index: number) => setSlider1ActiveSlide(index)}
            />
            <PaginationWrapper>
              <PaginationContent />
              <Pagination
                dotsLength={ENTRIES.length}
                activeDotIndex={slider1ActiveSlide}
                carouselRef={sliderRef || undefined}
                tappableDots={!!sliderRef}
              />
            </PaginationWrapper>

            <Button size="big" stretch onPress={() => {}}>
              {t('freetrial')}
            </Button>
          </Content>
        </Container>
      </ScrollView>
    </>
  );
};

export default Auth;
