import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width } = Dimensions.get('window');

const scale = width / 375;

export const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};
