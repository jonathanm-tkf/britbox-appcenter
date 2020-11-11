import React from 'react';

import { Container, ParagraphComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
  style?: any;
  color?: string;
}

const Paragraph = ({ children, fontSize, lineHeight, color, style, ...rest }: Props) => {
  return (
    <Container>
      <ParagraphComponent {...{ fontSize, lineHeight, color, style, rest }}>
        {children}
      </ParagraphComponent>
    </Container>
  );
};

export default Paragraph;
