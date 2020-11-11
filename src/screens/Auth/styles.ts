import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { Button as ButtonC } from '@components/Button';
import { Pagination as PaginationC } from 'react-native-snap-carousel';
import { ThemeState } from '@store/modules/theme/types';
import LinearGradient from 'react-native-linear-gradient';
import { normalize } from '@src/utils/normalize';

export const HeaderWrapper = styled.View`
  width: 100%;
  margin-top: ${`${Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0}px`};
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Button = styled(ButtonC)`
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const PaginationWrapper = styled.View`
  align-self: center;
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

export const Content = styled.View``;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#202634', '#171B23'],
})`
  justify-content: center;
`;

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})``;

export const Paragraph = styled.Text`
  text-align: center;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: ${normalize(10, 16)}px;
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;
