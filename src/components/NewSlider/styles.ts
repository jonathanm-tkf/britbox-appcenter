import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Slider = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 10px;
`;

export const SlimDescriptionText = styled.Text.attrs({
  numberOfLines: 4,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
  text-align: center;
  min-height: 90px;
  font-size: 14px;
  line-height: 22px;
`;

export const SlimDescription = styled.View`
  height: 250px;
`;
