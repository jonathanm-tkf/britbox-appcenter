import React from 'react';

import { Container, ParagraphComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
}

const Title = ({ children, fontSize }: Props) => {
  return (
    <Container>
      <ParagraphComponent {...{ fontSize }}>{children}</ParagraphComponent>
    </Container>
  );
};

export default Title;
