import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { rgba } from 'polished';
import { Pagination as PaginationC } from 'react-native-snap-carousel';

export const Container = styled.View`
  flex: 1;
  /* width: 100%;
  height: 100%; */
  /* height: 376px; */
  /* margin-bottom: 100px; */
  /* background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR_OPAQUE}; */
`;

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

export const ActionButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const ActionText = styled.Text`
  font-size: 14px;
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
  color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  align-self: center;
  margin-bottom: 50px;
`;

export const LogoWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Slider = styled.View`
  flex: 1;
  /* background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR}; */
`;

export const PaginationWrapper = styled.View`
  align-self: center;
`;

export const PaginationOutside = styled.View`
  width: 100%;
`;

export const PaginationContent = styled.View`
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  margin-left: 35px;
  margin-right: 35px;
  height: 1px;
  position: absolute;
  left: 0;
  right: 0;
  top: 12px;
`;

export const Pagination = styled(PaginationC).attrs((props: ThemeState) => ({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: props.theme.PRIMARY_FOREGROUND_COLOR,
  },
  dotColor: props.theme.PRIMARY_FOREGROUND_COLOR,
  inactiveDotColor: props.theme.PRIMARY_COLOR,
  inactiveDotOpacity: 1,
  inactiveDotScale: 1,
  containerStyle: {
    paddingVertical: 8,
  },
}))``;

export const WrapperButton = styled.TouchableWithoutFeedback``;
