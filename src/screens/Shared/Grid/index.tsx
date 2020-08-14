import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { useNavigation } from '@react-navigation/native';
import GridC from '@components/Grid';
import Action from '@components/Action';
import { Container, WrapperLoading } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
  title: string | undefined;
  loading?: boolean;
}

const Grid = ({ onLayout, items, title, loading }: Props) => {
  const navigation = useNavigation();

  const goToOtherContent = (item: MassiveSDKModelItemList) => {
    navigation.push('Detail', { item: { ...item } });
  };

  return (
    <Container
      onLayout={(e) => {
        if (onLayout) onLayout(e);
      }}
    >
      <GridC
        data={items}
        element={{ width: 115, height: 157 }}
        onPress={(item) => goToOtherContent(item)}
        title={title}
      />
      {loading && (
        <WrapperLoading>
          <Action autoPlay loop loading width={70} height={70} />
        </WrapperLoading>
      )}
    </Container>
  );
};

export default Grid;
