import { ThemeState } from '@store/modules/theme/types';
import styled from 'styled-components/native';
import { Title as TitleC, Paragraph as ParagraphC } from '@components/Typography';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  justify-content: center;
  align-items: center;
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Title = styled(TitleC)`
  margin-top: 50px;
  margin-bottom: 10px;
`;

export const Paragraph = styled(ParagraphC)`
  margin-bottom: 30px;
`;
