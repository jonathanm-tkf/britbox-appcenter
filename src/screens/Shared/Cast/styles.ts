import styled from 'styled-components/native';
import { FAB as FABC } from 'react-native-paper';
import { ThemeState } from '@store/modules/theme/types';
// import { CastButton as CastButtonC } from 'react-native-google-cast';

export const Container = styled.View``;

export const FAB = styled(FABC)`
  position: absolute;
  margin: 16px;
  right: 0px;
  bottom: 0px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

// export const CastButton = styled(CastButtonC).attrs((props: ThemeState) => ({
//   tintColor: props.theme.PRIMARY_FOREGROUND_COLOR,
// }))`
//   height: 24px;
//   width: 24px;
// `;
