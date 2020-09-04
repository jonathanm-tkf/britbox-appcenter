import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { CastButton as CastButtonC } from 'react-native-google-cast';

export const Container = styled.View``;

export const CastButton = styled(CastButtonC).attrs((props: ThemeState) => ({
  tintColor: props.theme.PRIMARY_FOREGROUND_COLOR,
}))`
  position: absolute;
  margin: 16px;
  right: 0px;
  bottom: 100px;
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
`;
