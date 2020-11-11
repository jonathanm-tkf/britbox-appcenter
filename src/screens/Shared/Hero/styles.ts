import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View`
  margin-top: 75px;
  margin-bottom: 30px;
  overflow: hidden;
  flex-direction: row;
`;

export const Gradient = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  z-index: 1;
`;

export const GradientTop = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [props.theme.PRIMARY_COLOR, rgba(props.theme.PRIMARY_COLOR, 0)],
}))`
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const Overlap = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
