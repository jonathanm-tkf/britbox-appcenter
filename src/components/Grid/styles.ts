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
  margin-right: 100px;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const FilterWrapper = styled.View`
  margin-left: auto;
`;
