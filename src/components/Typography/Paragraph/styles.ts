import styled from 'styled-components/native';
import { Paragraph } from 'react-native-paper';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View``;

interface ParagraphComponentProps {
  fontSize?: number;
  lineHeight?: number;
  color?: string;
}

export const ParagraphComponent = styled(Paragraph)`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(16)}px;
  ${(props: ParagraphComponentProps & ThemeState) => {
    return (
      props.fontSize &&
      `
      font-size: ${normalize(props.fontSize)}px;
    `
    );
  }};

  ${(props: ParagraphComponentProps & ThemeState) => {
    return (
      props.lineHeight &&
      `
      line-height: ${normalize(props.lineHeight)}px;
    `
    );
  }};

  ${(props: ParagraphComponentProps & ThemeState) => {
    return (
      props.color &&
      `
      color: ${props.color};
    `
    );
  }};
`;
