import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import { normalize } from '@src/utils/normalize';
import { isTablet } from '@src/utils/tablet';

interface GradientProps extends ThemeState {
  width?: number;
  height?: number;
}

export const Gradient = styled(LinearGradient).attrs((props: GradientProps) => ({
  colors: [
    rgba(props.theme.PRIMARY_COLOR, 0),
    rgba(props.theme.PRIMARY_COLOR, isTablet() ? 0.8 : 1),
  ],
}))<GradientProps>`
  ${(props: GradientProps) => `
    width: ${typeof props.width === 'number' ? `${props.width}px` : '100%'}
    height: ${typeof props.height === 'number' ? `${props.height}px` : '100px'}
  `}
  position: absolute;
  bottom: 0;
  z-index: 1;
`;

export const GradientTop = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [props.theme.PRIMARY_COLOR, rgba(props.theme.PRIMARY_COLOR, 0)],
}))<GradientProps>`
  ${(props: GradientProps) => `
    width: ${typeof props.width === 'number' ? `${props.width}px` : '100%'}
    height: ${typeof props.height === 'number' ? `${props.height}px` : '100px'}
  `}
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const Actions = styled.View`
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
  font-size: ${normalize(10, 14)}px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  align-self: center;
  margin-bottom: 50px;
`;

export const LogoWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

type PaginationWrapperProps = {
  tabletLandscape: boolean;
};

export const PaginationWrapper = styled.View`
  ${(props: PaginationWrapperProps) =>
    props.tabletLandscape
      ? `
        position: absolute;
        right: 30px;
        bottom: 250px;
      `
      : `
        align-self: center;
        margin-top: 10px;
      `}
`;

export const PaginationOutside = styled.View`
  width: 100%;
`;

interface PaginationContentProps extends ThemeState {
  visible: boolean;
}

export const PaginationContent = styled.View<PaginationContentProps>`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  ${(props: PaginationContentProps) =>
    props.visible &&
    `
      width: 10px;
      height: 1px;
    `}
  align-self: center;
`;

type PaginationDotType = {
  active: boolean;
  tabletLandscape: boolean;
};

export const PaginationDot = styled.View`
  border-width: 1px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  shadow-color: #000;
  shadow-opacity: 0.5;
  shadow-radius: 2px;
  elevation: 2;
  border-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};

  ${(props: PaginationDotType & ThemeState) => {
    return props.tabletLandscape && props.active
      ? `
        background-color: ${props.theme.PRIMARY_FOREGROUND_COLOR};
      `
      : props.tabletLandscape
      ? `
        background-color: transparent;
      `
      : props.active
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

export const PaginationButtonWrapper = styled.View`
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
  font-size: ${normalize(12, 16)}px;
  margin-left: 15px;
`;

type ImageProps = {
  width?: number;
  height?: number;
};

export const Image = styled.Image<ImageProps>`
  ${(props: ImageProps) => `
    width: ${typeof props.width === 'number' ? `${props.width}px` : '100%'};
    height: ${typeof props.height === 'number' ? `${props.height}px` : '100%'};
  `}
`;

export const TTImage = styled.Image`
  position: absolute;
`;

export const ImageWrapper = styled.View``;

export const Wrapper = styled.View`
  flex: 1;
`;
