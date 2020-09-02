import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding: 30px 20px;
`;

export const Row = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  margin-bottom: 25px;
  font-size: 14px;
`;

export const Label = styled.Text`
  text-transform: capitalize;
`;

export const LabelBold = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: 14px;
  text-transform: capitalize;
`;

export const InformationButton = styled.TouchableOpacity`
  padding: 5px;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 50px;
  height: 50px;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

export const CreditsWrapper = styled.View``;

export const CreditsList = styled.View`
  margin-top: 10px;
`;

export const CreditsItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CreditsText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  text-transform: capitalize;
  line-height: 20px;
  width: 55%;
`;
