import React from 'react';

import { Container, HeadlineComponent } from './styles';

interface Props {
  children: any;
  fontSize?: number;
  lineHeight?: number;
  center?: boolean;
  color?: string;
  style?: any;
}

const Header = ({ children, fontSize, lineHeight, center, color, style, ...rest }: Props) => {
  return (
    <Container>
      <HeadlineComponent {...{ fontSize, lineHeight, center, color, style, rest }}>
        {children}
      </HeadlineComponent>
    </Container>
  );
};

export default Header;
