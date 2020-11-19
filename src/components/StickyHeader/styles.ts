import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

type ContainerProps = {
  isShowMiniController: boolean;
};

export const Container = styled.View`
  padding-top: ${75 + (Platform.OS === 'ios' ? getStatusBarHeight() : 0)}px;
  padding-bottom: ${getBottomSpace() + 50}px;
  ${(props: ContainerProps) => {
    return (
      props.isShowMiniController &&
      `
      padding-bottom: ${getBottomSpace() + 90}px;
    `
    );
  }};
`;
