import styled from 'styled-components/native';
import { Switch } from 'react-native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { normalize } from '@src/utils/normalize';
import { isTablet } from 'react-native-device-info';

export const Container = styled.View`
  flex: 1;
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
    paddingBottom: getBottomSpace() + 74,
  },
  bounces: false,
  nestedScrollEnabled: true,
})`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const ErrorText = styled.Text`
  color: ${(props: ThemeState) => props.theme.ERROR_COLOR};
  align-self: center;
  margin-bottom: 20px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const ScrollContent = styled.View`
  flex: 1;
  padding: 10px 0 30px;
`;

export const ScrollableContainerPaddingHorizontal = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

export const SwitchContainer = styled(Switch).attrs({
  trackColor: { true: '#2d6eff', false: '#202634' },
  thumbColor: '#FFFFFF',
})``;

export const TitleWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(18, 26)}px;
  font-weight: 700;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const SubTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(14, 24)}px;
  font-weight: 600;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#202634', '#171B23'],
})`
  padding-bottom: ${getBottomSpace() + 74}px;
  margin-left: -20px;
  margin-right: -20px;
`;

interface WrapperProps {
  isShowMiniController: boolean;
}

export const Wrapper = styled.View`
  padding-top: 15px;
  padding-bottom: ${(props: WrapperProps) =>
    props.isShowMiniController ? (isTablet() ? 140 : 90) : 25}px;
`;

export const FooterTitle = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(14, 18)}px;
  font-weight: 700;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const LinkTitle = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  font-size: ${normalize(12, 16)}px;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const Paragraph = styled.Text`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: ${normalize(12, 16)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const NewsParagraph = styled.Text`
  font-size: ${normalize(10, 14)}px;
  padding-left: 15px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const SubscriptionParagraph = styled.Text`
  margin-bottom: 20px;
  font-size: ${normalize(12, 16)}px;
  padding: 15px 20px;
  line-height: ${normalize(16, 22)}px;
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

export const Header = styled.View``;

export const SuscribeText = styled.Text`
  margin-left: 40px;
  margin-right: 40px;
`;
