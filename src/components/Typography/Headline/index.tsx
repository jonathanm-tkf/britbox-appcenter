import React from 'react';

import { Container, HeadlineComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
  center?: boolean;
}

const Header = ({ children, fontSize, lineHeight, center }: Props) => {
  return (
    <Container>
      <HeadlineComponent {...{ fontSize, lineHeight, center }}>{children}</HeadlineComponent>
    </Container>
  );
};

export default Header;
