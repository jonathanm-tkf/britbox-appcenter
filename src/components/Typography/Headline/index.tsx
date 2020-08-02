import React from 'react';

import { Container, HeadlineComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
}

const Header = ({ children, fontSize, lineHeight }: Props) => {
  return (
    <Container>
      <HeadlineComponent {...{ fontSize, lineHeight }}>{children}</HeadlineComponent>
    </Container>
  );
};

export default Header;
