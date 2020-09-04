import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { CastButton as CastButtonC } from 'react-native-google-cast';
import { rgba } from 'polished';
import { Platform } from 'react-native';

export const Container = styled.View``;

export const FABView = styled.View`
  position: absolute;
  margin: 16px;
  right: 0px;
  bottom: ${Platform.OS === 'ios' ? 100 : 80}px;
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
