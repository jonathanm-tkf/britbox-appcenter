import React from 'react';

import { Container, LottieAnimation } from './styles';

interface Props {
  autoPlay: boolean;
  loop: boolean;
  width?: number;
  height?: number;
  isContinue?: boolean;
  isTrailer?: boolean;
  loading?: boolean;
}

const Action = ({ autoPlay, loop, width, height, isContinue, isTrailer, loading }: Props) => {
  return (
    <Container>
      <LottieAnimation {...{ autoPlay, loop, width, height, isContinue, isTrailer, loading }} />
    </Container>
  );
};

export default Action;
