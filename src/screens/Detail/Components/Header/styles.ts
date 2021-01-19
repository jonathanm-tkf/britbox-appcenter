import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

type ContainerProps = {
  paddingBottom: number;
};

export const Container = styled.View<ContainerProps>`
  padding-bottom: ${(props: ContainerProps) => `${props.paddingBottom}px`};
`;

interface HeaderBackgroundImageProps extends ThemeState {
  width: number;
  height: number;
}

export const HeaderBackgroundImage = styled.View<HeaderBackgroundImageProps>`
  ${(props: HeaderBackgroundImageProps) => `
    width: ${props.width}px;
    height: ${props.height}px;
  `}
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
`;

type ImageTopProps = {
  width: number;
  height: number;
};

export const ImageTop = styled.Image.attrs({
  resizeMode: 'cover',
  blurRadius: 10,
})<ImageTopProps>`
  ${(props: ImageTopProps) => `
    width: ${props.width}px;
    height: ${props.height}px;
  `}
`;
