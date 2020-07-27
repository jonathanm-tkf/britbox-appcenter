import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View``;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 4;
  top: 20px;
  left: ${`${getStatusBarHeight() + 20}px`};
  width: 25px;
  height: 25px;
`;
