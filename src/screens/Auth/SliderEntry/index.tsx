/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles, { Subtitle, Title } from './styles';

export default class SliderEntry extends Component {
  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor="rgba(255, 255, 255, 1)"
        {...parallaxProps}
      />
    ) : (
      <Image source={illustration} style={styles.image} resizeMode="contain" />
    );
  }

  render() {
    const {
      data: { title, subtitle, titleWidth },
    } = this.props;

    const uppercaseTitle = title ? (
      <Title style={{ width: titleWidth }} numberOfLines={2}>
        {title}
      </Title>
    ) : (
      false
    );

    return (
      <>
        <View style={styles.imageContainer}>{this.image}</View>
        <View style={[styles.textContainer]}>
          {uppercaseTitle}
          <Subtitle numberOfLines={2}>{subtitle}</Subtitle>
        </View>
      </>
    );
  }
}
