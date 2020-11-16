import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';
import { getDimensions } from '@src/utils/dimension';

const { width: viewportWidth } = getDimensions();

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
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
});

export const Title = styled.Text`
  margin-top: 15px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${normalize(22, 32)}px;
  text-align: center;
`;
export const Subtitle = styled.Text`
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 6px;
  margin-bottom: 6px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${normalize(10, 16)}px;
`;
