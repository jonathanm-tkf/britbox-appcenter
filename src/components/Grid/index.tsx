import React, { useCallback } from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { LogBox, ImageStyle, ViewStyle, FlatList } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Row } from '@components/Layout';
import { withTheme } from 'styled-components';
import { ThemeProps } from '@store/modules/theme/types';
import { Container, Card, Headline, TitleWrapper, FilterWrapper } from './styles';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

type WALLPAPER = 'wallpaper';
type POSTER = 'poster';
type HERO3X1 = 'hero3x1';
type SQUARE = 'square';

type Props = {
  data: MassiveSDKModelItemList[];
  containerStyles?: ViewStyle;
  listStyles?: ViewStyle;
  element: ImageStyle;
  imageType?: WALLPAPER | POSTER | HERO3X1 | SQUARE;
  onPress?: (item: MassiveSDKModelItemList) => void;
  title?: string;
  spacing?: number;
  numColumns?: number;
  cardContent?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  cardContentAfter?: (item: MassiveSDKModelItemList) => JSX.Element | null;
  isEpisode: boolean;
  filter?: () => JSX.Element | null;
  readonly theme: ThemeProps;
};

type Episode = {
  type?: string;
  showTitle?: string;
  episodeNumber?: string;
  contextualTitle?: string;
};

const Grid = ({
  data,
  element,
  imageType,
  containerStyles,
  listStyles,
  onPress,
  title,
  numColumns = 1,
  cardContent,
  cardContentAfter,
  isEpisode,
  filter,
  theme,
}: Props) => {
  const getImageResult = useCallback((item: MassiveSDKModelItemList) => {
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
  }, []);

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
            <TitleWrapper>
              <Headline lineHeight={30}>{title}</Headline>
              <FilterWrapper>{filter && filter()}</FilterWrapper>
            </TitleWrapper>
          )}
        </Row>
      )}
      <Container style={containerStyles}>
        <FlatList
          data={data}
          scrollEnabled={false}
          listKey={Math.random().toString()}
          numColumns={numColumns}
          keyExtractor={(_, index) => index.toString()}
          style={listStyles}
          renderItem={({ item }) => {
            return isEpisode ? (
              <Card
                isEpisode
                url={getImageResult(item)}
                onPress={() => (onPress ? onPress(item) : {})}
                resizeMode="cover"
                cardElement={item}
                data={{
                  title:
                    item.type === 'episode'
                      ? (item as Episode)?.showTitle || ''
                      : item?.contextualTitle || '',
                  description:
                    item.type === 'episode' ? `Episode ${(item as Episode)?.episodeNumber}` : ``,
                }}
                {...{ element }}
              />
            ) : (
              <Card
                isGrid
                url={getImageResult(item)}
                onPress={() => (onPress ? onPress(item) : {})}
                cardContent={(card) => (cardContent ? cardContent(card) : null)}
                cardContentAfter={(card) => (cardContentAfter ? cardContentAfter(card) : null)}
                cardElement={item}
                {...{ element }}
              />
            );
          }}
        />
      </Container>
    </>
  );
};

export default withTheme(Grid);
