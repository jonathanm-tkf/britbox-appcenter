import styled from 'styled-components/native';
import { FlatList as RNFlatList, TouchableOpacity as RNTouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding-top: 12px;
`;

interface FlatProps {
  noPadding: boolean;
}
export const FlatList = styled(RNFlatList).attrs((props: FlatProps) => ({
  contentContainerStyle: {
    paddingLeft: props.noPadding ? 0 : 20,
    paddingRight: props.noPadding ? 0 : 20,
  },
}))``;

export const TouchableOpacity = styled(RNTouchableOpacity)``;

export const ItemSeparator = styled.View`
  width: 10px;
`;
