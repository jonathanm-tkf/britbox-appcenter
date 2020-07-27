import styled from 'styled-components/native';
import { Switch } from 'react-native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const SceneContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ScrollableContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
  bounces: false,
  nestedScrollEnabled: true,
})`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const ScrollableContainerPaddingHorizontal = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

export const SwitchContainer = styled(Switch).attrs({
  trackColor: { true: '#2d6eff' },
})``;

export const TitleWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const SubTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#202634', '#171B23'],
})``;

export const Wrapper = styled.View`
  padding-top: 10px;
  padding-bottom: 40px;
`;

export const FooterTitle = styled.Text`
  margin-top: 10px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const LinkTitle = styled.Text`
  margin-bottom: 10px;
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  font-size: 16px;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const Paragraph = styled.Text`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const NewsParagraph = styled.Text`
  font-size: 14px;
  padding-left: 15px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const SubscriptionParagraph = styled.Text`
  margin-bottom: 20px;
  font-size: 16px;
  padding: 15px 20px;
  line-height: 22px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  border-width: 1px;
`;

export const RowContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex-direction: row;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 30px;
`;

export const RowContent = styled.View`
  flex: 1;
`;
