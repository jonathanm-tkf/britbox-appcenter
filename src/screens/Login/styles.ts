import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoBritbox from '../../../assets/images/Logo.svg';

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px 30px;
  justify-content: center;
  margin-bottom: 10px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const ErrorText = styled.Text`
  color: ${(props: ThemeState) => props.theme.ERROR_COLOR};
  align-self: center;
  margin-bottom: 20px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const ScrollView = styled.ScrollView`
  /* margin-top: 77px; */
`;

export const Logo = styled(LogoBritbox).attrs({
  width: 100,
})`
  margin: 0 0 0 30px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 35 : getStatusBarHeight() - 5}px;
  right: 20px;
  z-index: 1;
`;

export const TitleWrapper = styled.View`
  align-self: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-bottom: 25px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 26px;
  font-weight: 700;
`;

export const Paragraph = styled.Text`
  text-align: center;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
  font-size: 16px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 55px;
`;

export const SuscribeText = styled.Text`
  margin-left: 40px;
  margin-right: 40px;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#202634', '#171B23'],
})`
  flex: 1;
  margin-top: ${getStatusBarHeight() + 80}px;
`;

export const ForgotContainer = styled.View`
  align-self: flex-end;
  margin-bottom: 30px;
`;

export const ForgotText = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: 18px;
`;

export const ForgotModalContainer = styled.View`
  padding: 10px 20px;
`;

export const ModalTitle = styled.Text`
  margin-top: 5px;
  margin-bottom: 15px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: 20px;
  opacity: 0.8;
`;

export const ModalSubTitle = styled.Text`
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
  font-size: 16px;
  line-height: 25px;
  opacity: 0.7;
`;

export const EmailLink = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;
