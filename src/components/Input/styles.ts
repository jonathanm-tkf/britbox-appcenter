import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { TextInput, DefaultTheme, HelperText as HelperTextP } from 'react-native-paper';
import { CheckedIcon, WarningIcon } from '@assets/icons';
import { normalize } from '@src/utils/normalize';
import PasswordInputText from 'react-native-hide-show-password-input';

interface InputProps {
  error: boolean;
}

export const PasswordInputTextStyle = styled(PasswordInputText).attrs(
  (props: InputProps & ThemeState) => ({
    tintColor: props.error ? props.theme.ERROR_COLOR : props.theme.PRIMARY_FOREGROUND_COLOR,
    baseColor: props.theme.PRIMARY_TEXT_COLOR_OPAQUE,
    errorColor: props.theme.ERROR_COLOR,
    textColor: props.theme.PRIMARY_TEXT_COLOR_OPAQUE,
    iconColor: props.error ? props.theme.ERROR_COLOR : props.theme.PRIMARY_TEXT_COLOR_OPAQUE,
    fontSize: normalize(11, 13),
    iconSize: 25,
    lineWidth: 1,
    contentInset: {
      left: 15,
    },
    inputContainerStyle: {
      backgroundColor: props.theme.PRIMARY_COLOR_OPAQUE,
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      paddingRight: 60,
    },
    labelOffset: {
      y0: -10,
      y1: -5,
    },
    iconStyle: {
      top: 20,
      right: 20,
    },
    titleTextStyle: {
      marginLeft: -15,
      fontFamily: props.theme.PRIMARY_FONT_FAMILY,
    },
    labelTextStyle: {
      fontFamily: props.theme.PRIMARY_FONT_FAMILY,
    },
  })
)<InputProps & ThemeState>`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
`;

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
}))<InputProps & ThemeState>`
  padding-right: 40px;
  font-size: ${normalize(12, 14)}px;
`;

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
