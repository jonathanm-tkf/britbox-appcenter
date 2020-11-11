import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

export const ModalCenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalView = styled.View`
  width: 90%;
  max-height: 95%;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const CloseModalButton = styled.TouchableOpacity`
  padding-right: 20px;
  align-self: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const EmptyView = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;
