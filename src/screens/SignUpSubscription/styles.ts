import { ScrollView as ScrollViewList } from 'react-native';
import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { RadioCheckedIcon, RadioUnCheckedIcon } from '@assets/icons';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  flex: 1;
  padding: 30px 0px 15px 0px;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const ErrorText = styled.Text`
  color: ${(props: ThemeState) => props.theme.ERROR_COLOR};
  text-align: center;
  margin-bottom: 20px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const ScrollView = styled.ScrollView``;

export const TitleWrapper = styled.View`
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const PaddingHorizontalView = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

export const Title = styled.Text`
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(18, 26)}px;
  font-weight: 700;
  text-align: center;
`;

export const SubTitle = styled.Text`
  margin-bottom: 10px;
  margin-top: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(14, 24)}px;
  font-weight: 700;
  text-align: center;
`;

export const FooterTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(16, 20)}px;
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

export const RowWrapper = styled(ScrollViewList).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  bounces: false,
})`
  margin-top: 10px;
`;

export const WrapperParagraph = styled.Text`
  margin-left: 15px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: ${normalize(12, 16)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const Paragraph = styled.Text`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: ${normalize(12, 16)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const SmallText = styled.Text`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: ${normalize(10, 14)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const RadioBox = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 170px;
  height: 100%;
  border-width: 1px;
  margin-horizontal: 5px;
  padding-horizontal: 15px;
  padding-bottom: 10px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const RadioBoxContent = styled.View`
  flex: 1;
`;

export const DescriptionText = styled.Text`
  text-align: center;
  margin-bottom: 30px;
  font-size: ${normalize(10, 14)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const RadioBottomText = styled.Text`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: ${normalize(9, 12)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const PriceTitle = styled.Text`
  text-align: center;
  margin-top: 2px;
  margin-bottom: 10px;
  font-size: ${normalize(22, 26)}px;
  font-weight: 700;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

export const Wrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 50px;
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

export const RadioCheckedIconView = styled(RadioCheckedIcon).attrs({
  height: 30,
  width: 30,
})`
  margin-top: 10px;
  margin-bottom: 15px;
  align-self: center;
`;

export const RadioUnCheckedIconView = styled(RadioUnCheckedIcon).attrs({
  height: 30,
  width: 30,
})`
  margin-top: 10px;
  margin-bottom: 15px;
  align-self: center;
`;
