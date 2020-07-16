import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(95);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default StyleSheet.create({
  slideInnerContainer: {},
  image: {
    alignSelf: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    minHeight: 350,
    justifyContent: 'center',
  },
});

export const Title = styled.Text`
  margin-top: 6px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: 30px;
  text-align: center;
`;
export const Subtitle = styled.Text`
  margin-top: 6px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: 14px;
`;
