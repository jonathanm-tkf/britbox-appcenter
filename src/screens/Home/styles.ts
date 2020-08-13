import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding-bottom: ${getBottomSpace() + 74}px;
  /* padding-bottom: 40px; */
`;
