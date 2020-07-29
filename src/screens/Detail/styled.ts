import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const HeaderBackgroundImage = styled.View`
  height: 300px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
`;

export const ImageTop = styled.Image.attrs({
  resizeMode: 'cover',
  blurRadius: 2,
})`
  width: ${width}px;
  height: 300px;
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
  /* background-color: red; */
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
  padding: ${Platform.OS === 'ios' ? 210 : 180}px 20px 40px;
`;

export const ActionWrapper = styled.View`
  margin-top: -40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ActionText = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  font-size: 14px;
`;

interface ActionButton {
  play?: boolean;
}

export const ActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: ${(props: ActionButton) => (props.play ? 10 : 0)}px;
`;

export const ActionInformation = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 12px;
`;

export const ActionInformationWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const PreloadDescription = styled.View`
  width: 100%;
  height: 150px;
`;
