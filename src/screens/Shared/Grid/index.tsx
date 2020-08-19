import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import GridC from '@components/Grid';
import Action from '@components/Action';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { Container, WrapperLoading } from './styles';

type WALLPAPER = 'wallpaper';
type POSTER = 'poster';
type HERO3X1 = 'hero3x1';
type SQUARE = 'square';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
  title: string | undefined;
  loading?: boolean;
  width?: number;
  height?: number;
  imageType?: WALLPAPER | POSTER | HERO3X1 | SQUARE;
}

const Grid = ({ onLayout, items, title, loading, width, height, imageType }: Props) => {
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
        element={{ width: width || 120, height: height || 157, marginBottom: 5 }}
        onPress={(item) => goToOtherContent(item)}
        spacing={13}
        imageType={imageType}
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
