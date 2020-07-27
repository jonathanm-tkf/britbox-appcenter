import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${Platform.OS === 'android' ? 15 : 0}px;
`;
