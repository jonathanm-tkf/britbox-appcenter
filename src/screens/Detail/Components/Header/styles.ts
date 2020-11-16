import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getDimensions } from '@src/utils/dimension';

const { width } = getDimensions();

export const Container = styled.View``;

export const HeaderBackgroundImage = styled.View`
  height: 300px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
`;

export const ImageTop = styled.Image.attrs({
  resizeMode: 'cover',
  blurRadius: 10,
})`
  width: ${width}px;
  height: 300px;
`;
