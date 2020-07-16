import React from 'react';
import { View, StatusBar } from 'react-native';
import Stories from '../../../storybook';

const wrapper = {
  flex: 1,
  backgroundColor: '#FFF',
};

export default () => {
  return (
    <View style={wrapper}>
      <StatusBar backgroundColor="#000" barStyle="dark-content" />
      <Stories />
    </View>
  );
};
