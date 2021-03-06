import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import GridC from '@components/Grid';
import Action from '@components/Action';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { ImageStyle, ViewStyle } from 'react-native';
import { Container, WrapperLoading } from './styles';

type WALLPAPER = 'wallpaper';
type POSTER = 'poster';
type HERO3X1 = 'hero3x1';
type SQUARE = 'square';
type TILE = 'square';

interface Props {
  onLayout?: (event: any) => void;
  items: MassiveSDKModelItemList[];
  title: string | undefined;
  loading?: boolean;
  imageType?: WALLPAPER | POSTER | HERO3X1 | SQUARE | TILE | string[];
  cardContent?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  cardContentAfter?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  numColumns?: number;
  element: ImageStyle;
  containerStyle?: ViewStyle;
  isEpisode?: boolean;
  filter?: () => JSX.Element | null;
}

const Grid = ({
  onLayout,
  items,
  title,
  loading,
  imageType,
  cardContent,
  cardContentAfter,
  numColumns = 1,
  element,
  containerStyle,
  isEpisode,
  filter,
}: Props) => {
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
        numColumns={numColumns}
        {...{ element, imageType, isEpisode, filter }}
        onPress={(item) => goToOtherContent(item)}
        title={title}
        containerStyle={containerStyle}
        cardContent={(item) => (cardContent ? cardContent(item) : null)}
        cardContentAfter={(item) => (cardContentAfter ? cardContentAfter(item) : null)}
      />
      {loading && (
        <WrapperLoading>
          <Action autoPlay loop loading width={70} height={70} animated />
        </WrapperLoading>
      )}
    </Container>
  );
};

export default Grid;
