import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const HeaderBackgroundImage = styled.View`
  height: 300px;
  flex: 1;
`;

export const ImageTop = styled.Image.attrs({
  resizeMode: 'cover',
  blurRadius: 5,
})`
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})`
  flex: 1;
`;
