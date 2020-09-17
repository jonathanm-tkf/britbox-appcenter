import styled from 'styled-components/native';
import {
  Title as TitleC,
  Paragraph as ParagraphC,
  Headline as HeadlineC,
} from '@components/Typography';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View``;

export const BottomSheetWrapper = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  height: 300px;
  padding-left: 20px;
  padding-right: 20px;
  align-self: stretch;
`;

export const Title = styled(TitleC)`
  margin-bottom: 10px;
`;

export const Paragraph = styled(ParagraphC)``;

export const Headline = styled(HeadlineC)`
  margin-bottom: 30px;
`;
