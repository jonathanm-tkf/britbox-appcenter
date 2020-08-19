import React from 'react';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';

import { getImage } from '@src/utils/images';
import { FlatGrid } from 'react-native-super-grid';
import { YellowBox, ImageStyle } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { Row } from '@components/Layout';
import { Headline } from '@components/Typography';
import { Container, Card } from './styles';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

type Props = {
  data: MassiveSDKModelItemList[];
  element: ImageStyle;
  onPress?: (item: MassiveSDKModelItemList) => void;
  title?: string;
};

const Grid = ({ data, element, onPress, title }: Props) => {
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
      <Container>
        <FlatGrid
          scrollEnabled={false}
          itemDimension={Number(element?.width || 100)}
          spacing={0}
          data={data}
          contentContainerStyle={
            {
              // paddingLeft: 5,
            }
          }
          renderItem={({ item }) => (
            <Card
              // width={element?.width || 100}
              // height={element?.height || 157}
              url={getImage(item?.images?.poster || '', 'poster')}
              onPress={() => (onPress ? onPress(item) : {})}
              {...{ element }}
            />
          )}
        />
      </Container>
    </>
  );
};

export default Grid;
