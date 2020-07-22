import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { FlatList, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import LogoBritbox from '../../../assets/images/Logo.svg';

export const Container = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const TopWrapper = styled.View`
  flex-direction: row;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 15 : 0}px;
  width: 100%;
  align-items: center;
  padding-bottom: 15px;
`;

export const Logo = styled(LogoBritbox).attrs({
  width: 100,
})``;

export const EmptyView = styled.View`
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
  padding-bottom: 20px;
`;

export const SideView = styled.View`
  flex: 1;
`;

export const CenterWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  z-index: -1;
  top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
`;

export const Title = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  margin-top: 24px
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  z-index: 4;
  width: 50px;
  height: 50px;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: [rgba('#101319', 0.9), rgba('#161a22', 0.1)],
})`
  height: 20px;
`;
