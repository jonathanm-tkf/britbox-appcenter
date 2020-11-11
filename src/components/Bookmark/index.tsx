import React from 'react';

import { Container, Text } from './styles';

interface Props {
  bold?: boolean;
  children: string;
}
const Bookmark = ({ children, bold }: Props) => {
  return (
    <Container {...{ bold }}>
      <Text {...{ bold }}>{children}</Text>
    </Container>
  );
};

export default Bookmark;
