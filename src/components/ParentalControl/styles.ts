import { normalize } from '@src/utils/normalize';
import { ThemeState } from '@store/modules/theme/types';
import { rgba } from 'polished';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const WrapperPin = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export const ParagraphChecking = styled.Text`
  color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_TEXT_COLOR, 0.6)};
  font-size: ${normalize(10, 14)}px;
  margin-top: 20px;
`;

export const ParagraphError = styled.Text`
  color: ${(props: ThemeState) => props.theme.ERROR_COLOR};
  font-size: ${normalize(10, 14)}px;
  margin-top: 20px;
`;
