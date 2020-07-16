import React from 'react';

import { Container, LottieAnimation } from './styles';

interface Props {
  autoPlay: boolean;
  loop: boolean;
  width?: number;
  height?: number;
  isContinue?: boolean;
  isTrailer?: boolean;
}

const Action = ({ autoPlay, loop, width, height, isContinue, isTrailer }: Props) => {
  return (
    <Container>
      <LottieAnimation {...{ autoPlay, loop, width, height, isContinue, isTrailer }} />
    </Container>
  );
};

export default Action;
