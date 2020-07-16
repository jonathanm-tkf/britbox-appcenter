import styled from 'styled-components/native';
import { Paragraph } from 'react-native-paper';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View``;

export const ParagraphComponent = styled(Paragraph)`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 16px;
`;
