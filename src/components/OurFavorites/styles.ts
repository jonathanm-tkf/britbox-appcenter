import styled from 'styled-components/native';
import CardC from '@components/Card';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
  padding-top: 60px;
`;

export const BackgroundImge = styled.ImageBackground.attrs({
  blurRadius: 10,
  resizeMode: 'cover',
})`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  top: 40px;
  z-index: -1;
`;

export const Card = styled(CardC)`
  margin-top: -60px;
`;

type WrapperProps = {
  loading: boolean;
};

export const Wrapper = styled.View`
  /* flex-direction: row; */
  padding: 0 5%;
  margin-top: -20px;
  width: 100%;
  ${(props: WrapperProps) => {
    return (
      !props.loading &&
      `
      min-height: 220px;
    `
    );
  }};
`;

export const InnerContent = styled.View`
  width: 100%;
  margin-bottom: 60px;
`;

export const TextWrapper = styled.View`
  margin-bottom: 35px;
`;
