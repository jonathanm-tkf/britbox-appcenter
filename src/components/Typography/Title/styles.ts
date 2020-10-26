import styled from 'styled-components/native';
import { Title } from 'react-native-paper';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View``;

interface TitleComponentProps {
  fontSize?: number;
  lineHeight?: number;
}

export const TitleComponent = styled(Title)`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(26)}px;
  font-weight: 700;

  ${(props: TitleComponentProps & ThemeState) => {
    return (
      props.fontSize &&
      `
      font-size: ${normalize(props.fontSize)}px;
    `
    );
  }};

  ${(props: TitleComponentProps & ThemeState) => {
    return (
      props.lineHeight &&
      `
      line-height: ${normalize(props.lineHeight)}px;
    `
    );
  }};
`;
