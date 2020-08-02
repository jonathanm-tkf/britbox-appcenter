import styled from 'styled-components/native';
import { Headline } from 'react-native-paper';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View``;

interface HeadlineComponentProps {
  fontSize?: number;
  lineHeight?: number;
}

export const HeadlineComponent = styled(Headline)`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 20px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  line-height: 38px;

  ${(props: HeadlineComponentProps & ThemeState) => {
    return (
      props.fontSize &&
      `
      font-size: ${props.fontSize}px;
    `
    );
  }};

  ${(props: HeadlineComponentProps & ThemeState) => {
    return (
      props.lineHeight &&
      `
      line-height: ${props.lineHeight}px;
    `
    );
  }};
  /* margin-bottom: 12px; */
`;
