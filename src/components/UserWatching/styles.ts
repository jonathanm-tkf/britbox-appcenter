import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  margin-top: 10px;
  margin-bottom: 30px;
`;

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
  font-size: ${normalize(18)}px;
  line-height: ${normalize(36)}px;
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

type TabContentProps = {
  active: boolean;
};

export const TabContent = styled.View<TabContentProps>`
  flex-direction: row;
  margin-top: 5px;
  ${(props: TabContentProps) => {
    return (
      !props.active &&
      `
      display: none;
    `
    );
  }};
`;
