import styled from 'styled-components/native';
import { isTablet } from 'react-native-device-info';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';
import { ButtonProps, ButtonTextProps } from './props';

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  border-radius: 10px;
  padding: 10px 20px;
  align-self: center;

  ${(props: ButtonProps & ThemeState) => {
    return props.opaque && `background-color: ${props.theme.PRIMARY_COLOR};`;
  }};
  ${(props: ButtonProps & ThemeState) => {
    return props.secondary && `background-color: ${props.theme.SECONDARY_COLOR_LIGHT};`;
  }};
  ${(props: ButtonProps & ThemeState) => {
    return (
      props.outline &&
      `
      background-color: transparent;
      border-width: 1px;
      border-color: ${props.theme.SECONDARY_COLOR};
    `
    );
  }};

  ${(props: ButtonProps & ThemeState) => {
    return (
      props.disabled &&
      `
      opacity: 0.7;
    `
    );
  }};

  ${(props: ButtonProps & ThemeState) => {
    return (
      props.link &&
      `
      background-color: transparent;
    `
    );
  }};

  ${(props: ButtonProps & ThemeState) => {
    return (
      props.stretch &&
      `
      align-self: stretch;
    `
    );
  }};

  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.size === 'big' &&
      `
      padding-top: 20px;
      padding-bottom: 20px;
    `
    );
  }};

  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.size === 'big' &&
      isTablet() &&
      `
        width: 300px;
        align-self: center;
      `
    );
  }}
`;

export const ButtonText = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.outline &&
      `
      color: ${props.theme.SECONDARY_COLOR};
    `
    );
  }};

  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.link &&
      `
      color: ${props.theme.PRIMARY_COLOR};
    `
    );
  }};

  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.color &&
      `
      color: ${props.color};
    `
    );
  }};
  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.stretch &&
      `
      text-align: center;
    `
    );
  }};
  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.size === 'big' &&
      `
      font-size: ${normalize(14, 18)}px;
    `
    );
  }};
  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.fontWeight === 'medium' &&
      `
      font-family: ${props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
    `
    );
  }};
  ${(props: ButtonTextProps & ThemeState) => {
    return (
      props.fontWeight === 'bold' &&
      `
      font-family: ${props.theme.PRIMARY_FONT_FAMILY_BOLD};
      font-size: ${normalize(14, 18)}px;
    `
    );
  }};
`;
