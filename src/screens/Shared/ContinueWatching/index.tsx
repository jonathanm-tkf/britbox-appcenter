/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import UserWatching from '@components/UserWatching';
import Card from '@components/Card';
import Carousel from '@components/Carousel';
import { navigateByPath } from '@src/navigation/rootNavigation';
import {
  MassiveSDKModelEpisodesItem,
  MassiveSDKModelItemSummary,
} from '@src/sdks/Britbox.API.Account.TS/api';
import { getImage } from '@src/utils/images';
import {
  autoPlayOn,
  hideSheetBottom,
  sheetComponent,
  showSheetBottom,
} from '@store/modules/layout/actions';
import { pickBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { Button } from '@components/Button';

import { store } from '@store/index';
import { LayoutState } from '@store/modules/layout/types';
import { continueWatchingRemoveRequest, watchlistToggleRequest } from '@store/modules/user/actions';
import { BottomSheetWrapper, Headline } from './styles';

const getItemId = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.data?.itemId || '0';
};

const getSheetHeight = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.height || 0;
};

type Profile = {
  bookmarkList: any;
  watchedList: any;
  watched: any;
};

const ContinueWatching = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [continueWatchingModule, setContinueWatchingModule] = useState<any[]>([]);
  const { bookmarkList, watchedList, watched } = useSelector(
    (state: AppState) => state.user?.profile || {}
  ) as Profile;
  const { t } = useTranslation('home');

  const getCategories = (itemData: MassiveSDKModelEpisodesItem): any[] => {
    const dataResult = [{}];
    const { classification, customFields } = itemData;
    if (classification) {
      dataResult.push({
        key: 1,
        label: itemData?.classification?.name || '',
        bold: false,
      });
    }
    if (customFields) {
      const { CCFlag: cc, HDFlag: hd } = customFields as { CCFlag: string; HDFlag: string };
      if (JSON.parse((cc || 'False').toLowerCase())) {
        dataResult.push({
          key: 2,
          label: 'cc',
          bold: false,
        });
      }
      if (JSON.parse((hd || 'False').toLowerCase())) {
        dataResult.push({
          key: 3,
          label: 'hd',
          bold: true,
        });
      }
    }
    return dataResult;
  };

  const getPositionWatched = (item: MassiveSDKModelEpisodesItem) => {
    const filter = pickBy(watched, (value, key) => key.startsWith(item?.id || ''));
    if (filter[item?.id || '']) {
      const { position } = filter[item?.id || ''];

      return position;
    }
    return false;
  };

  const getContinueWatchingData = () => {
    return (watchedList?.items || []).map((item: any) => {
      return {
        url: getImage(item?.images?.wallpaper || 'loading', 'wallpaper'),
        data: {
          title:
            item.type === 'program' || item.type === 'movie' || item.type === 'show'
              ? item?.contextualTitle
              : item?.showTitle,
          description:
            item.type === 'episode'
              ? `${item.seasonTitle}・${item.episodeName}`
              : item.type.toUpperCase(),
          actionText: item.duration
            ? `${Math.round(
                (parseInt(item.duration, 10) - parseInt(getPositionWatched(item), 10)) / 60
              )} min left`
            : t('continue'),
          category: getCategories(item),
        },
        original: item,
      };
    });
  };

  const getWatchingData = () => {
    return (bookmarkList?.items || []).map((item: any) => {
      return {
        url: getImage(item?.images?.poster || 'loading', 'wallpaper'),
        original: item,
      };
    });
  };

  const goToDetail = (card: any, autoPlay: boolean) => {
    if (autoPlay) {
      dispatch(autoPlayOn());
    }
    navigateByPath(card, autoPlay);
  };

  const removeItemContinueWatching = () => {
    dispatch(continueWatchingRemoveRequest({ itemId: getItemId() }));
    dispatch(hideSheetBottom());
  };

  const removeItemWatchlist = () => {
    dispatch(watchlistToggleRequest({ itemId: getItemId(), isInWatchlist: true }));
    dispatch(hideSheetBottom());
  };

  const renderBottomContentContinueWatching = () => (
    <BottomSheetWrapper>
      <Headline center color={theme.PRIMARY_COLOR}>
        {t('home:remove.title')}
      </Headline>
      <Button
        stretch
        size="big"
        fontWeight="medium"
        onPress={() => removeItemContinueWatching()}
        style={{ marginBottom: 20 }}
      >
        {t('home:remove.button.ok')}
      </Button>
      <Button
        outline
        stretch
        size="big"
        fontWeight="medium"
        onPress={() => {
          dispatch(hideSheetBottom());
        }}
      >
        {t('home:remove.button.cancel')}
      </Button>
    </BottomSheetWrapper>
  );

  const renderBottomContentWatchlist = () => (
    <BottomSheetWrapper>
      <Headline center color={theme.PRIMARY_COLOR}>
        {t('watchlist:remove.title')}
      </Headline>
      <Button
        stretch
        size="big"
        fontWeight="medium"
        onPress={() => removeItemWatchlist()}
        style={{ marginBottom: 20 }}
      >
        {t('watchlist:remove.button.ok')}
      </Button>
      <Button
        outline
        stretch
        size="big"
        fontWeight="medium"
        onPress={() => {
          dispatch(hideSheetBottom());
        }}
      >
        {t('watchlist:remove.button.cancel')}
      </Button>
    </BottomSheetWrapper>
  );

  const showSheetBottomContent = (item: MassiveSDKModelItemSummary) => {
    if (getSheetHeight() === 0) {
      dispatch(sheetComponent(300, () => renderBottomContentContinueWatching()));
    }
    dispatch(showSheetBottom({ itemId: item?.id || '0' }));
  };

  const showSheetBottomContentWatchlist = (item: MassiveSDKModelItemSummary) => {
    if (getSheetHeight() === 0) {
      dispatch(sheetComponent(300, () => renderBottomContentWatchlist()));
    }
    dispatch(showSheetBottom({ itemId: item?.id || '0' }));
  };

  useEffect(() => {
    const continueWatchingItemsElements = [];
    if ((bookmarkList?.items || []).length > 0) {
      continueWatchingItemsElements.push({
        key: 0,
        label: 'Continue Watching',
        active: true,
        content: () => (
          <Carousel
            items={getContinueWatchingData()}
            listProps={{ horizontal: true }}
            renderItem={({ item: card }) => (
              <Card
                isContinue
                newEpisode
                width={157}
                height={107}
                url={card.url}
                data={card.data}
                actionText={card?.data?.actionText}
                onPress={() =>
                  (card.original?.list?.title || '') !== 'loading'
                    ? goToDetail(card.original, true)
                    : {}
                }
                onRemove={() => showSheetBottomContent(card.original)}
              />
            )}
          />
        ),
      });
    }

    if ((watchedList?.items || []).length > 0) {
      continueWatchingItemsElements.push({
        key: 1,
        label: 'Watchlist',
        active: false,
        content: () => (
          <Carousel
            items={getWatchingData()}
            listProps={{ horizontal: true }}
            renderItem={({ item: card }) => (
              <Card
                isWatchlist
                width={122}
                height={162}
                url={card.url}
                data={card.data}
                onPress={() =>
                  (card.original?.list?.title || '') !== 'loading'
                    ? goToDetail(card.original, false)
                    : {}
                }
                onRemove={() => showSheetBottomContentWatchlist(card.original)}
              />
            )}
          />
        ),
      });
    }

    setContinueWatchingModule(continueWatchingItemsElements);
  }, [bookmarkList, watchedList]);

  return <UserWatching data={continueWatchingModule} />;
};

export default ContinueWatching;
