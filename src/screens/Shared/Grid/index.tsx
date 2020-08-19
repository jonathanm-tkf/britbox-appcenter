import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import GridC from '@components/Grid';
import Action from '@components/Action';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { Container, WrapperLoading } from './styles';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
  title: string | undefined;
  loading?: boolean;
}

const Grid = ({ onLayout, items, title, loading }: Props) => {
  const goToOtherContent = (item: MassiveSDKModelItemList) => {
    navigateByPath(item);
  };

  return (
    <Container
      onLayout={(e) => {
        if (onLayout) onLayout(e);
      }}
    >
      <GridC
        data={items}
        element={{ width: 120, height: 157 }}
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
