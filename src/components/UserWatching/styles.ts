import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View``;

export const TabHeader = styled.View`
  flex-direction: row;
`;

export const TabHeaderItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 50px;
`;

interface ItemText {
  active: boolean;
}

export const TabHeaderItemText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: 18px;
  line-height: 36px;
  ${(props: ItemText & ThemeState) => {
    return props.active ? `opacity: 1;` : `opacity: 0.6`;
  }};
`;

export const TabHeaderItemIndicator = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  margin-right: 10px;
`;

export const TabContent = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
