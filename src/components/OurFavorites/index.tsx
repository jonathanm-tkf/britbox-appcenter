import React, { useState } from 'react';

import {
  MassiveSDKModelItemList,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { getImage } from '@src/utils/images';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import ContentLoader, { Rect } from 'react-content-loader/native';
import Shimmer from '@components/Shimmer';
import { Title, Paragraph } from '@components/Typography';
import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';
import { getDimensions } from '@src/utils/dimension';
import { isTablet } from '@src/utils/tablet';
import { Container, BackgroundImge, Card, Wrapper, InnerContent, TextWrapper } from './styles';

const { width } = getDimensions();

type Props = {
  data: MassiveSDKModelItemList;
  onPress: (element: MassiveSDKModelItemSummary) => void;
};

const stylesButton = {
  paddingTop: 24,
  paddingBottom: 24,
};

const OurFavorites = ({ data, onPress }: Props) => {
  const { t } = useTranslation('layout');
  const [loading, setLoading] = useState(false);
  const theme = useSelector((state: AppState) => state.theme.theme);

  const element = (data?.items || []).reduce((item: MassiveSDKModelItemSummary) => item);
  const { description } = (element?.customFields as { description: string }) || {};

  const image = getImage(element.images?.tile || '', 'wallpaper');
  return (
    <Container>
      <Card url={image} width={width - 40} height={vw(50)} />
      <BackgroundImge source={{ uri: image }} onLoad={() => setLoading(true)} />

      <Wrapper {...{ loading }}>
        <Shimmer
          visible={loading}
          shimmerComponent={() => (
            <ContentLoader
              speed={1}
              backgroundColor={theme.PRIMARY_COLOR_OPAQUE}
              foregroundColor={theme.PRIMARY_COLOR}
            >
              <Rect x="0" y="0" rx="8" ry="8" width="50%" height="40" />
              <Rect x="0" y="50" rx="8" ry="8" width="100%" height="15" />
              <Rect x="0" y="70" rx="8" ry="8" width="100%" height="15" />
              <Rect x="0" y="90" rx="8" ry="8" width="80%" height="15" />
              <Rect x="0" y="120" rx="8" ry="8" width="100%" height="73" />
            </ContentLoader>
          )}
        >
          <InnerContent>
            <TextWrapper>
              <Title fontSize={isTablet() ? 24 : 18} lineHeight={isTablet() ? 38 : 30}>
                {element.contextualTitle || ''}
              </Title>
              {description && (
                <Paragraph fontSize={isTablet() ? 16 : 12} lineHeight={isTablet() ? 24 : 20}>
                  {description}
                </Paragraph>
              )}
            </TextWrapper>
            <Button
              fontWeight="medium"
              stretch
              onPress={() => onPress(element)}
              size="big"
              style={stylesButton}
            >
              {t('watchprogrammes')}
            </Button>
          </InnerContent>
        </Shimmer>
      </Wrapper>
    </Container>
  );
};

export default OurFavorites;
