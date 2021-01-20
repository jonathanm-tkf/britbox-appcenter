import React from 'react';

import { AppState } from '@store/modules/rootReducer';
import Shimmer from '@components/Shimmer';
import { useSelector } from 'react-redux';
import { Headline, Paragraph } from '@components/Typography';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { LoadDetailPageResponse } from '@store/modules/detail/types';
import { isTablet } from '@src/utils/tablet';
import { Container, PreloadDescription } from './styles';

type Props = {
  data: LoadDetailPageResponse | undefined;
};

const Description = ({ data }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <Container>
      <Shimmer
        visible={!!data?.detail}
        shimmerComponent={() => (
          <PreloadDescription>
            <ContentLoader
              speed={1}
              backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
              foregroundColor={theme.PRIMARY_COLOR}
            >
              <Rect x="0" y="0" rx="8" ry="8" width="50%" height="40" />
              <Rect x="0" y="50" rx="8" ry="8" width="100%" height="20" />
              <Rect x="0" y="80" rx="8" ry="8" width="100%" height="20" />
              <Rect x="0" y="110" rx="8" ry="8" width="100%" height="20" />
            </ContentLoader>
          </PreloadDescription>
        )}
      >
        <Headline lineHeight={isTablet() ? 34 : 26}>{data?.detail.title}</Headline>
        <Paragraph fontSize={isTablet() ? 16 : 12} lineHeight={isTablet() ? 24 : 18}>
          {data?.detail.description}
        </Paragraph>
      </Shimmer>
    </Container>
  );
};

export default Description;
