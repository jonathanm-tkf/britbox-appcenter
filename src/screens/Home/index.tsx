/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { View, Platform, Linking } from 'react-native';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Header from '@components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { useNavigation } from '@react-navigation/native';
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
import { getItemContent } from '@store/modules/home/saga';
import {
  MassiveSDKModelItemSummary,
  BritboxAPIContentModelsItemsGetItemRelatedListResponse,
} from '@src/sdks/Britbox.API.Content.TS/api';

import { navigateByPath } from '@src/navigation/rootNavigation';
import { watchlistToggleRequest } from '@store/modules/user/actions';
import ContinueWatching from '@screens/Shared/ContinueWatching';
import { Container } from './styles';

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
};

const Home = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const appWokeUp = useCallback(async (url) => {
    if (url) {
      if (Platform.OS === 'ios') {
        const route = url?.split('://');

        if (route && route[1]) {
          const routeName = route[1]?.split('/');

          if (routeName && routeName[0]) {
            if (routeName[0] === 'watch' || routeName[0] === 'open') {
              const response: BritboxAPIContentModelsItemsGetItemRelatedListResponse = await getItemContent(
                routeName[1]
              );

              if (response && response?.externalResponse) {
                const { externalResponse } = response;
                navigateByPath(externalResponse);
              }
            }
          }
        }
      } else {
        const route = url?.split('www.britbox.com');
        if (route[1] && route[1] !== '') {
          if (/\/show\/|\/movie\/|\/season\/|\/episode\//.test(route[1] || '')) {
            navigateByPath({ path: route[1], customId: true });
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    Linking.getInitialURL().then((url: string | null) => {
      if (url) {
        appWokeUp(url);
      }
    });
  }, [appWokeUp]);

  return (
    <View style={wrapper}>
      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={<Header />}
        headerContainerBackgroundColor={theme.PRIMARY_COLOR}
        headerHeight={77}
        data={[0]}
        renderItem={() => <Item />}
        clipHeader
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const keyExtractor = (item: number) => `${item}`;

type WatchlistToggleRequest = MassiveSDKModelItemSummary & {
  isInWatchlist: boolean;
};

const Item = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const modal = (item: MassiveSDKModelItemSummary) => {
    if (item.type === 'movie' || item.type === 'episode') {
      return navigation.navigate('VideoPlayer', { item });
    }
    return navigateByPath(item);
  };
  const home = useSelector((state: AppState) => state.home.data);

  const heroDiscoverMore = (item: any) => {
    navigateByPath(item);
  };

  const onWatchlist = (item: WatchlistToggleRequest, isInWatchlist: boolean) => {
    dispatch(watchlistToggleRequest({ itemId: item?.id || '0', isInWatchlist }));
  };

  return (
    <Container>
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
    </Container>
  );
};

export default Home;
