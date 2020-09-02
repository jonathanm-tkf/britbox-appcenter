import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { TextInput, DefaultTheme, HelperText as HelperTextP } from 'react-native-paper';
import { CheckedIcon, WarningIcon } from '@assets/icons';

interface Input {
  error: boolean;
}

export const Input = styled(TextInput).attrs((props: ThemeState) => ({
  underlineColor: props.theme.PRIMARY_TEXT_COLOR_OPAQUE,
  theme: {
    ...DefaultTheme,
    colors: {
      primary: props.theme.PRIMARY_TEXT_COLOR_OPAQUE,
      background: props.theme.PRIMARY_COLOR_OPAQUE,
      text: props.theme.PRIMARY_TEXT_COLOR_OPAQUE,
      placeholder: props.theme.PRIMARY_TEXT_COLOR_OPAQUE,
      error: props.theme.ERROR_COLOR,
    },
  },
}))<Input & ThemeState>``;

export const Container = styled.View`
  margin-bottom: 30px;
  align-self: stretch;
`;

export const HelperText = styled(HelperTextP)`
  padding-left: 0;
  padding-right: 0;
`;

export const Checked = styled(CheckedIcon).attrs((props: ThemeState) => ({
  width: 27,
  height: 27,
  fill: props.theme.SUCCESS_COLOR,
}))`
  position: absolute;
  right: 20px;
  top: 17px;
`;

export const Warning = styled(WarningIcon).attrs((props: ThemeState) => ({
  width: 27,
  height: 27,
  fill: props.theme.ERROR_COLOR,
}))`
  position: absolute;
  right: 20px;
  top: 17px;
`;
