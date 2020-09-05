import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';

import { getImage } from '@src/utils/images';
import { YellowBox, ImageStyle, ViewStyle, FlatList } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { Row } from '@components/Layout';
import { Headline } from '@components/Typography';
import { Container, Card } from './styles';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

type WALLPAPER = 'wallpaper';
type POSTER = 'poster';
type HERO3X1 = 'hero3x1';
type SQUARE = 'square';

type Props = {
  data: MassiveSDKModelItemList[];
  containerStyle?: ViewStyle;
  element: ImageStyle;
  imageType?: WALLPAPER | POSTER | HERO3X1 | SQUARE;
  onPress?: (item: MassiveSDKModelItemList) => void;
  title?: string;
  spacing?: number;
  numColumns?: number;
  cardContent?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  cardContentAfter?: (item: MassiveSDKModelItemList) => JSX.Element | null;
};

const Grid = ({
  data,
  element,
  imageType,
  containerStyle,
  onPress,
  title,
  numColumns = 1,
  cardContent,
  cardContentAfter,
}: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const getImageResult = (item: MassiveSDKModelItemList): string => {
    if (Array.isArray(imageType)) {
      let find = false;
      let result = 'no-image';

      imageType.forEach((image: string) => {
        if (!find) {
          const imageResult = getImage(
            imageType && item?.images ? item?.images[image] : '',
            image || 'poster'
          );

          if (imageResult !== 'no-image') {
            find = true;
            result = imageResult;
          }
        }
      });
      return result;
    }
    return getImage(
      imageType && item?.images ? item?.images[imageType] : item?.images?.poster || '',
      imageType || 'poster'
    );
  };

  return (
    <>
      {title !== '' && (
        <Row>
          {title === 'loading' ? (
            <Container>
              <ContentLoader
                speed={1}
                backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
                foregroundColor={theme.PRIMARY_COLOR}
              >
                <Rect x="0" y="0" rx="8" ry="8" width="50%" height="40" />
              </ContentLoader>
            </Container>
          ) : (
            <Headline>{title}</Headline>
          )}
        </Row>
      )}
      <Container style={containerStyle}>
        <FlatList
          data={data}
          scrollEnabled={false}
          listKey={Math.random().toString()}
          numColumns={numColumns}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card
              url={getImageResult(item)}
              onPress={() => (onPress ? onPress(item) : {})}
              cardContent={(card) => (cardContent ? cardContent(card) : null)}
              cardContentAfter={(card) => (cardContentAfter ? cardContentAfter(card) : null)}
              cardElement={item}
              {...{ element }}
            />
          )}
        />
      </Container>
    </>
  );
};

export default Grid;
