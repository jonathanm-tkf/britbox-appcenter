import { ThemeState } from '@store/modules/theme/types';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const PreloadTabs = styled.View`
  width: 100%;
  height: 250px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const TabsWrapper = styled.View`
  margin-top: 20px;
`;

export const WrapperButtons = styled.View`
  margin-top: 20px;
`;

export const WrapperBottomContent = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  padding: 16px;
  width: 100%;
`;
