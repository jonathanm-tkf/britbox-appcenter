import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { isTablet } from '@src/utils/tablet';
import { getDimensions } from '@src/utils/dimension';

const { width } = getDimensions();
const wrappersWidth = width * (isTablet() ? 0.8 : 0.6);

export const Container = styled.View`
  padding: ${Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0}px 0px
    ${Platform.OS === 'ios' ? getBottomSpace() + 10 : 0}px;
  flex: 1;
  align-items: center;
`;

export const TabHeader = styled.View`
  flex-direction: row;
  margin-top: 18px;
  width: ${wrappersWidth}px;
`;

type TabHeaderItemProps = {
  active: boolean;
};

export const TabHeaderItem = styled.TouchableOpacity<TabHeaderItemProps>`
  width: ${wrappersWidth / 2}px;
  ${() => !isTablet() && `align-items: center;`}
`;

export const TabHaederChild = styled.View`
  flex-direction: row;
  align-items: center;
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
        opacity: 0.3;
        font-family: ${props.theme.PRIMARY_FONT_FAMILY};
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

export const LinksWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  width: ${wrappersWidth / 2}px;
`;

type TabContentProps = {
  active: boolean;
  bigScreen?: boolean;
};

export const TabContent = styled.View<TabContentProps>`
  margin-top: 15px;
  ${() =>
    isTablet()
      ? `
        padding-left: 50px;
        width: ${wrappersWidth / 2}px;
      `
      : `
        align-items: center;
      `}
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
