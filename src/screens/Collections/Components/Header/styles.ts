import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View``;

export const HeaderBackgroundImage = styled.View`
  height: 620px;
  margin-bottom: 30px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  padding-top: ${getStatusBarHeight()}px;
`;

export const CustomShadow = styled.View`
  flex: 1;
  shadow-color: #000;
  shadow-offset: 0px 15px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  shadow-opacity: 0.8;
  shadow-radius: 15px;
  elevation: 3;
  border-radius: 8px;
`;
