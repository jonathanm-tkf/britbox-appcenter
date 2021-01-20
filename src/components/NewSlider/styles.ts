import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Animated, ImageBackground, Platform } from 'react-native';
import { Button as ButtonC } from '@components/Button';
import { getDimensions, hp } from '@src/utils/dimension';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { normalize } from '@src/utils/normalize';
import { isTablet } from '@src/utils/tablet';

const { width } = getDimensions();

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

type CarouselProps = {
  slim: boolean;
  collection: boolean;
  width?: number;
};

export const SliderWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
  ${(props: CarouselProps) => `width: ${props.width !== undefined ? props.width : width}px;`}
  ${(props: CarouselProps) => {
    return (
      props.collection &&
      `
      padding-top: ${(Platform.OS === 'ios' ? getStatusBarHeight() : 0) + (isTablet() ? 40 : 60)}px;
      margin-bottom: 0px;
    `
    );
  }};
  ${(props: CarouselProps) => {
    return (
      props.slim &&
      `
      margin-top: 0;
      margin-bottom: ${getStatusBarHeight() + 60}px;
    `
    );
  }};
`;

export const Slider = styled(AnimatedImage).attrs({
  resizeMode: 'cover',
  blurRadius: 10,
})`
  align-items: center;
  justify-content: center;
  opacity: 0.3;
  ${(props: CarouselProps) => `width: ${props.width !== undefined ? props.width : width}px;`}
  ${(props: CarouselProps) => {
    return (
      props.slim &&
      `
      height: ${width - hp(isTablet() ? 225 : 120)}px;
    `
    );
  }};
`;

type SlimDescriptionTextProps = {
  collection?: boolean;
};

export const SlimDescriptionText = styled.Text.attrs({
  numberOfLines: 4,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
  text-align: center;
  min-height: 90px;
  font-size: ${normalize(12, 16)}px;
  line-height: ${normalize(18, 20)}px;
  ${(props: SlimDescriptionTextProps & ThemeState) => {
    return (
      props.collection &&
      `
      margin-bottom: 30px;
    `
    );
  }};
`;

type SlimDescriptionProps = {
  collection?: boolean;
  space?: string | undefined;
};

export const SlimDescription = styled.View`
  height: 100px;
  padding-left: 40px;
  padding-right: 40px;

  ${(props: SlimDescriptionProps) => {
    return (
      props.collection &&
      `
      height: auto;
      margin-top: 30px;
    `
    );
  }};

  ${(props: SlimDescriptionProps) => {
    return (
      props.space === undefined &&
      `
      height: 0px;
    `
    );
  }};
`;

export const ActionsWrapper = styled.View`
  height: ${isTablet() ? 230 : 150}px;
  margin-bottom: 20px;
`;

export const Button = styled(ButtonC)`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`;
