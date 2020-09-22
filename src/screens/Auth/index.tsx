/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageCacheProvider, ImageCacheManager } from 'react-native-cached-image';
import Header from '@components/Header';
import { isTablet } from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel';
import { AppState } from '@store/modules/rootReducer';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { navigate } from '@src/navigation/rootNavigation';
import { atiEventTracking } from '@store/modules/layout/actions';
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
    // marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
});

const defaultImageCacheManager = ImageCacheManager();

const Auth = () => {
  // const theme = useSelector((state: AppState) => state.theme.theme);

  const isFocused = useIsFocused();
  const [sliderRef, setSliderRef] = useState(null);
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);
  const { t } = useTranslation('auth');
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment?.toLocaleLowerCase() || 'us';
  const dispatch = useDispatch();

  const images = isTablet()
    ? [
        britboxConfig && britboxConfig[country]?.paywall[0]['imageURL-tablet'],
        britboxConfig && britboxConfig[country]?.paywall[1]['imageURL-tablet'],
        britboxConfig && britboxConfig[country]?.paywall[2]['imageURL-tablet'],
        britboxConfig && britboxConfig[country]?.paywall[3]['imageURL-tablet'],
      ]
    : [
        britboxConfig && britboxConfig[country]?.paywall[0]?.imageURL,
        britboxConfig && britboxConfig[country]?.paywall[1]?.imageURL,
        britboxConfig && britboxConfig[country]?.paywall[2]?.imageURL,
        britboxConfig && britboxConfig[country]?.paywall[3]?.imageURL,
      ];

  useEffect(() => {
    images.forEach((element) => {
      if (element) defaultImageCacheManager.downloadAndCacheUrl(element);
    });
  }, []);

  const ENTRIES = [
    {
      title: (britboxConfig && britboxConfig[country]?.paywall[0]?.title) || t('slider1.title'),
      subtitle:
        (britboxConfig && britboxConfig[country]?.paywall[0]?.description) ||
        t('slider1.description'),
      illustration: (images && images[0]) || '',
      titleWidth: '98%',
    },
    {
      title: (britboxConfig && britboxConfig[country]?.paywall[1]?.title) || t('slider2.title'),
      subtitle:
        (britboxConfig && britboxConfig[country]?.paywall[1]?.description) ||
        t('slider2.description'),
      illustration: (images && images[1]) || '',
      titleWidth: '98%',
    },
    {
      title: (britboxConfig && britboxConfig[country]?.paywall[2]?.title) || t('slider3.title'),
      subtitle:
        (britboxConfig && britboxConfig[country]?.paywall[2]?.description) ||
        t('slider3.description'),
      illustration: (images && images[2]) || '',
      titleWidth: '98%',
    },
    {
      title: (britboxConfig && britboxConfig[country]?.paywall[3]?.title) || t('slider4.title'),
      subtitle:
        (britboxConfig && britboxConfig[country]?.paywall[3]?.description) ||
        t('slider4.description'),
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

  return (
    <>
      <HeaderWrapper>
        <Header hideSignIn={!isFocused} isCenter onPressSignIn={() => onPressSignIn()} />
      </HeaderWrapper>
      <ScrollView>
        <ImageCacheProvider urlsToPreload={images}>
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
        </ImageCacheProvider>
        <PaginationWrapper>
          <PaginationContent />
          <Pagination
            dotsLength={ENTRIES.length}
            activeDotIndex={slider1ActiveSlide}
            carouselRef={sliderRef || undefined}
            tappableDots={!!sliderRef}
          />
        </PaginationWrapper>
        <Button size="big" fontWeight="medium" stretch onPress={() => navigate('SignUp')}>
          {t('freetrial')}
        </Button>
        <Paragraph>
          {(britboxConfig && britboxConfig[country]?.login['description-2']) || ''}
        </Paragraph>
      </ScrollView>
    </>
  );
};

export default Auth;
