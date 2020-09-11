import React from 'react';

export interface ButtonProps {
  opaque?: boolean;
  secondary?: boolean;
  outline?: boolean;
  link?: boolean;
  children: React.ReactNode;
  onPress: () => void;
  testID?: string;
  color?: string;
  stretch?: boolean;
  size?: 'small' | 'medium' | 'big';
  fontWeight?: 'normal' | 'medium' | 'bold';
  loading?: boolean;
  style?: any;
  rest?: any;
  disabled?: boolean;
}

export interface ButtonTextProps {
  opaque?: boolean;
  outline?: boolean;
  link?: boolean;
  color?: string;
  stretch?: boolean;
  size?: 'small' | 'medium' | 'big';
  fontWeight?: 'normal' | 'medium' | 'bold';
}
