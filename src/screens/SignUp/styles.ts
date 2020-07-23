import styled from 'styled-components/native';
import { CheckBox } from 'react-native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  padding: 30px 20px 15px 20px;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
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

export const TitleWrapper = styled.View`
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 26px;
  font-weight: 700;
  text-align: center;
`;

export const SubTitle = styled.Text`
  margin-bottom: 10px;
  margin-top: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

export const RowWrapper = styled.View`
  flex: 1;
`;

export const WrapperParagraph = styled.Text`
  margin-left: 15px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const Paragraph = styled.Text`
  text-align: center;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const Wrapper = styled.View`
  flex-direction: row;
  padding-top: 25px;
  padding-bottom: 55px;
`;

export const CheckBoxView = styled(CheckBox)`
  height: 30px;
  width: 30px;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 20px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const CancelText = styled.Text`
  margin-left: 40px;
  margin-right: 40px;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#202634', '#171B23'],
})`
  flex: 1;
`;
