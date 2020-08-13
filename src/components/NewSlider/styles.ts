import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Animated, ImageBackground, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

type CarouselProps = {
  slim: boolean;
};

export const SliderWrapper = styled.View`
  width: ${width}px;
  margin-bottom: 23px;
  ${(props: CarouselProps) => {
    return (
      props.slim &&
      `
      min-height: 300px;
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
  margin-bottom: 10px;
  opacity: 0.3;
  ${(props: CarouselProps) => {
    return props.slim ? (Platform.OS === 'ios' ? `min-height: 300px;` : `min-height: 270px;`) : ``;
  }};
`;

export const SlimDescriptionText = styled.Text.attrs({
  numberOfLines: 4,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
  text-align: center;
  min-height: 90px;
  font-size: 14px;
  line-height: 22px;
`;

export const SlimDescription = styled.View`
  height: 220px;
  margin-bottom: 20px;
`;
