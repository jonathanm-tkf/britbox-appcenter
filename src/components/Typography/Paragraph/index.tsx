import React from 'react';

import { Container, ParagraphComponent } from './styles';

interface Props {
  children: any;
}

const Title = ({ children }: Props) => {
  return (
    <Container>
      <ParagraphComponent>{children}</ParagraphComponent>
    </Container>
  );
};

export default Title;
