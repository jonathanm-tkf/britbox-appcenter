import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

interface Bold {
  bold?: boolean;
}

export const Container = styled.View`
  border-width: 1px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  border-radius: 5px;
  padding: 0 8px;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  height: 17px;

  ${(props: Bold & ThemeState) => {
    return props.bold && `background-color: ${props.theme.PRIMARY_FOREGROUND_COLOR};`;
  }};
`;

export const Text = styled.Text`
  font-size: 7px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  text-transform: uppercase;

  ${(props: Bold & ThemeState) => {
    return props.bold && `color: ${props.theme.PRIMARY_COLOR};`;
  }};
`;
