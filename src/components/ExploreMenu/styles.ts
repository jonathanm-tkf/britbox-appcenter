import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Button } from '@components/Button';
import { rgba } from 'polished';
import { normalize } from '@src/utils/normalize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  width: 100%;
  padding: ${Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0}px 20px
    ${Platform.OS === 'ios' ? getBottomSpace() + 10 : 0}px;
  flex: 1;
`;

export const TabHeader = styled.View`
  flex-direction: row;
  margin-top: 18px;
  width: 100%;
`;

type TabHeaderItemProps = {
  active: boolean;
};

export const TabHeaderItem = styled.TouchableOpacity<TabHeaderItemProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface ItemText {
  active: boolean;
}

export const TabHeaderItemText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: ${normalize(18, 24)}px;
  line-height: ${normalize(32, 64)}px;
  ${(props: ItemText & ThemeState) => {
    return props.active
      ? `opacity: 1;`
      : `
        opacity: 0.6;
        font-family: ${props.theme.PRIMARY_FONT_FAMILY};
        align-self: flex-start;
      `;
  }};
`;

export const TabHeaderItemIndicator = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  margin-right: 10px;
`;

interface LinksWrapperProps {
  bigScreen: boolean;
}

export const LinksWrapper = styled.View<LinksWrapperProps>`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

type TabContentProps = {
  active: boolean;
  bigScreen?: boolean;
};

export const TabContent = styled.View<TabContentProps>`
  margin-top: 15px;
  ${(props: TabContentProps) => {
    return props.bigScreen && `padding-horizontal: 15%;`;
  }}
  ${(props: TabContentProps) => {
    return (
      !props.active &&
      `
      height: 0;
      width: 0;
      overflow: hidden;
    `
    );
  }};
`;

export const TabButton = styled.TouchableOpacity``;

export const TabButtonText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${normalize(18, 24)}px;
  line-height: ${normalize(48, 65)}px;
`;
