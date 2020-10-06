import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Animated } from 'react-native';
import { TabBar as TabBarC } from 'react-native-tab-view';
import { rgba } from 'polished';

export const Container = styled.View``;

export const TitleWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-bottom: 10px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const Header = styled(Animated.View)`
  top: 0px;
  height: 110px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

export const TabWrapper = styled.View``;

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

interface TabLabelProps {
  color: string;
  focused: boolean;
}
export const TabLabel = styled.Text`
  color: ${(props: TabLabelProps & ThemeState) => props.color};
  font-size: 16px;
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

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
