import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { FlatList as RNFlatList } from 'react-native';
import { rgba } from 'polished';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const ContainerList = styled.View`
  padding-top: 30px;
`;

export const CloseButtonWrapper = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const WrapperList = styled.View``;

export const CloseButton = styled.TouchableOpacity`
  align-self: center;
  margin-bottom: 50px;
`;

export const FlatList = styled(RNFlatList).attrs({
  showVerticaScrollIndicator: false,
  contentContainerStyle: {
    // paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 40,
  },
})``;

type ItemText = {
  active: boolean;
};

export const ItemTextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: 24px;
  line-height: 48px;

  ${(props: ItemText & ThemeState) => {
    return props.active ? `opacity: 1; font-size: 28px;` : `opacity: 0.6;`;
  }};
`;

export const Wrapper = styled.View`
  align-items: center;
`;

export const Indicator = styled.View`
  height: 8px;
  width: 8px;
  background-color: ${(props: ThemeState) => props.theme.SECONDARY_COLOR_LIGHT};
  border-radius: 4px;
  position: absolute;
  margin-left: -20px;
`;

export const ListTitle = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY_MEDIUM};
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.Text`
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  color: ${(props: ThemeState) => rgba(props.theme.PRIMARY_FOREGROUND_COLOR, 0.6)};
  font-size: 14px;
  text-align: center;
  padding-top: 20px;
`;
