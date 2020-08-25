import styled from 'styled-components/native';
import { Headline as TitleC } from '@components/Typography';
import { ThemeState } from '@store/modules/theme/types';
import { rgba } from 'polished';

export const Container = styled.SafeAreaView``;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Title = styled(TitleC)``;

export const TitleWrapper = styled.View`
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 50px;
`;

export const SearchWrapper = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;

export const SearchInput = styled.TextInput.attrs((props: ThemeState) => ({
  placeholderTextColor: rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.35),
  selectionColor: props.theme.PRIMARY_FOREGROUND_COLOR,
}))`
  padding-left: 30px;
  padding-right: 30px;
  border-bottom-width: 2px;
  border-bottom-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 22px;
  line-height: 28px;
  height: 60px;
`;

export const SearchClearButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 0;
  width: 35px;
  height: 30px;
  justify-content: center;
  align-items: flex-end;
`;

export const SearchIconWrapper = styled.View`
  position: absolute;
  top: 15px;
`;

export const SuggestionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 15px;
  margin-bottom: 40px;
`;

export const SuggestionText = styled.Text`
  color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.35)};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: 16px;
`;
