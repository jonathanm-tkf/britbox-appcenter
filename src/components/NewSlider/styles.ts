import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Animated, ImageBackground, Dimensions } from 'react-native';
import { Button as ButtonC } from '@components/Button';
import { hp } from '@src/utils/dimension';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { normalize } from '@src/utils/normalize';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

type CarouselProps = {
  slim: boolean;
  collection: boolean;
};

export const SliderWrapper = styled.View`
  width: ${width}px;
  margin-top: 10px;
  margin-bottom: 20px;
  ${(props: CarouselProps) => {
    return (
      props.collection &&
      `
      padding-top: ${getStatusBarHeight() + 40}px;
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
  width: ${width}px;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
  ${(props: CarouselProps) => {
    return (
      props.slim &&
      `
      height: ${width - hp(120)}px;
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
  font-size: ${normalize(16)}px;
  line-height: ${normalize(22)}px;

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
  height: 120px;
  margin-bottom: 20px;
`;

export const Button = styled(ButtonC)`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`;
