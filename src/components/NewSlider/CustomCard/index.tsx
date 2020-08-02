import React from 'react';
import { View, Image, Text } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import { Logo } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import styles, { Gradient, LogoWrapper, TouchableScale } from './styles';

interface Props {
  even: boolean;
  parallax: boolean;
  parallaxProps: any;
  data: any;
}

const CustomCard = ({
  even,
  parallax,
  parallaxProps,
  data: { illustration, title, subtitle, item },
}: Props) => {
  const navigation = useNavigation();
  const goToDetail = (card: MassiveSDKModelItemList) => {
    navigation.push('Detail', { item: { ...card } });
  };

  const getImage = () => {
    return illustration === 'no-image' ? (
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
    ) : parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  };

  const getTitle = title ? (
    <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>
      {title}
    </Text>
  ) : (
    false
  );

  return (
    <View style={styles.outerContainer}>
      <TouchableScale
        activeScale={0.9}
        tension={50}
        friction={8}
        style={styles.slideInnerContainer}
        onPress={() => goToDetail(item)}
      >
        <View style={styles.customShadow}>
          <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
            {getImage()}
            <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
          </View>
          <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
            {getTitle}
            <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={2}>
              {subtitle}
            </Text>
          </View>
          <Gradient />
        </View>
      </TouchableScale>
    </View>
  );
};

export default CustomCard;
