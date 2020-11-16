import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StarIcon } from '@assets/icons';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10}px;
`;

export const ItemContainer = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding-bottom: ${getBottomSpace() + 74}px;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})`
  flex: 1;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#171B23', '#202634'],
})``;

export const ActorNameContainer = styled.View`
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 25px;
  padding-right: 30px;
`;

export const CastStarIcon = styled(StarIcon).attrs((props: ThemeState) => ({
  width: 20,
  height: 20,
  fill: props.theme.SUCCESS_COLOR,
}))`
  margin-bottom: 3px;
`;

export const CastFirstNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CastFirstNameText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: ${normalize(14, 18)}px;
  padding-top: 2px;
  padding-left: 8px;
`;

export const CastLastNameText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: ${normalize(22, 26)}px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

export const GridContainer = styled.View`
  padding-top: 20px;
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 20px;
  justify-content: center;
`;
