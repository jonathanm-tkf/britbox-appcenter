/* eslint-disable @typescript-eslint/no-shadow */
import { ContinueWatching, Play, Loading, Trailer } from '@assets/icons';
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
  animated?: boolean;
}

const Action = ({
  autoPlay,
  loop,
  width,
  height,
  isContinue,
  isTrailer,
  loading,
  animated,
}: Props) => {
  // source: props.loading ? Load : props.isTrailer ? Trailer : props.isContinue ? Continue : Play,
  const Icon = ({ width, height }: { width: number; height: number }) =>
    animated ? (
      <LottieAnimation {...{ autoPlay, loop, width, height, isContinue, isTrailer, loading }} />
    ) : loading ? (
      <Loading {...{ width: width - 20, height: height - 20 }} />
    ) : isTrailer ? (
      <Trailer {...{ width: width - 20, height: height - 20 }} />
    ) : isContinue ? (
      <ContinueWatching {...{ width: width - 20, height: height - 20 }} />
    ) : (
      <Play {...{ width: width - 20, height: height - 20 }} />
    );
  return (
    <Container>
      <Icon {...{ width: width || 32, height: height || 32 }} />
    </Container>
  );
};

export default Action;
