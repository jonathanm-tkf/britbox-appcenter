import styled from 'styled-components/native';
import TouchableScaleC from 'react-native-touchable-scale';
import { ThemeState } from '@store/modules/theme/types';
import { Platform } from 'react-native';

export const Container = styled.View`
  align-content: center;
  justify-content: center;
`;

export const TouchableScale = styled(TouchableScaleC)``;

export const CustomShadow = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-offset: 0px 8px;
  shadow-radius: 10px;
  elevation: ${Platform.OS === 'ios' ? 1 : 5};
`;

export const LogoWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
