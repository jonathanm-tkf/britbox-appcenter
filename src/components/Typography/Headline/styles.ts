import styled from 'styled-components/native';
import { Headline } from 'react-native-paper';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View``;

interface HeadlineComponentProps {
  fontSize?: number;
  lineHeight?: number;
  center?: boolean;
  color?: string;
}

export const HeadlineComponent = styled(Headline)`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(16, 20)}px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  line-height: ${normalize(32, 38)}px;

  ${(props: HeadlineComponentProps & ThemeState) => {
    return (
      props.fontSize &&
      `
      font-size: ${normalize(props.fontSize)}px;
    `
    );
  }};

  ${(props: HeadlineComponentProps & ThemeState) => {
    return (
      props.lineHeight &&
      `
      line-height: ${normalize(props.lineHeight)}px;
    `
    );
  }};

  ${(props: HeadlineComponentProps & ThemeState) => {
    return (
      props.color &&
      `
      color: ${props.color};
    `
    );
  }};

  ${(props: HeadlineComponentProps & ThemeState) => {
    return (
      props.center &&
      `
      text-align: center;
    `
    );
  }};
`;
