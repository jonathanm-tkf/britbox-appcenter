import styled from 'styled-components/native';
import { TabBar as TabBarC } from 'react-native-tab-view';
import { ThemeState } from '@store/modules/theme/types';
import { rgba } from 'polished';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const TabBar = styled(TabBarC).attrs((props: ThemeState) => ({
  indicatorStyle: {
    backgroundColor: props.theme.SECONDARY_COLOR_LIGHT,
    width: 0,
  },
  activeColor: props.theme.SECONDARY_COLOR_LIGHT,
  inactiveColor: rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.6),
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 20,
  },
}))`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  border-bottom-width: 1px;
  border-color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.1)};
`;

export const TabWrapper = styled.View``;

interface TabLabelProps {
  color: string;
  focused: boolean;
}
export const TabLabel = styled.Text`
  color: ${(props: TabLabelProps & ThemeState) => props.color};
  font-size: ${normalize(16)}px;
  ${(props: TabLabelProps & ThemeState) => {
    return props.focused
      ? `font-family: ${props.theme.PRIMARY_FONT_FAMILY_MEDIUM}`
      : `font-family: ${props.theme.PRIMARY_FONT_FAMILY}`;
  }};
`;

export const IndicatorWrapper = styled.View`
  width: 100%;
  position: absolute;
  bottom: -14px;
  left: 0;
  right: 0;
`;
export const Indicator = styled.View`
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  width: 30px;
  height: 3px;
  align-self: center;
`;
