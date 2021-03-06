import React from 'react';
import {
  MassiveSDKModelPageEntry,
  MassiveSDKModelItemSummary,
  MassiveSDKModelItemList,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import { slice } from 'lodash';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import { getImage } from '@src/utils/images';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { Container } from './styles';

type Props = {
  item: MassiveSDKModelPageEntry;
};

const LargeProgramming = ({ item }: Props) => {
  const { t } = useTranslation('home');
  const theme = useSelector((state: AppState) => state.theme.theme);
  const goToDetail = (card: MassiveSDKModelItemList) => {
    navigateByPath(card, card.type === 'episode');
  };

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
      <Carousel
        items={slice(item?.list?.items, 0, 20)}
        listProps={{ horizontal: true }}
        renderItem={({ item: card }: { item: MassiveSDKModelItemSummary }) => (
          <Card
            isEpisode={card.type === 'episode'}
            hasDescription
            width={220}
            height={124}
            url={getImage(
              card.type === 'episode' ? card.images?.wallpaper : card.images?.tile,
              'wallpaper'
            )}
            element={{ marginBottom: 20 }}
            data={{
              // title: card?.title || '',
              // description: card.type === 'movie' ? t('movie') : t('show'),
              title: card.type === 'episode' ? card?.showTitle || '' : card?.title || '',
              description:
                card.type === 'episode'
                  ? `${card.seasonTitle}・${card.episodeName}`
                  : `${card.type === 'movie' ? t('movie') : t('show')}`,
            }}
            onPress={() => ((item?.list?.title || '') !== 'loading' ? goToDetail(card) : {})}
          />
        )}
      />
    </>
  );
};

export default LargeProgramming;
