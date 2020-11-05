import styled from 'styled-components/native';
import { Paragraph as ParagraphC } from '@components/Typography';
import { normalize } from '@src/utils/normalize';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View``;

export const HoleContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: 60px;
  padding-right: 60px;
  z-index: 2;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const HoleText = styled(ParagraphC)`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  font-size: ${normalize(14, 20)}px;
  line-height: ${normalize(24, 34)}px;
  text-align: center;
  margin-bottom: 20px;
`;
