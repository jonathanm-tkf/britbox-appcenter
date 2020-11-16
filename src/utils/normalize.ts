import { PixelRatio, Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';

const ratio = PixelRatio.get();

export const normalize = (sizeMobile: number, sizeTablet?: number) => {
  const size = isTablet() ? sizeTablet || sizeMobile : sizeMobile;
  const { width: originalWidth, height: originalHeight } = Dimensions.get('window');

  let height = originalHeight;
  let width = originalWidth;

  if (originalWidth > originalHeight) {
    height = originalWidth;
    width = originalHeight;
  }

  if (ratio >= 2 && ratio < 3) {
    if (width < 360) {
      return size * 0.95;
    }
    if (height < 667) {
      return size;
    }
    if (height >= 667 && height <= 735) {
      return size * 1.15;
    }

    return size * 1.25;
  }
  if (ratio >= 3 && ratio < 3.5) {
    if (width < 360) {
      return size;
    }
    if (height < 667) {
      return size * 1.15;
    }
    if (height >= 667 && height <= 735) {
      return size * 1.2;
    }

    return size * 1.27;
  }
  if (ratio >= 3.5) {
    if (width < 360) {
      return size;
    }
    if (height < 667) {
      return size * 1.2;
    }
    if (height >= 667 && height <= 735) {
      return size * 1.25;
    }

    return size * 1.4;
  }

  return size;
};
