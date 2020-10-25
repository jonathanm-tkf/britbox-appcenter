import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { normalize } from '@src/utils/normalize';

type IsFocused = {
  isFocused: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
  padding-bottom: ${getBottomSpace()}px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const Label = styled.Text`
  font-size: ${normalize(14)}px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  margin-top: 5px;
  margin-bottom: 5px;
  opacity: ${(props: ThemeState & IsFocused) => (props.isFocused ? 1 : 0.6)};
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const WrapperIcon = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  opacity: ${(props: IsFocused) => (props.isFocused ? 1 : 0.6)};
`;

export const CustomShadowTabBar = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  position: absolute;
  top: 0;
  width: 100%;
  height: 10px;
  z-index: 1;
`;

export const TabsWrapper = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  align-content: center;
  justify-content: flex-end;
`;
