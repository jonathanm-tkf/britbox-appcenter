import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { ThemeState } from '@store/modules/theme/types';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${Platform.OS === 'android' ? 15 : 0}px;
`;

export const GettingInformation = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${getBottomSpace() + 20}px;
`;

export const GettingInformationText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(9, 12)}px;
  margin-top: 5px;
`;
