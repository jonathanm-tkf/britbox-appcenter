import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import { normalize } from '@src/utils/normalize';

import {
  Title as TitleC,
  Paragraph as ParagraphC,
  Headline as HeadlineC,
} from '@components/Typography';
import { rgba } from 'polished';

export const Background = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  padding-bottom: ${getBottomSpace() + 64}px;
  padding: 20px;
`;

export const Title = styled(TitleC)`
  margin-bottom: 10px;
`;

export const Paragraph = styled(ParagraphC)``;

export const Headline = styled(HeadlineC)`
  margin-bottom: 30px;
`;

export const GridWrapper = styled.View`
  margin-bottom: 100px;
`;

export const RemoveButtonWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: -10px;
`;

export const BottomSheetWrapper = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  height: 300px;
  padding-left: 20px;
  padding-right: 20px;
  align-self: stretch;
`;

export const FilterText = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.6)};
  margin-right: 10px;
`;

export const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  height: 50px;
  line-height: ${normalize(44, 50)}px;
  right: 10px;
  top: 0;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
