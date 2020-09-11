import React from 'react';

import { ActivityIndicator } from 'react-native';
import { Button as ButtonStyle, ButtonText } from './styles';
import { ButtonProps } from './props';

export const Button = ({
  onPress,
  secondary,
  children,
  outline,
  opaque,
  link,
  color,
  stretch,
  size,
  loading,
  style,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonStyle
      disabled={disabled || loading}
      onPress={() => onPress()}
      {...{ outline, opaque, link, stretch, size, style, secondary }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size={22} color={color} />
      ) : (
        <ButtonText {...{ outline, opaque, link, color, stretch, size, ...rest }}>
          {children}
        </ButtonText>
      )}
    </ButtonStyle>
  );
};
