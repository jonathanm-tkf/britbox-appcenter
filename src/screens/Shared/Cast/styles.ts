import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { CastButton as CastButtonC } from 'react-native-google-cast';
import { rgba } from 'polished';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const FABView = styled(RectButton)`
  position: absolute;
  margin: 16px;
  right: 0px;
  bottom: ${Platform.OS === 'ios' ? 90 : 55}px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 15px;
  shadow-opacity: 0.8;
  shadow-radius: 15px;
  elevation: 3;
  border-width: 2px;
  border-color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.6)};
`;

export const CastButton = styled(CastButtonC).attrs((props: ThemeState) => ({
  tintColor: props.theme.PRIMARY_FOREGROUND_COLOR,
}))`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const MiniController = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70px;
  margin-bottom: -10px;
  z-index: 1;
  elevation: 4;
`;

export const MiniImage = styled(FastImage)`
  width: 120px;
  height: 70px;
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
`;

export const MiniWrapperText = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  align-content: center;
  justify-content: center;
  flex: 1;
`;

export const MiniTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 2px;
`;

export const MiniSubtitle = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  font-size: 10px;
`;

export const MiniExpandButton = styled.TouchableOpacity`
  flex-direction: row;
  align-content: center;
  width: 100%;
`;

export const MiniExpandButtonIcon = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
`;
