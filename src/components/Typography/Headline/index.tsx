import React from 'react';

import { Container, HeadlineComponent } from './styles';

interface Props {
  children: any;
}

const Header = ({ children }: Props) => {
  return (
    <Container>
      <HeadlineComponent>{children}</HeadlineComponent>
    </Container>
  );
};

export default Header;
