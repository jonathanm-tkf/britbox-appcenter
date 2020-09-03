import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
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

export const BottomParagraph = styled.Text`
  position: absolute;
  bottom: 0px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 18px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const LinkTitle = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  text-decoration-line: underline;
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
