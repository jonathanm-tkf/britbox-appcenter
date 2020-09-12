import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { Paragraph as ParagraphC, Headline as HeadlineC } from '@components/Typography';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Animated, Platform } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Paragraph = styled(ParagraphC)``;

export const Headline = styled(HeadlineC)`
  text-transform: capitalize;
`;

export const CreditsWrapper = styled.View``;

export const CreditsList = styled.View`
  margin-top: 30px;
  margin-bottom: 100px;
`;

export const CreditsItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CreditsText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  text-transform: capitalize;
  line-height: 20px;
  width: 55%;
`;

export const TopWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
  align-items: center;
  justify-content: center;
  left: 0;
  z-index: 4;
  width: 50px;
  height: 50px;
`;

export const TopText = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 12px;
  text-transform: uppercase;
  top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: absolute;
  z-index: 1;
  text-align: center;
`;

export const BackgroundTop = styled(Animated.View)`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  width: 100%;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 50 : 50}px;
`;

export const YearWrapper = styled.View`
  margin-top: 30px;
`;
