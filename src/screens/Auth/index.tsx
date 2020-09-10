import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '@components/Header';
import { ThemeProps } from '@store/modules/theme/types';
import Carousel from 'react-native-snap-carousel';
import { AppState } from '@store/modules/rootReducer';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { navigate } from '@src/navigation/rootNavigation';
import {
  Container,
  Button,
  Pagination,
  Content,
  HeaderWrapper,
  PaginationWrapper,
  PaginationContent,
  ScrollView,
  Paragraph,
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
  const britboxConfig = useSelector((state: AppState) => state.core.britboxConfig);
  const segment = useSelector((state: AppState) => state.core.segment);
  const country: string = segment?.toLocaleLowerCase() || 'us';

  useEffect(() => {
    // Orientation.lockToPortrait();
  }, []);

  const ENTRIES = [
    {
      title: (britboxConfig && britboxConfig[country]?.paywall[0]?.title) || t('slider1.title'),
      subtitle:
        (britboxConfig && britboxConfig[country]?.paywall[0]?.description) ||
        t('slider1.description'),
      illustration: WellcomeImage,
      titleWidth: '98%',
    },
    {
      title: (britboxConfig && britboxConfig[country]?.paywall[1]?.title) || t('slider2.title'),
      subtitle:
        (britboxConfig && britboxConfig[country]?.paywall[1]?.description) ||
        t('slider2.description'),
      illustration: AllDevice,
      titleWidth: '98%',
    },
    {
      title: (britboxConfig && britboxConfig[country]?.paywall[2]?.title) || t('slider3.title'),
      subtitle:
        (britboxConfig && britboxConfig[country]?.paywall[2]?.description) ||
        t('slider3.description'),
      illustration: CancelAnyTime,
      titleWidth: '98%',
    },
    {
      title: (britboxConfig && britboxConfig[country]?.paywall[3]?.title) || t('slider4.title'),
      subtitle:
        (britboxConfig && britboxConfig[country]?.paywall[3]?.description) ||
        t('slider4.description'),
      illustration: MoreWatching,
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

            <Button size="big" fontWeight="medium" stretch onPress={() => navigate('SignUp')}>
              {t('freetrial')}
            </Button>
            <Paragraph>
              {(britboxConfig && britboxConfig[country]?.login['description-2']) || ''}
            </Paragraph>
          </Content>
        </Container>
      </ScrollView>
    </>
  );
};

export default Auth;
