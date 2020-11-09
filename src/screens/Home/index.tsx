import React from 'react';
import { View } from 'react-native';
import Header from '@components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { getTemplate } from '@src/utils/template';
import {
  New,
  Episodes,
  LargeProgramming,
  TitleTreatment,
  Popular,
  Standard,
  Genre,
  Collections,
  Hero,
} from '@screens/Shared';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';

import { navigateByPath } from '@src/navigation/rootNavigation';
import { watchlistToggleRequest } from '@store/modules/user/actions';
import ContinueWatching from '@screens/Shared/ContinueWatching';
import { autoPlayOn } from '@store/modules/layout/actions';
import StickyHeader from '@components/StickyHeader';

const wrapper = {
  flex: 1,
};

const Home = () => {
  return (
    <View style={wrapper}>
      <Item />
    </View>
  );
};

type WatchlistToggleRequest = MassiveSDKModelItemSummary & {
  isInWatchlist: boolean;
};

const headerStyles = {};

const Item = () => {
  const dispatch = useDispatch();

  const modal = (item: MassiveSDKModelItemSummary) => {
    if (item.type !== 'link') {
      dispatch(autoPlayOn());
    }
    return navigateByPath(item, item.type !== 'link');
  };
  const home = useSelector((state: AppState) => state.home.data);

  const heroDiscoverMore = (item: any) => {
    navigateByPath(item);
  };

  const onWatchlist = (item: WatchlistToggleRequest, isInWatchlist: boolean) => {
    dispatch(
      watchlistToggleRequest({
        itemId: item.type === 'season' ? item?.showId || '0' : item?.id || '0',
        itemCustomId: item?.customId || '0',
        isInWatchlist,
      })
    );
  };

  return (
    <StickyHeader header={() => <Header style={headerStyles} />}>
      {home &&
        home.entries &&
        home.entries.map((item, key) => {
          if (
            (item?.list?.items || []).length === 0 &&
            getTemplate(item.template || '') !== 'user-watching'
          ) {
            return null;
          }
          switch (getTemplate(item.template || '')) {
            case 'hero':
              return (
                <Hero
                  key={key.toString()}
                  {...{ item }}
                  onWatchlist={(i: MassiveSDKModelItemSummary, isInWatchList: boolean) =>
                    onWatchlist(i, isInWatchList)
                  }
                  onPlay={(i: MassiveSDKModelItemSummary) => modal(i)}
                  onDiscoverMore={(i) => heroDiscoverMore(i)}
                />
              );
            case 'user-watching':
              return <ContinueWatching key={key.toString()} />;
            case 'new':
              return <New key={key.toString()} {...{ item }} />;
            case 'episodes':
              return <Episodes key={key.toString()} {...{ item }} />;
            case 'large-programing':
              return <LargeProgramming key={key.toString()} {...{ item }} />;
            case 'title-treatment':
              return <TitleTreatment key={key.toString()} {...{ item }} />;
            case 'popular':
              return <Popular key={key.toString()} {...{ item }} />;
            case 'standard':
              return <Standard key={key.toString()} {...{ item }} />;
            case 'genre':
              return <Genre key={key.toString()} {...{ item }} />;
            case 'collections':
              return <Collections key={key.toString()} {...{ item }} />;
            default:
              return null;
          }
        })}
    </StickyHeader>
  );
};

export default Home;
