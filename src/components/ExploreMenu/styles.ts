import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
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
  center: boolean;
<<<<<<< HEAD
<<<<<<< HEAD
  addPadding: boolean;
=======
  paddingLeft?: string;
>>>>>>> d75ef9c... fix titles positions on Explore screen
=======
  addPadding: boolean;
>>>>>>> 7829e77... fix header titles position on tablets
};

export const TabHeaderItem = styled.TouchableOpacity<TabHeaderItemProps>`
  width: 50%;
  flex-direction: row;
  align-items: center;
<<<<<<< HEAD
<<<<<<< HEAD
  ${(props: TabHeaderItemProps) => props.addPadding && `padding-left: 6%;`}
  ${(props: TabHeaderItemProps) => props.center && `justify-content: center;`}
`;

export const BigScreenTabHeaderItemTextWrapper = styled.Text`
  width: 50%;
  align-items: flex-start;
  opacity: 0.6;
=======
  ${(props: TabHeaderItemProps) => props.center && `justify-content: center;`}
  ${(props: TabHeaderItemProps) => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
>>>>>>> d75ef9c... fix titles positions on Explore screen
=======
  ${(props: TabHeaderItemProps) => props.addPadding && `padding-left: 6%;`}
  ${(props: TabHeaderItemProps) => props.center && `justify-content: center;`}
>>>>>>> 7829e77... fix header titles position on tablets
`;

interface ItemText {
  active: boolean;
  paddingLeft?: string;
}

export const TabHeaderItemText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: ${normalize(18, 24)}px;
  line-height: ${normalize(32, 64)}px;
  ${(props: ItemText) => props.paddingLeft && `padding-right: ${props.paddingLeft};`}
  ${(props: ItemText & ThemeState) => {
    return props.active
      ? `opacity: 1;`
      : `
        opacity: 0.6;
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
    return props.bigScreen && `padding-horizontal: 10%;`;
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
