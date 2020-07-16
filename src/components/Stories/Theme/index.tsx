import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { View } from 'react-native';
import { base, lightTheme, colorOptions } from '../../../store/modules/theme/theme';
import style from './style';

export default function Theme(children: () => React.ReactNode) {
  return (
    <ThemeProvider theme={{ ...base, ...lightTheme, ...colorOptions.black }}>
      <View {...{ style }}>{children()}</View>
    </ThemeProvider>
  );
}
