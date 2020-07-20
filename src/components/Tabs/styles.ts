import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { View } from 'react-native-animatable';

export const Container = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: ${`${Platform.OS === 'ios' ? getBottomSpace() : 15}px`};
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  z-index: 2;
`;

export const ItemButton = styled.TouchableOpacity`
  align-self: center;
  justify-content: flex-end;
  min-height: 45px;
`;

interface ItemIconWrapper {
  focus: boolean;
}

export const ItemIconWrapper = styled.View`
  align-self: center;
  position: absolute;
  top: 0;
  ${(props: ItemIconWrapper) => {
    return props.focus ? `opacity: 1;` : `opacity: 0.6`;
  }};
`;

interface ItemText {
  focus: boolean;
}

export const ItemText = styled.Text<ItemText & ThemeState>`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 14px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  ${(props: ItemText) => {
    return props.focus ? `opacity: 1;` : `opacity: 0.6`;
  }};
`;

export const TabsAnimate = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
