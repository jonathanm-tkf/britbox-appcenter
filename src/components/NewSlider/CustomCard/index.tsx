import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './styles';

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
  data: { illustration, title, subtitle },
}: Props) => {
  const getImage = () => {
    return parallax ? (
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
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${title}'`);
        }}
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomCard;
