import styled from 'styled-components/native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import { Platform, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding-bottom: ${getBottomSpace() + 64}px;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})``;

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

export const SpaceNoHeroSlim = styled.View`
  height: 60px;
`;

export const GridInnerContent = styled.View`
  position: absolute;
  bottom: 5px;
  width: 100%;
  align-self: center;
`;

export const Gradient = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  width: 100%;
  height: 160px;
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  z-index: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const ActionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 2;
`;

export const ActionText = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: 14px;
  line-height: 24px;
`;

export const ActionTitle = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 16px;
  line-height: 37px;
  margin-left: 15px;
  margin-bottom: 5px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  z-index: 2;
`;

export const ChangeGenreButton = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  height: 50px;
  line-height: 50px;
  right: 20px;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const ChangeGenreText = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  margin-right: 10px;
`;

export const ChangeOrderText = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.6)};
  margin-right: 10px;
`;

export const ChangeOrderButton = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  height: 50px;
  line-height: 50px;
  right: 10px;
  top: 0;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const WrapperContinuosScroll = styled.View`
  position: relative;
`;
