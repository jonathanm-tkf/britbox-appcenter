import styled from 'styled-components/native';
import { Paragraph as ParagraphC, Headline as HeadlineC } from '@components/Typography';
import { ThemeState } from '@store/modules/theme/types';
import { rgba } from 'polished';
import { normalize } from '@src/utils/normalize';
import { Platform } from 'react-native';

export const Row = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

export const PaddingLeft = styled.View`
  padding-left: 20px;
`;

export const Paragraph = styled(ParagraphC)`
  color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_TEXT_COLOR, 0.6)};
  margin-bottom: ${Platform.OS === 'ios' ? 0 : 10}px;
  font-size: ${normalize(14, 16)}px;
  line-height: ${normalize(20, 24)}px;
`;

export const Headline = styled(HeadlineC)`
  margin-bottom: 20px;
  font-size: ${normalize(16, 18)}px;
`;

export const BottomSheetWrapper = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  height: 300px;
  padding-left: 20px;
  padding-right: 20px;
  align-self: stretch;
`;
