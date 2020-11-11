import React from 'react';
import { MassiveSDKModelPageEntry } from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import NewSlider from '@components/NewSlider';
import { slice } from 'lodash';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { Container } from './styles';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const New = ({ item }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <>
      <Row>
        {item.title === 'loading' ? (
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
          <Headline>{item.title}</Headline>
        )}
      </Row>
      <NewSlider data={slice(item?.list?.items, 0, 20)} />
    </>
  );
};

export default New;
