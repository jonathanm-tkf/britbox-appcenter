import { StyleSheet, Dimensions, Platform } from 'react-native';
import { lightTheme } from '@store/modules/theme/theme';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import { ThemeState } from '@store/modules/theme/types';
import TouchableScaleC from 'react-native-touchable-scale';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';
import { normalize } from '@src/utils/normalize';
import { isTablet } from 'react-native-device-info';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth } = Dimensions.get('window');

const wp = (percentage: number) => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};

// Normal
const slideHeight = isTablet() ? vw(33) : vw(52);
const slideWidth = isTablet() ? vw(55) : wp(85);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

// Slim
const slideHeightSlim = isTablet() ? 450 : 274;
const slideWidthSlim = isTablet() ? 300 : 171;
const itemHorizontalMarginSlim = isTablet() ? 7 : 7;

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

type TouchableScaleProps = {
  slim: boolean;
};

export const TouchableScale = styled(TouchableScaleC)`
  width: ${(props: TouchableScaleProps) => (props.slim ? itemWidthSlim : itemWidth)}px;
  height: ${(props: TouchableScaleProps) => (props.slim ? slideHeightSlim : slideHeight)}px;
  padding-left: ${(props: TouchableScaleProps) =>
    props.slim ? itemHorizontalMarginSlim : itemHorizontalMargin}px;
  padding-right: ${(props: TouchableScaleProps) =>
    props.slim ? itemHorizontalMarginSlim : itemHorizontalMargin}px;
  padding-bottom: 18px;
`;

export const ImageContainer = styled.View`
  flex: 1;
  margin-bottom: ${IS_IOS ? 0 : -1}px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  border-radius: ${entryBorderRadius}px;
  overflow: hidden;
`;

type TitleProps = {
  collection?: boolean;
};

export const Title = styled.Text`
  font-size: ${normalize(16, 18)}px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  ${(props: TitleProps & ThemeState) => {
    return props.collection && `font-size: ${normalize(14, 18)}px;`;
  }};
`;

export const Subtitle = styled.Text`
  margin-top: 6px;
  font-size: ${normalize(12, 14)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

type TextContainerProps = {
  slim?: boolean;
  center?: boolean;
};

export const TextContainer = styled.View<TextContainerProps>`
  position: ${(props: TextContainerProps) => (props.slim ? 'relative' : 'absolute')};
  bottom: 0;
  justify-content: center;
  width: 100%;
  padding: ${20 - entryBorderRadius}px 16px 0px;
  border-bottom-left-radius: ${entryBorderRadius}px;
  border-bottom-right-radius: ${entryBorderRadius}px;
  z-index: 2;
  ${(props: TextContainerProps) => {
    return props.center && `align-items: center;`;
  }};
`;
