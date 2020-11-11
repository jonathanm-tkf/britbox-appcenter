import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform, Animated } from 'react-native';
import { rgba } from 'polished';
import { normalize } from '@src/utils/normalize';

type ContainerProps = {
  paddingBottom: number;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};

  ${(props: ContainerProps & ThemeState) => {
    return (
      !props.paddingBottom &&
      `
      padding-bottom: ${getBottomSpace() + props.paddingBottom}px;
    `
    );
  }};
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})`
  flex: 1;
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
  font-size: ${normalize(9, 12)}px;
  text-transform: uppercase;
  top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;
  width: 100%;
  height: 50px;
  line-height: ${normalize(44, 50)}px;
  position: absolute;
  z-index: 1;
  text-align: center;
`;

export const BackgroundTop = styled(Animated.View)`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  width: 100%;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 50 : 50}px;
`;

export const Poster = styled.View`
  align-items: center;
  position: absolute;
  top: ${Platform.OS === 'ios' ? 80 : 50}px;
  width: 100%;
  z-index: 3;
`;

export const InnerContent = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  margin-top: -12px;
  padding-top: ${Platform.OS === 'ios' ? 80 : 40}px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const WrapperBookmarks = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const WrapperPin = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export const ParagraphChecking = styled.Text`
  color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_TEXT_COLOR, 0.6)};
  font-size: ${normalize(10, 14)}px;
  margin-top: 20px;
`;

export const ParagraphError = styled.Text`
  color: ${(props: ThemeState) => props.theme.ERROR_COLOR};
  font-size: ${normalize(10, 14)}px;
  margin-top: 20px;
`;

export const ButtonTrailer = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const ButtonTrailerText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  margin-left: 5px;
`;
