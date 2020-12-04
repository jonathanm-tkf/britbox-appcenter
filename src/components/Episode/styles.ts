import styled from 'styled-components/native';
import TouchableScaleC from 'react-native-touchable-scale';
import { ThemeState } from '@store/modules/theme/types';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import RNProgressBar from 'react-native-progress/Bar';
import { normalize } from '@src/utils/normalize';

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  padding-bottom: 20px;
`;

export const TouchableScale = styled(TouchableScaleC)`
  width: 100%;
`;

export const CustomShadow = styled.View`
  shadow-color: #000;
  shadow-opacity: 0.8;
  shadow-offset: 0px 8px;
  shadow-radius: 10px;
  elevation: ${Platform.OS === 'ios' ? 1 : 5};
  margin-right: 10px;
`;

export const Gradient = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  width: 100%;
  height: 100px;
  margin-bottom: -3px;
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

export const ImageWrapper = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.View`
  justify-content: flex-end;
  overflow: hidden;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ProgressBar = styled(RNProgressBar).attrs((props: ThemeState) => ({
  color: props.theme.SECONDARY_COLOR_LIGHT,
  borderWidth: 0,
  borderRadius: 0,
  unfilledColor: rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.1),
  height: 3,
}))``;

export const SummaryText = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_LIGHT};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${normalize(9, 12)}px;
  line-height: ${normalize(12, 16)}px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  margin-bottom: 2px;
  font-size: ${normalize(11, 14)}px;
  line-height: ${normalize(21, 24)}px;
  flex-shrink: 1;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  opacity: 0.5;
  font-size: ${normalize(10, 12)}px;
  margin-top: 2px;
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

export const TextWrapper = styled.View`
  justify-content: center;
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
`;

export const WrapperBookmarks = styled.View`
  flex-direction: row;
`;

type TemporaryWrapperProps = {
  type?: 'row' | 'column';
};

export const TemporaryWrapper = styled.View`
  flex-direction: row;
  ${(props: TemporaryWrapperProps & ThemeState) => {
    return (
      props.type === 'column' &&
      `
      flex-direction: column;
    `
    );
  }};
`;

type TemporaryRowProps = {
  width?: number;
  height?: number;
};

export const TemporaryRow = styled.View`
  border-radius: 4px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  margin-bottom: 5px;
  height: 20px;
  width: 100%;
  margin-right: 10px;
  ${(props: TemporaryRowProps & ThemeState) => {
    return (
      props.width &&
      `
      width: ${props.width}px;
    `
    );
  }};
  ${(props: TemporaryRowProps & ThemeState) => {
    return (
      props.height &&
      `
      height: ${props.height}px;
    `
    );
  }};
`;
