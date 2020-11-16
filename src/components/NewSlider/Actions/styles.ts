import { ThemeState } from '@store/modules/theme/types';
import styled from 'styled-components/native';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View``;

export const DiscoverMoreText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(12, 16)}px;
  margin-left: 15px;
`;

export const Actions = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

type ActionButtonProps = {
  link?: boolean;
};

export const ActionButton = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;

  ${(props: ActionButtonProps) => {
    return (
      props.link &&
      `
      height: 100px;
    `
    );
  }};
`;

export const ActionText = styled.Text`
  font-size: ${normalize(12, 14)}px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  align-self: center;
  margin-bottom: 50px;
`;
