import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  flex: 1;
  padding: 20px 20px 30px;
  justify-content: center;
  margin-bottom: 10px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const ErrorText = styled.Text`
  color: ${(props: ThemeState) => props.theme.ERROR_COLOR};
  text-align: center;
  margin-bottom: 20px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const ScrollView = styled.ScrollView`
  margin-top: ${getStatusBarHeight() + (Platform.OS === 'ios' ? 80 : 40)}px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 35 : getStatusBarHeight() - 5}px;
  right: 20px;
  z-index: 1;
`;

export const TitleWrapper = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-bottom: 25px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(18, 22)}px;
  font-weight: 700;
  text-align: center;
`;

export const Paragraph = styled.Text`
  text-align: center;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
  font-size: ${normalize(12, 18)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const Wrapper = styled.View`
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 55px;
  border-bottom-width: 1px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
`;

export const SuscribeText = styled.Text`
  margin-left: 40px;
  margin-right: 40px;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#202634', '#171B23'],
})`
  flex: 1;
`;

export const ForgotContainer = styled.View`
  align-self: flex-end;
  margin-bottom: 30px;
`;

export const ForgotText = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: ${normalize(14, 18)}px;
`;

export const ForgotModalContainer = styled.View`
  padding: 10px 20px;
`;

export const ModalTitle = styled.Text`
  margin-top: 5px;
  margin-bottom: 15px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: ${normalize(14, 20)}px;
  opacity: 0.8;
`;

export const ModalSubTitle = styled.Text`
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
  font-size: ${normalize(12, 16)}px;
  line-height: ${normalize(21, 25)}px;
  opacity: 0.7;
`;

export const EmailLink = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const GradientWrapper = styled.View`
  padding-top: 20px;
  padding-bottom: 40px;
`;

export const FooterTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(14, 20)}px;
  font-weight: 700;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const EmailTitle = styled.Text`
  margin-bottom: 10px;
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  font-size: ${normalize(12, 16)}px;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;
