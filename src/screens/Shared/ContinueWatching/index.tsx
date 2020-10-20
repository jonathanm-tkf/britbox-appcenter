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
import { autoPlayOn, sheetComponent, showSheetBottom } from '@store/modules/layout/actions';
import { pickBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { Button } from '@components/Button';

import { store } from '@store/index';
import { LayoutState } from '@store/modules/layout/types';
import { continueWatchingRemoveRequest, watchlistToggleRequest } from '@store/modules/user/actions';
import { hideSheet, showSheet } from '@src/utils/sheetBottom';
import { useIsFocused } from '@react-navigation/native';
import { BottomSheetWrapper, Headline } from './styles';

const getItemId = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.data?.itemId || '0';
};

const getCustomId = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.data?.customId || '0';
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
  const [tabActive, setTabActive] = useState(0);

  const isFocused = useIsFocused();

  const getCategories = (itemData: MassiveSDKModelEpisodesItem): any[] => {
    const dataResult = [];
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

  const isContinueWatching = (item: MassiveSDKModelEpisodesItem) => {
    const filter = pickBy(watched, (value, key) => key.startsWith(item?.id || ''));
    return filter[item?.id || ''];
  };

  const getActionText = (item: any) => {
    return item.duration
      ? getPositionWatched(item)
        ? `${Math.round(
            (parseInt(item.duration, 10) - parseInt(getPositionWatched(item), 10)) / 60
          )} min left`
        : t('playnow')
      : t('continue');
  };

  const getContinueWatchingData = () => {
    return (watchedList?.items || []).map((item: any) => {
      return {
        url: getImage(item?.images?.wallpaper || '', 'wallpaper'),
        data: {
          title:
            item.type === 'program' || item.type === 'movie' || item.type === 'show'
              ? item?.contextualTitle
              : item?.showTitle,
          description:
            item.type === 'episode'
              ? `${item.seasonTitle}・${item.episodeName}`
              : item.type.toUpperCase(),
          actionText: getActionText(item),
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
    hideSheet();
  };

  const removeItemWatchlist = () => {
    dispatch(
      watchlistToggleRequest({
        itemId: getItemId(),
        itemCustomId: getCustomId(),
        isInWatchlist: true,
      })
    );
    hideSheet();
  };

  const renderBottomContentContinueWatching = () => (
    <BottomSheetWrapper>
      <Headline center color={theme.PRIMARY_COLOR} fontSize={20} lineHeight={32}>
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
          hideSheet();
        }}
      >
        {t('home:remove.button.cancel')}
      </Button>
    </BottomSheetWrapper>
  );

  const renderBottomContentWatchlist = () => (
    <BottomSheetWrapper>
      <Headline center color={theme.PRIMARY_COLOR} fontSize={20} lineHeight={32}>
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
          hideSheet();
        }}
      >
        {t('watchlist:remove.button.cancel')}
      </Button>
    </BottomSheetWrapper>
  );

  const showSheetBottomContent = (item: MassiveSDKModelItemSummary) => {
    dispatch(sheetComponent(340, () => renderBottomContentContinueWatching()));
    dispatch(showSheetBottom({ itemId: item?.id || '0', customId: item?.customId || '0' }));
    showSheet();
  };

  const showSheetBottomContentWatchlist = (item: MassiveSDKModelItemSummary) => {
    dispatch(sheetComponent(300, () => renderBottomContentWatchlist()));
    dispatch(showSheetBottom({ itemId: item?.id || '0', customId: item?.customId || '0' }));
    showSheet();
  };

  const getProgress = (item: MassiveSDKModelEpisodesItem) => {
    const filter = pickBy(watched, (value, key) => key.startsWith(item?.id || ''));

    if (filter[item?.id || '']) {
      const { isFullyWatched, position } = filter[item?.id || ''];

      if (isFullyWatched) {
        return 1;
      }
      return Math.round((Number(position || 0) * 100) / Number(item.duration)) / 100;
    }

    return 0;
  };

  useEffect(() => {
    const continueWatchingItemsElements = [];
    if ((watchedList?.items || []).length > 0) {
      continueWatchingItemsElements.push({
        key: 0,
        label: 'Continue Watching',
        content: () => (
          <Carousel
            items={getContinueWatchingData()}
            listProps={{ horizontal: true }}
            renderItem={({ item: card }) => (
              <Card
                isContinue={isContinueWatching(card.original)}
                newEpisode
                showCategory
                showProgress
                progress={getProgress(card.original)}
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

    if ((bookmarkList?.items || []).length > 0) {
      continueWatchingItemsElements.push({
        key: 1,
        label: 'Watchlist',
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

  useEffect(() => {
    if ((watchedList?.items || []).length === 0) {
      setTabActive(1);
    }
    if ((bookmarkList?.items || []).length === 0) {
      setTabActive(0);
    }
  }, [bookmarkList, watchedList]);

  useEffect(() => {
    if ((watchedList?.items || []).length === 0) {
      setTabActive(1);
    }
    if ((bookmarkList?.items || []).length === 0) {
      setTabActive(0);
    }
  }, [isFocused]);

  return (
    <UserWatching
      active={tabActive}
      data={continueWatchingModule}
      changeTab={(index) => setTabActive(index)}
    />
  );
};

export default ContinueWatching;
