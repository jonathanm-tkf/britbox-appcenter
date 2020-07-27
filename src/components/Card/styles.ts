import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import RNProgressBar from 'react-native-progress/Bar';

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
  /* padding-bottom: 30px; */
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
  bottom: -1px;
  z-index: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

interface TextWrapperProps {
  isDetail?: boolean;
}

export const TextWrapper = styled.View`
  align-self: flex-start;
  width: 100%;
  height: 70px;
  margin-top: 15px;

  ${(props: TextWrapperProps) => {
    return props.isDetail
      ? `
      margin-top: 0;
      padding-left: 15px;
      padding-right: 15px;
    `
      : `
      padding-left: 10px;
      padding-right: 10px;
    `;
  }};
`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  /* margin-top: 15px; */
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 24px;
  /* padding-left: 10px; */
  /* padding-right: 10px; */
`;

export const Description = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  opacity: 0.5;
  font-size: 12px;
  margin-top: 2px;
  /* padding-left: 10px;
  padding-right: 10px; */
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

export const WrapperBookmarks = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;

interface BottomWrapper {
  isContinue: boolean;
  isDetail?: boolean;
}

export const BottomWrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props: BottomWrapper) => (!props.isContinue ? 'center' : 'space-between')};
  width: 100%;

  ${(props: BottomWrapper) => {
    return (
      props.isDetail &&
      `
      justify-content: flex-start;
      padding-left: 5px;
    `
    );
  }};
`;

interface GroupProps {
  isDetail: boolean;
}

export const Group = styled.View`
  flex-direction: column;
  width: 100%;
  ${(props: GroupProps) => {
    return props.isDetail ? `flex: 1;` : `flex-direction: row`;
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
  width: 100%;
  bottom: 10%;
  margin-bottom: -10px;
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
  font-size: 12px;
  line-height: 16px;
  margin-top: 15px;
`;

export const AllWrapper = styled.View`
  padding-bottom: 30px;
`;

export const LogoWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
