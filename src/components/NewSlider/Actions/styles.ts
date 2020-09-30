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
`;

export const ActionText = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  font-size: 14px;
`;

interface ActionButtonProps {
  play?: boolean;
  link?: boolean;
}

export const ActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: ${(props: ActionButtonProps) => (props.play ? 10 : 0)}px;

  ${(props: ActionButtonProps) => {
    return (
      props.link &&
      `
      flex-direction: row;
    `
    );
  }};
`;

export const DiscoverMoreText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 16px;
  margin-left: 15px;
`;
