import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { ThemeState } from '@store/modules/theme/types';
import {
  Title as TitleC,
  Paragraph as ParagraphC,
  Headline as HeadlineC,
} from '@components/Typography';

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
