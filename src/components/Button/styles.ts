import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
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
      font-size: 18px;
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
      font-size: 18px;
    `
    );
  }};
`;
