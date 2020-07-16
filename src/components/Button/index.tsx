import React from 'react';

import { ActivityIndicator } from 'react-native';
import { Button as ButtonStyle, ButtonText } from './styles';
import { ButtonProps } from './props';

export const Button = ({
  onPress,
  children,
  outline,
  opaque,
  link,
  color,
  stretch,
  size,
  loading,
  style,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonStyle
      disabled={loading}
      onPress={() => onPress()}
      {...{ outline, opaque, link, stretch, size, style }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size={22} color={color} />
      ) : (
        <ButtonText {...{ outline, opaque, link, color, stretch, size }}>{children}</ButtonText>
      )}
    </ButtonStyle>
  );
};
