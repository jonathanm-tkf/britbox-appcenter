import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View``;

export const ActionWrapper = styled.View`
  justify-content: center;
`;

export const ActionInnerContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
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

export const PreloadActions = styled.View`
  width: 100%;
  height: 150px;
`;
