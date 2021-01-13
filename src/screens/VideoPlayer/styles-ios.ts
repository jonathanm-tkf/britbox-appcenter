import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const SafeArea = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: flex-start;
`;

export const Wrapper = styled.View``;

export const Back = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 1;
  left: ${getStatusBarHeight() + 10}px;
  top: 10px;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.View`
  background-color: #000;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ErrorWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ErrorText = styled.Text`
  color: #fff;
`;
