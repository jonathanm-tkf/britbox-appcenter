import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding: 20px;
`;

export const ContainerFilter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 10px;
`;

export const Year = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  opacity: 0.6;
`;

export const SeasonButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  max-width: 80%;
`;

export const SeasonText = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  margin-right: 10px;
  font-size: ${normalize(12, 16)}px;
  line-height: ${normalize(20, 24)}px;
`;

export const InformationButton = styled.TouchableOpacity`
  padding: 5px;
`;
