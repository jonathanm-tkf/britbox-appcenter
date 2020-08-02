import React from 'react';

import { Container, ParagraphComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
}

const Title = ({ children, fontSize, lineHeight }: Props) => {
  return (
    <Container>
      <ParagraphComponent {...{ fontSize, lineHeight }}>{children}</ParagraphComponent>
    </Container>
  );
};

export default Title;
