import React from 'react';

import { Container, ParagraphComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
  style?: any;
}

const Title = ({ children, fontSize, lineHeight, style, ...rest }: Props) => {
  return (
    <Container>
      <ParagraphComponent {...{ fontSize, lineHeight, style, rest }}>{children}</ParagraphComponent>
    </Container>
  );
};

export default Title;
