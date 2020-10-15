import { ThemeState } from '@store/modules/theme/types';
import styled from 'styled-components/native';

export const Container = styled.View`
  /* margin-bottom: -40px; */
  /* background-color: red; */
  /* width: 150px; */
  /* height: 150px; */
`;

export const DiscoverMoreText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 16px;
  margin-left: 15px;
`;

export const Actions = styled.View`
  /* margin-top: -20px; */
  /* z-index: 2; */
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
      height: 160px;
    `
    );
  }};
`;

export const ActionText = styled.Text`
  font-size: 14px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  align-self: center;
  margin-bottom: 50px;
`;
