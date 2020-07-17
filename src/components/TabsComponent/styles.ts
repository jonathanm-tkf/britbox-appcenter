import styled from 'styled-components/native';
import { TabBar as TabBarC } from 'react-native-tab-view';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
`;

export const TabBar = styled(TabBarC).attrs((props: ThemeState) => ({
  indicatorStyle: { backgroundColor: props.theme.SECONDARY_COLOR_LIGHT },
  activeColor: props.theme.SECONDARY_COLOR_LIGHT,
}))`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

interface TabLabel {
  color: string;
}
export const TabLabel = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: TabLabel & ThemeState) => props.color};
`;
