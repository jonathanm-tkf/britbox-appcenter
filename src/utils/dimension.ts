import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 360, 760 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const wp = (dimension: number): number => {
  return wp2dp(`${(dimension / 360) * 100}%`);
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * * 360, 760 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const hp = (dimension: number): number => {
  return hp2dp(`${(dimension / 760) * 100}%`);
};

export const getDimensions = () => {
  const { width: originalWidth, height: originalHeight } = Dimensions.get('window');
  const width = originalWidth;
  const height = originalHeight;

  // if (width > height) {
  //   width = originalHeight;
  //   height = originalWidth;
  // }

  return {
    width,
    height,
  };
};

export const percentageWidth = (percentage: number) => {
  const { width } = getDimensions();
  const value = (percentage / 100) * width;
  return Math.round(value);
};

export const percentageHeight = (percentage: number) => {
  const { height } = getDimensions();
  const value = (percentage / 100) * height;
  return Math.round(value);
};
