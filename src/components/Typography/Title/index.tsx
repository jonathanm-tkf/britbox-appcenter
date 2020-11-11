import React from 'react';

import { Container, TitleComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
  style?: any;
}

const Title = ({ children, fontSize, lineHeight, style, ...rest }: Props) => {
  return (
    <Container>
      <TitleComponent {...{ fontSize, lineHeight, style, rest }}>{children}</TitleComponent>
    </Container>
  );
};

export default Title;
