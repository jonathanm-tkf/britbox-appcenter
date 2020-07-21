import styled from 'styled-components/native';
import CardC from '@components/Card';

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 10px;
`;

export const WrapperCard = styled.View`
  align-items: center;
`;

export const Card = styled(CardC)`
  padding-bottom: 5px;
`;
