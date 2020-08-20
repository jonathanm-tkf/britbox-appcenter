import React from 'react';

import {
  MassiveSDKModelItemList,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';
import OurFavoritesC from '@components/OurFavorites';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { Container } from './styles';

type Props = {
  data: MassiveSDKModelItemList;
};

const OurFavorites = ({ data }: Props) => {
  const goToOtherContent = (element: MassiveSDKModelItemSummary) => {
    navigateByPath(element);
  };

  return (
    <Container>
      <OurFavoritesC data={data} onPress={(element) => goToOtherContent(element)} />
    </Container>
  );
};

export default OurFavorites;
