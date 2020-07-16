import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';

interface ContainerProps {
  width?: number;
  height?: number;
}

export const Container = styled.View`
  width: ${(props: ContainerProps) => props.width || 162}px;
  height: ${(props: ContainerProps) => props.height || 243}px;
  border-radius: 8px;
`;

export const Wrapper = styled.View`
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 30px;
  width: ${(props: ContainerProps) => props.width || 162}px;
`;

export const CustomShadow = styled.View`
  flex: 1;
  shadow-color: #000;
  shadow-offset: 0px 15px;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE};
  shadow-opacity: 0.8;
  shadow-radius: 15px;
  elevation: 3;
  border-radius: 8px;
`;

export const Gradient = styled(LinearGradient).attrs((props: ThemeState) => ({
  colors: [rgba(props.theme.PRIMARY_COLOR, 0), props.theme.PRIMARY_COLOR],
}))`
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  z-index: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const TextWrapper = styled.View`
  align-self: flex-start;
  padding-left: 10px;
  padding-right: 10px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  margin-top: 15px;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 24px;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  opacity: 0.5;
  font-size: 12px;
  margin-top: 2px;
`;

export const ActionWrapper = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-right: 10px;
  margin-bottom: 5px;
  z-index: 2;
  flex-direction: row;
  align-items: center;
`;

export const ActionText = styled.Text`
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  font-size: 12px;
  line-height: 24px;
  margin-left: -2px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
`;
