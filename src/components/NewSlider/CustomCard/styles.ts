import { StyleSheet, Dimensions, Platform } from 'react-native';
import { lightTheme } from '@store/modules/theme/theme';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import { ThemeState } from '@store/modules/theme/types';
import TouchableScaleC from 'react-native-touchable-scale';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth } = Dimensions.get('window');

const wp = (percentage: number) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

// Normal
const slideHeight = 225;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

// Slim
const slideHeightSlim = 275;
const slideWidthSlim = 185;
const itemHorizontalMarginSlim = 7;

export const sliderWidthSlim = viewportWidth;
export const itemWidthSlim = slideWidthSlim + itemHorizontalMarginSlim * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: lightTheme.PRIMARY_COLOR_OPAQUE,
    borderRadius: entryBorderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: entryBorderRadius,
  },
});

export const RadiusMask = styled.View`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: ${entryBorderRadius}px;
`;

export const Gradient = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: -2px;
  z-index: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const LogoWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const OuterContainer = styled.View``;

export const CustomShadow = styled.View`
  flex: 1;
  shadow-color: black;
  shadow-offset: 0px 15px;
  shadow-opacity: 0.8;
  shadow-radius: 15px;
  elevation: 3;
  border-radius: 8px;
`;

type TouchableScale = {
  slim: boolean;
};

export const TouchableScale = styled(TouchableScaleC)`
  width: ${(props: TouchableScale) => (props.slim ? itemWidthSlim : itemWidth)}px;
  height: ${(props: TouchableScale) => (props.slim ? slideHeightSlim : slideHeight)}px;
  padding-left: ${(props: TouchableScale) =>
    props.slim ? itemHorizontalMarginSlim : itemHorizontalMargin}px;
  padding-right: ${(props: TouchableScale) =>
    props.slim ? itemHorizontalMarginSlim : itemHorizontalMargin}px;
  padding-bottom: 18px;

  ${(props: TouchableScale) => {
    return (
      props.slim &&
      `
      height: 275px;
    `
    );
  }};
`;

export const ImageContainer = styled.View`
  flex: 1;
  margin-bottom: ${IS_IOS ? 0 : -1}px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  border-radius: ${entryBorderRadius}px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const Subtitle = styled.Text`
  margin-top: 6px;
  font-size: 12px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

type TextContainer = {
  slim?: boolean;
};

export const TextContainer = styled.View<TextContainer>`
  position: ${(props: TextContainer) => (props.slim ? 'relative' : 'absolute')};
  bottom: 0;
  justify-content: center;
  width: 100%;
  padding: ${20 - entryBorderRadius}px 16px 0px;
  border-bottom-left-radius: ${entryBorderRadius}px;
  border-bottom-right-radius: ${entryBorderRadius}px;
  z-index: 2;
`;
