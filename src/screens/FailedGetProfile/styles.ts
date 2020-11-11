import { ThemeState } from '@store/modules/theme/types';
import styled from 'styled-components/native';
import { Title as TitleC } from '@components/Typography';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Title = styled(TitleC)`
  margin-bottom: 50px;
  text-align: center;
  line-height: 40px;
`;
