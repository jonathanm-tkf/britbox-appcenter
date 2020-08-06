import styled from 'styled-components/native';
import { Title } from 'react-native-paper';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View``;

interface TitleComponentProps {
  fontSize?: number;
  lineHeight?: number;
}

export const TitleComponent = styled(Title)`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 26px;
  font-weight: 700;

  ${(props: TitleComponentProps & ThemeState) => {
    return (
      props.fontSize &&
      `
      font-size: ${props.fontSize}px;
    `
    );
  }};

  ${(props: TitleComponentProps & ThemeState) => {
    return (
      props.lineHeight &&
      `
      line-height: ${props.lineHeight}px;
    `
    );
  }};
`;
