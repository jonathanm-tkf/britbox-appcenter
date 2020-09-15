import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Animated, ImageBackground, Dimensions, Platform } from 'react-native';
import { Button as ButtonC } from '@components/Button';
import { hp } from '@src/utils/dimension';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

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
  ${(props: CarouselProps) => {
    return (
      props.collection &&
      `
      min-height: 280px;
    `
    );
  }};
  ${(props: CarouselProps) => {
    return (
      props.slim &&
      `
      min-height: 280px;
      margin-bottom: 50px;
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
  margin-top: 10px;
  ${(props: CarouselProps) => {
    return props.slim || props.collection
      ? Platform.OS === 'ios'
        ? `min-height: ${hp(230)}px;`
        : `min-height: 270px;`
      : ``;
  }};
  ${(props: CarouselProps) => {
    return (props.slim || props.collection) && `margin-bottom: ${getStatusBarHeight() + 20}px;`;
  }};
`;

type SlimDescriptionText = {
  collection?: boolean;
};

export const SlimDescriptionText = styled.Text.attrs({
  numberOfLines: 4,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
  text-align: center;
  min-height: 90px;
  font-size: 16px;
  line-height: 22px;

  ${(props: SlimDescriptionText & ThemeState) => {
    return (
      props.collection &&
      `
      min-height: auto;
      margin-bottom: 30px;
    `
    );
  }};
`;

type SlimDescription = {
  collection?: boolean;
  space?: string | undefined;
};

export const SlimDescription = styled.View`
  height: 100px;
  padding-left: 40px;
  padding-right: 40px;

  ${(props: SlimDescription) => {
    return (
      props.collection &&
      `
      height: auto;
      margin-top: 30px;
    `
    );
  }};

  ${(props: SlimDescription) => {
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
