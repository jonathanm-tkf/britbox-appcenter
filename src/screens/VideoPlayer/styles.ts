import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View``;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 4;
  top: 29px;
  left: ${`${getStatusBarHeight() + 29}px`};
  width: 25px;
  height: 25px;
`;

export const ChromecastWrapper = styled.View`
  height: 0;
  width: 0;
  opacity: 0;
`;

export const SafeArea = styled.View``;

export const LoadingContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
  background-color: #000;
`;

export const LoadingWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
