import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';

export const Gradient = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  z-index: 1;
`;

export const GradientTop = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [props.theme.PRIMARY_COLOR, rgba(props.theme.PRIMARY_COLOR, 0)],
}))`
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const Actions = styled.View`
  /* position: absolute; */
  /* width: 100%; */
  /* bottom: -50px; */
  margin-top: -20px;
  z-index: 2;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

type ActionButtonProps = {
  link?: boolean;
};

export const ActionButton = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;

  ${(props: ActionButtonProps) => {
    return (
      props.link &&
      `
      min-height: 150px;
    `
    );
  }};
`;

export const ActionText = styled.Text`
  font-size: 14px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  align-self: center;
  margin-bottom: 50px;
`;

export const LogoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const PaginationWrapper = styled.View`
  align-self: center;
`;

export const PaginationOutside = styled.View`
  width: 100%;
`;

export const PaginationContent = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  margin-left: 16px;
  margin-right: 16px;
  height: 1px;
  position: absolute;
  left: 0;
  right: 0;
  top: 4px;
`;

type PaginationDotType = {
  active: boolean;
};

export const PaginationDot = styled.View`
  border-width: 1px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-left: 8px;
  margin-right: 8px;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};

  ${(props: PaginationDotType & ThemeState) => {
    return props.active
      ? `
      background-color: ${props.theme.PRIMARY_FOREGROUND_COLOR};
    `
      : `
      background-color: ${props.theme.PRIMARY_COLOR};
    `;
  }};
`;

export const PaginationDotsWrapper = styled.View`
  flex-direction: row;
`;

export const PaginationButton = styled.TouchableWithoutFeedback``;

export const WrapperButton = styled.TouchableWithoutFeedback``;

export const SpaceLink = styled.View`
  width: 32px;
  height: 32px;
`;

export const DiscoverMoreText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 16px;
  margin-left: 15px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ImageWrapper = styled.View``;

export const Wrapper = styled.View``;
