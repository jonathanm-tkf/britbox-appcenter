import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import RNProgressBar from 'react-native-progress/Bar';
import TouchableScaleC from 'react-native-touchable-scale';
import { Platform } from 'react-native';
import { normalize } from '@src/utils/normalize';
import { isTablet } from '@src/utils/tablet';

interface ContainerProps {
  width?: number;
  height?: number;
}

export const Container = styled.View`
  width: ${(props: ContainerProps) => props.width || 162}px;
  height: ${(props: ContainerProps) => props.height || 243}px;
  border-radius: 8px;
`;

interface WrapperProps {
  isDetail?: boolean;
}

export const Wrapper = styled.View`
  align-items: center;
  justify-content: space-between;
  width: ${(props: ContainerProps) => props.width || 162}px;
  ${(props: WrapperProps & ContainerProps) => {
    return (
      props.isDetail &&
      `
      flex-direction: row;
      width: 100%;
    `
    );
  }};
`;

export const CustomShadow = styled.View`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-offset: 0px 8px;
  shadow-radius: 10px;
  elevation: ${Platform.OS === 'ios' ? 1 : 0};
  border-radius: 8px;
`;

export const Gradient = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: -1px;
  z-index: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

interface TextWrapperProps {
  isDetail?: boolean;
  isEpisode?: boolean;
  isWatchlist?: boolean;
  loaded?: boolean;
  category?: boolean;
}

export const TextWrapper = styled.View`
  align-self: flex-start;
  width: 100%;
  margin-top: 15px;
  height: auto;
  ${(props: TextWrapperProps) => {
    return props.isDetail
      ? `
      margin-top: 0;
      padding-left: 15px;
      padding-right: 15px;
      height: 80px;
    `
      : `
      padding-left: 10px;
      padding-right: 10px;
    `;
  }};
  ${(props: TextWrapperProps) => {
    return (
      (props.category || props.isEpisode) &&
      `
      height: 90px;
    `
    );
  }};
  ${(props: TextWrapperProps) => {
    return (
      !props.category &&
      `
      height: auto;
    `
    );
  }};
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  margin-bottom: 2px;
  font-size: ${normalize(11, 14)}px;
  line-height: ${normalize(21, 24)}px;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  opacity: 0.5;
  font-size: ${normalize(10, 12)}px;
  margin-top: 2px;
`;

export const ActionWrapper = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-right: 10px;
  margin-bottom: 10px;
  z-index: 2;
  flex-direction: row;
  align-items: center;
`;

export const ActionText = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  font-size: ${normalize(8, 12)}px;
  line-height: ${normalize(22, 26)}px;
  margin-left: 2px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;

export const WrapperBookmarks = styled.View`
  flex-direction: row;
`;

interface BottomWrapperProps {
  isContinue: boolean;
  isDetail?: boolean;
  isWatchlist?: boolean;
  showCategory?: boolean;
}

export const BottomWrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props: BottomWrapperProps) =>
    !props.isContinue ? 'center' : 'space-between'};
  width: 100%;
  ${(props: BottomWrapperProps) => {
    return (
      (props.isDetail || props.showCategory) &&
      `
      justify-content: flex-start;
    `
    );
  }};
  ${(props: BottomWrapperProps) => {
    return (
      props.isWatchlist &&
      `
      justify-content: center;
    `
    );
  }};
`;

interface GroupProps {
  isDetail: boolean;
  showCategory: boolean;
}

export const Group = styled.View`
  width: 100%;
  ${(props: GroupProps) => {
    return props.isDetail || props.showCategory ? `flex: 1;` : `flex-direction: column`;
  }};
`;

export const ProgressBar = styled(RNProgressBar).attrs((props: ThemeState) => ({
  color: props.theme.SECONDARY_COLOR_LIGHT,
  borderWidth: 0,
  borderRadius: 0,
  unfilledColor: rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.1),
  height: 3,
}))`
  z-index: 2;
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  margin-bottom: -${isTablet() ? 13 : 10}px;
`;

export const ImageWrapper = styled.View`
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const SummaryText = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(9, 12)}px;
  line-height: ${normalize(12, 16)}px;
  margin-top: 15px;
`;

export const AllWrapper = styled.View``;

export const LogoWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

type Toucheable = {
  isDetail?: boolean;
};

export const TouchableScale = styled(TouchableScaleC)`
  ${(props: Toucheable) => {
    return (
      props.isDetail &&
      `
     width: 100%;
     margin-bottom: 20px;
    `
    );
  }};
`;

type Bagge = {
  isGrid: boolean;
};

export const Badge = styled.View`
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
  border-bottom-right-radius: 8px;
  ${(props: Bagge & ThemeState) => {
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

export const TemporaryWrapper = styled.View``;

export const TemporaryRow = styled.View`
  border-radius: 4px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  margin-bottom: 5px;
  height: 20px;
  width: 100%;
`;
