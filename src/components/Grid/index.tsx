import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';

import { getImage } from '@src/utils/images';
import { FlatGrid } from 'react-native-super-grid';
import { YellowBox, ImageStyle, ViewStyle } from 'react-native';
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
};

const Grid = ({ data, element, imageType, containerStyle, onPress, title, spacing }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
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
        <FlatGrid
          scrollEnabled={false}
          itemDimension={Number(element?.width || 100)}
          spacing={spacing || 0}
          data={data}
          renderItem={({ item }) => (
            <Card
              url={getImage(
                imageType && item?.images ? item?.images[imageType] : item?.images?.poster || '',
                imageType || 'poster'
              )}
              onPress={() => (onPress ? onPress(item) : {})}
              {...{ element, containerStyle }}
            />
          )}
        />
      </Container>
    </>
  );
};

export default Grid;
