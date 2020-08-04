import styled from 'styled-components/native';
import { ThemeState } from '@store/modules/theme/types';
import { FlatList as RNFlatList } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: ThemeState) => props.theme.PRIMARY_COLOR};
`;

export const CloseButtonWrapper = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const CloseButton = styled.TouchableOpacity`
  align-self: center;
  margin-bottom: 50px;
`;

export const FlatList = styled(RNFlatList).attrs({
  showVerticaScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
})``;

type SeasonItemText = {
  active: boolean;
};

export const SeasonItemTextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SeasonItemText = styled.Text`
  color: ${(props: ThemeState) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props: ThemeState) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: 24px;
  line-height: 48px;

  ${(props: SeasonItemText & ThemeState) => {
    return props.active ? `opacity: 1; font-size: 28px;` : `opacity: 0.6;`;
  }};
`;

export const SeasonWrapper = styled.View`
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
