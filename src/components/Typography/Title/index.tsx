import React from 'react';

import { Container, TitleComponent } from './styles';

interface Props {
  children: any;
}

const Title = ({ children }: Props) => {
  return (
    <Container>
      <TitleComponent>{children}</TitleComponent>
    </Container>
  );
};

export default Title;
