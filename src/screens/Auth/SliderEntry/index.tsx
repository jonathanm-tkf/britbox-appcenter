/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import styles, { Subtitle, Title } from './styles';

export default class SliderEntry extends Component {
  get image() {
    const {
      data: { illustration },
    } = this.props;

    return (
      <CachedImage
        source={{ uri: illustration }}
        style={styles.image}
        loadingIndicator={() => <ActivityIndicator size="large" color="rgba(255, 255, 255, 1)" />}
        resizeMode="contain"
      />
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
