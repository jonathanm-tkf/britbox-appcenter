import { normalize } from '@src/utils/normalize';
import { ThemeState } from '@store/modules/theme/types';
import styled from 'styled-components/native';

export const Container = styled.View``;

type WrapperProps = {
  isGrid: boolean;
};

export const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 1;
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 8px;
  border-bottom-left-radius: 0px;
  ${(props: WrapperProps & ThemeState) => {
    return (
      props.isGrid &&
      `
      width: 100%;
      padding-left: 0px;
      padding-right: 0px;
      border-bottom-right-radius: 0px;
    `
    );
  }};
`;

export const BadgeText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${normalize(7, 9)}px;
  text-transform: uppercase;
`;
