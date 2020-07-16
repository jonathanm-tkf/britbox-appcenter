import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { View } from 'react-native-animatable';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';

export const Modal = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const Content = styled.View`
  flex: 1;
`;

export const TabsWrapper = styled(Animated.View)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  justify-content: center;
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 4;
  top: 20px;
  left: ${`${getStatusBarHeight() + 20}px`};
  width: 25px;
  height: 25px;
`;
