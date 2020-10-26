import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { ProfileImageIcon } from '@assets/icons';
import { normalize } from '@src/utils/normalize';

export const ProfileView = styled.View`
  padding-top: 50px;
  padding-bottom: 30px;
`;

export const RowContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
`;

export const ProfileImageIconView = styled(ProfileImageIcon).attrs({
  height: 50,
  width: 50,
})`
  margin-right: 20px;
  top: -15px;
`;

export const RowViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EditIconContainer = styled.TouchableOpacity`
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
`;

export const RowContent = styled.View`
  flex: 1;
`;

export const SubTitleLink = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  font-size: ${normalize(16)}px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const SeparatorLine = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  height: 1px;
  margin-top: 15px;
  margin-bottom: 15px;
  opacity: 0.1;
`;

export const ItemTitle = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(18)}px;
  padding-top: 5px;
  padding-bottom: 5px;
  opacity: 0.6;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const ItemSubTitle = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(20)}px;
  padding-bottom: 5px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
`;

export const DescriptionText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(14)}px;
  padding-top: 1px;
  opacity: 0.6;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
`;
