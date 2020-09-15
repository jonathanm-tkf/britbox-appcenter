import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { FlatList, Platform, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import LogoBritbox from '../../../assets/images/Logo.svg';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  align-self: stretch;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  height: 77px;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 30px;
  /* margin-top: ${`${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px`}; */
  flex-direction: row;
`;

export const CenterLogoWrapper = styled.View`
  position: absolute;
  width: ${width}px;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Logo = styled(LogoBritbox).attrs({
  width: 100,
})``;

export const LinksList = styled(FlatList).attrs({
  horizontal: true,
  scrollEnabled: false,
})`
  flex: none;
  margin-right: 10px;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: [rgba('#101319', 0.9), rgba('#161a22', 0.1)],
})`
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
`;
