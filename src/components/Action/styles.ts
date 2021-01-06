import styled from 'styled-components/native';
/// import LottieView from 'lottie-react-native';
import Play from './animations/play.json';
import Continue from './animations/continue.json';
import Trailer from './animations/trailer.json';
import Load from './animations/load.json';

export const Container = styled.View`
  padding: 10px;
`;
interface LottieViewProps {
  width?: number;
  height?: number;
  isContinue?: boolean;
  isTrailer?: boolean;
  loading?: boolean;
}

/// export const LottieAnimation = styled(LottieView).attrs((props: LottieViewProps) => ({
export const LottieAnimation = styled.View`
  width: ${(props: LottieViewProps) => props.width || 150}px;
  height: ${(props: LottieViewProps) => props.height || 150}px;
`;
