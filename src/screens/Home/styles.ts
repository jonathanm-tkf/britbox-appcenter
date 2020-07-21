import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding-bottom: 40px;
`;

export const Footer = styled.View`
  height: ${Platform.OS === 'ios' ? 30 : 0}px;
`;
