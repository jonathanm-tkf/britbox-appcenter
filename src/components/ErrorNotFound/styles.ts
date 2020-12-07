import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LogoBritbox from '../../../assets/images/Logo.svg';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 20px;
  justify-content: center;
`;

export const Opaque = styled.View`
  opacity: 0.6;
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const LogoContainer = styled.View`
  position: absolute;
  top: ${getStatusBarHeight()}px;
  width: 100%;
  align-items: center;
  padding-bottom: 20px;
`;

export const Logo = styled(LogoBritbox).attrs({
  width: 100,
})``;
