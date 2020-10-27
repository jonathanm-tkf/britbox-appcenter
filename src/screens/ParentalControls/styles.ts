import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { UnLockIcon, LockIcon } from '@assets/icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding-bottom: ${getBottomSpace() + 74}px;
`;

export const ScrollableContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
  bounces: false,
  nestedScrollEnabled: true,
  keyboardShouldPersistTaps: 'handled',
})`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const TitleWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const PasswordContainer = styled.View`
  flex: 1;
  padding: 15px 15px 40px;
`;

export const Title = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(18, 22)}px;
  font-weight: 700;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const SubTitle = styled.Text`
  margin-top: 30px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(14, 18)}px;
  font-weight: 600;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#202634', '#171B23'],
})``;

export const Wrapper = styled.View`
  padding-top: 20px;
  padding-bottom: 10px;
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

export const LinkTitle = styled.Text`
  margin-bottom: 10px;
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  font-size: ${normalize(11, 15)}px;
  text-align: center;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const ErrorText = styled.Text`
  color: ${(props: ThemeState) => props.theme.ERROR_COLOR};
  align-self: center;
  margin-bottom: 20px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const Paragraph = styled.Text`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: ${normalize(11, 15)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const TableMainContainer = styled.View`
  margin: 30px 20px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR_OPAQUE};
  border-top-width: 1px;
  border-left-width: 1px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 150px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR_OPAQUE};
  border-bottom-width: 1px;
  border-right-width: 1px;
`;

export const RowContent = styled.View`
  flex: 1;
  justify-content: center;
`;

export const RowLeftContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 130px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const RowLeftTitle = styled.Text`
  text-align: center;
  font-size: ${normalize(12, 16)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const SliderContainer = styled.View`
  position: absolute;
  margin-top: 600px;
  top: -325px;
  left: -170px;
`;

export const TableBtnContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

export const BtnContainer = styled.View`
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  opacity: 0.7;
`;

export const BtnText = styled.Text`
  text-align: center;
  font-size: ${normalize(8, 10)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const TableRightText = styled.Text`
  font-size: ${normalize(7, 13)}px;
  font-weight: 600;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  opacity: 0.8;
`;

export const PinBtnView = styled.View`
  margin: 10px 15px 30px;
  padding: 30px 35px;
  align-items: center;
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
`;

export const PINView = styled.View`
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 20px;
  padding: 10px 15px;
  align-items: center;
`;

export const PINErrorText = styled.Text`
  padding-top: 10px;
  padding-bottom: 40px;
  color: #c0424e;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${normalize(10, 14)}px;
  text-align: center;
`;

export const LockIconView = styled(LockIcon).attrs({
  height: 30,
  width: 30,
})`
  margin-top: 15px;
`;

export const UnLockIconView = styled(UnLockIcon).attrs({
  height: 40,
  width: 40,
})`
  margin-top: 15px;
`;

export const DisabledOverlay = styled.View`
  height: 765px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR};
  opacity: 0.4;
`;

export const ErrorContent = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
`;
