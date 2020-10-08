/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '@components/Header';
import { isTablet } from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { navigate } from '@src/navigation/rootNavigation';
import { atiEventTracking } from '@store/modules/layout/actions';
import { getTextInConfigJSON } from '@src/utils/object';
import {
  Button,
  Pagination,
  HeaderWrapper,
  PaginationWrapper,
  PaginationContent,
  ScrollView,
  Paragraph,
} from './styles';
import SliderEntry from './SliderEntry';
import { sliderWidth, itemWidth } from './SliderEntry/styles';

const styles = StyleSheet.create({
  slider: {
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
});

const Auth = () => {
  const isFocused = useIsFocused();
  const [sliderRef, setSliderRef] = useState(null);
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);
  const { t } = useTranslation('auth');
  const dispatch = useDispatch();

  const images = isTablet()
    ? [
        getTextInConfigJSON(['paywall', '0', 'imageURL-tablet'], ''),
        getTextInConfigJSON(['paywall', '1', 'imageURL-tablet'], ''),
        getTextInConfigJSON(['paywall', '2', 'imageURL-tablet'], ''),
        getTextInConfigJSON(['paywall', '3', 'imageURL-tablet'], ''),
      ]
    : [
        getTextInConfigJSON(['paywall', '0', 'imageURL'], ''),
        getTextInConfigJSON(['paywall', '1', 'imageURL'], ''),
        getTextInConfigJSON(['paywall', '2', 'imageURL'], ''),
        getTextInConfigJSON(['paywall', '3', 'imageURL'], ''),
      ];

  const ENTRIES = [
    {
      title: getTextInConfigJSON(['paywall', '0', 'title'], t('slider1.title')),
      subtitle: getTextInConfigJSON(['paywall', '0', 'description'], t('slider1.description')),
      illustration: (images && images[0]) || '',
      titleWidth: '98%',
    },
    {
      title: getTextInConfigJSON(['paywall', '1', 'title'], t('slider2.title')),
      subtitle: getTextInConfigJSON(['paywall', '1', 'description'], t('slider2.description')),
      illustration: (images && images[1]) || '',
      titleWidth: '98%',
    },
    {
      title: getTextInConfigJSON(['paywall', '2', 'title'], t('slider3.title')),
      subtitle: getTextInConfigJSON(['paywall', '2', 'description'], t('slider3.description')),
      illustration: (images && images[2]) || '',
      titleWidth: '98%',
    },
    {
      title: getTextInConfigJSON(['paywall', '3', 'title'], t('slider4.title')),
      subtitle: getTextInConfigJSON(['paywall', '3', 'description'], t('slider4.description')),
      illustration: (images && images[3]) || '',
      titleWidth: '98%',
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

  const onPressSignIn = () => {
    dispatch(
      atiEventTracking('Submit', 'Sign-IN', {
        is_background: false,
        container: 'Application',
        result: '',
        metadata: '',
      })
    );
  };

  const navigateToSignUp = () => {
    dispatch(
      atiEventTracking('submit', 'bb_sub_flow', {
        is_background: false,
        container: 'Application',
        result: 'Free Trial',
        source: 'Britbox~App',
        metadata: '',
      })
    );
    navigate('SignUp');
  };

  return (
    <>
      <HeaderWrapper>
        <Header hideSignIn={!isFocused} isCenter onPressSignIn={() => onPressSignIn()} />
      </HeaderWrapper>
      <ScrollView>
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
        <Button size="big" fontWeight="medium" stretch onPress={() => navigateToSignUp()}>
          {getTextInConfigJSON(['paywall', '4', 'cta'], t('freetrial'))}
        </Button>
        <Paragraph>{getTextInConfigJSON(['pricing-marketing', 'pricing-message'], '')}</Paragraph>
      </ScrollView>
    </>
  );
};

export default Auth;
