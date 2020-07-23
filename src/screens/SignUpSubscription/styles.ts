import styled from 'styled-components/native';
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

export const FooterTitle = styled.Text`
  margin-top: 10px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

export const EmailTitle = styled.Text`
  margin-bottom: 10px;
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  font-size: 16px;
  text-align: center;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
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
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const SmallText = styled.Text`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const RadioBox = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  border-width: 1px;
  margin-horizontal: 5px;
  padding-horizontal: 20px;
  padding-bottom: 10px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const DescriptionText = styled.Text`
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const RadioBottomText = styled.Text`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 12px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const PriceTitle = styled.Text`
  text-align: center;
  margin-top: 2px;
  margin-bottom: 10px;
  font-size: 26px;
  font-weight: 700;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const Wrapper = styled.View`
  padding-top: 10px;
  padding-bottom: 40px;
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
