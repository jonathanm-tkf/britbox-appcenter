import styled from 'styled-components/native';
import { Paragraph as ParagraphC, Headline as HeadlineC } from '@components/Typography';
import { ThemeState } from '@store/modules/theme/types';
import { rgba } from 'polished';

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
  margin-bottom: 30px;
`;

export const Headline = styled(HeadlineC)`
  margin-bottom: 20px;
`;

export const BottomSheetWrapper = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  height: 300px;
  padding-left: 20px;
  padding-right: 20px;
  align-self: stretch;
`;
