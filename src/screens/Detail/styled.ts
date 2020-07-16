import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View`
  flex: 1;
  position: absolute;
  z-index: 4;
  height: 100%;
  width: 100%;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;
