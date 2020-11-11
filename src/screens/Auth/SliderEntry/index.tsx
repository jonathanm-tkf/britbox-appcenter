/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles, { Subtitle, Title } from './styles';

export default class SliderEntry extends Component {
  get image() {
    const {
      data: { illustration },
    } = this.props;

    return <FastImage source={{ uri: illustration }} style={styles.image} resizeMode="contain" />;
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
