import React from 'react';

import { Container, HeadlineComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
  center?: boolean;
  color?: string;
}

const Header = ({ children, fontSize, lineHeight, center, color }: Props) => {
  return (
    <Container>
      <HeadlineComponent {...{ fontSize, lineHeight, center, color }}>{children}</HeadlineComponent>
    </Container>
  );
};

export default Header;
