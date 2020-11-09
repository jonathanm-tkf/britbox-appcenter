import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

type ContainerProps = {
  isShowMiniController: boolean;
};

export const Container = styled.View`
  padding-top: ${75 + getStatusBarHeight()}px;
  padding-bottom: ${getBottomSpace() + 74}px;
  ${(props: ContainerProps) => {
    return (
      props.isShowMiniController &&
      `
      padding-bottom: ${getBottomSpace() + 90}px;
    `
    );
  }};
`;
