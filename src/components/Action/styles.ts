/* eslint-disable no-nested-ternary */
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import Play from './animations/play.json';
import Continue from './animations/continue.json';
import Trailer from './animations/trailer.json';

export const Container = styled.View``;

interface LottieViewProps {
  width?: number;
  height?: number;
  isContinue?: boolean;
  isTrailer?: boolean;
}

export const LottieAnimation = styled(LottieView).attrs((props: LottieViewProps) => ({
  source: props.isTrailer ? Trailer : props.isContinue ? Continue : Play,
}))`
  width: ${(props: LottieViewProps) => props.width || 150}px;
  height: ${(props: LottieViewProps) => props.height || 150}px;
`;
