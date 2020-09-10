import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Button } from '@components/Button';
import { rgba } from 'polished';

export const Container = styled.View`
  width: 100%;
`;

export const TabHeader = styled.View`
  flex-direction: row;
  margin-top: 18px;
  width: 100%;
`;

export const TabHeaderItem = styled.TouchableOpacity`
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
  font-size: 18px;
  line-height: 36px;
  ${(props: ItemText & ThemeState) => {
    return props.active
      ? `opacity: 1;`
      : `
        opacity: 0.6;
        font-family: ${props.theme.PRIMARY_FONT_FAMILY};
      `;
  }};
`;

export const HeaderWrapper = styled.View`
  padding-top: 35px;
  padding-bottom: 35px;
  flex-direction: row;
  border-bottom-width: 1px;
  align-items: center;
  justify-content: space-around;
  border-bottom-color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_COLOR_OPAQUE, 0.5)};
`;

export const HeaderBottom = styled(Button)`
  font-size: 18px;
  line-height: 38px;
`;

export const TabHeaderItemIndicator = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  margin-right: 10px;
`;

type TabContent = {
  active: boolean;
};

export const TabContent = styled.View<TabContent>`
  flex-direction: column;
  margin-top: 15px;
  align-items: center;
  ${(props: TabContent) => {
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
  font-size: 25px;
  line-height: 65px;
`;
