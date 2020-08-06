import React from 'react';

import { Container, TitleComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
}

const Title = ({ children, fontSize, lineHeight }: Props) => {
  return (
    <Container>
      <TitleComponent {...{ fontSize, lineHeight }}>{children}</TitleComponent>
    </Container>
  );
};

export default Title;
