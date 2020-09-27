import styled from 'styled-components/native';
import CardC from '@components/Card';
import { Headline as HeadlineC } from '@components/Typography';

export const Container = styled.View`
  width: 100%;
`;

export const Card = styled(CardC)`
  padding-bottom: 0;
  align-self: center;
`;

export const Headline = styled(HeadlineC)`
  max-width: 80%;
`;
