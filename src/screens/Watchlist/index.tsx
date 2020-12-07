/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Header from '@components/Header';
import { sheetComponent, showSheetBottom } from '@store/modules/layout/actions';
import { useTranslation } from 'react-i18next';
import { percentageWidth } from '@src/utils/dimension';
import Grid from '@screens/Shared/Grid';
import { CloseIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { store } from '@store/index';
import { LayoutState } from '@store/modules/layout/types';
import { watchlistToggleRequest } from '@store/modules/user/actions';
import { fill, sortBy } from 'lodash';
import { profile } from '@store/modules/user/saga';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Item } from '@screens/ModalFilter';
import { hideSheet, showSheet } from '@src/utils/sheetBottom';
import { isTablet } from 'react-native-device-info';
import { getTextInConfigJSON } from '@src/utils/object';
import {
  Container,
  Title,
  Paragraph,
  GridWrapper,
  RemoveButtonWrapper,
  Headline,
  BottomSheetWrapper,
  FilterButton,
  FilterText,
} from './styles';

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0,
};

const getItemId = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.data?.itemId || '0';
};

const getCustomId = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.data?.customId || '0';
};

const getSheetHeight = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.height || 0;
};

const gridContainer = {
  marginTop: 10,
  paddingHorizontal: isTablet() ? 7 : 15,
};

type Access = {
  accessToken: string;
};

type RootParamList = {
  Watchlist: {
    filter: Item;
  };
};

type WatchlistScreenRouteProp = RouteProp<RootParamList, 'Watchlist'>;

const Watchlist = () => {
  const { params } = useRoute<WatchlistScreenRouteProp>();
  const theme = useSelector((state: AppState) => state.theme.theme);
  const segment = useSelector((state: AppState) => state.core.segment);
  const bookmarkList = useSelector((state: AppState) => state.user?.profile?.bookmarkList);
  const { accessToken: token } = useSelector((state: AppState) => state.user?.access) as Access;
  const dispatch = useDispatch();
  const { t } = useTranslation(['watchlist']);
  const navigation = useNavigation();
  const [type, setType] = useState('all');
  const [orderBy, setOrderBy] = useState('date-added');
  const { filter } = params || {};
  const menu = useSelector((state: AppState) => state.core.menu?.navigation?.header); // TODO: get data from properties

  const [list, setList] = useState<MassiveSDKModelItemSummary[]>([]);

  const getProfile = async () => {
    const { response } = await profile(token, segment);
    setList(response?.bookmarkList?.items || []);
  };

  useEffect(() => {
    const dataDummy = {
      items: fill(new Array((bookmarkList?.items || []).length), {
        images: {
          poster: 'loading',
        },
      }),
    };

    setList(dataDummy.items);

    getProfile();
  }, []);

  useEffect(() => {
    let items = bookmarkList?.items || [];

    if (type !== 'all') {
      if (type === 'show') {
        items = items.filter((item) => item.type === 'show' || item.type === 'season');
      } else {
        items = items.filter((item) => item.type === type);
      }
    }

    if (orderBy !== 'date-added') {
      items = sortBy(items, ['contextualTitle'], ['asc']);
    }

    setList(items);
  }, [bookmarkList, type, orderBy]);

  useEffect(() => {
    if (filter) {
      if (filter.list === 'type') {
        setType(filter.value);
      }

      if (filter.list === 'order') {
        setOrderBy(filter.value);
      }
    }
  }, [filter]);

  const showSheetBottomContent = (item: MassiveSDKModelItemSummary) => {
    if (getSheetHeight() === 0) {
      dispatch(sheetComponent(300, () => renderBottomContent()));
    }
    dispatch(
      showSheetBottom({ itemId: item.type === 'season' ? item?.showId || '0' : item?.id || '0' })
    );
    showSheet();
  };

  const removeIcon = (item: MassiveSDKModelItemSummary) => {
    return (
      <RemoveButtonWrapper>
        <TouchableOpacity onPress={() => showSheetBottomContent(item)}>
          <CloseIcon width={30} height={30} />
        </TouchableOpacity>
      </RemoveButtonWrapper>
    );
  };

  const removeItem = () => {
    dispatch(
      watchlistToggleRequest({
        itemId: getItemId(),
        itemCustomId: getCustomId(),
        isInWatchlist: true,
      })
    );
    hideSheet();
  };

  const renderContent = () => {
    return (
      <>
        <Container>
          <Title>{t('title')}</Title>
          <Paragraph>{getTextInConfigJSON(['watchlist', 'message'], '')}</Paragraph>
        </Container>
        <GridWrapper>
          <FilterButton
            onPress={() =>
              navigation.navigate('ModalFilter', {
                // title: t('filter'),
                data: [
                  {
                    // title: t('type'),
                    list: 'type',
                    data: [
                      {
                        title: t('all'),
                        value: 'all',
                        selected: type === 'all',
                        numColumns: 3,
                      },
                      {
                        title: t('movie'),
                        value: 'movie',
                        selected: type === 'movie',
                        numColumns: 3,
                      },
                      {
                        title: t('show'),
                        value: 'show',
                        selected: type === 'show',
                        numColumns: 3,
                      },
                    ],
                  },
                  {
                    // title: t('order'),
                    list: 'order',
                    data: [
                      {
                        title: t('recent'),
                        value: 'date-added',
                        selected: orderBy === 'date-added',
                        numColumns: 3,
                      },
                      {
                        title: t('az'),
                        value: 'a-z',
                        selected: orderBy === 'a-z',
                        numColumns: 3,
                      },
                    ],
                  },
                ],
                previusRoute: 'Watchlist',
              })
            }
          >
            <FilterText>{t('filter')} +</FilterText>
          </FilterButton>
          <Grid
            items={list}
            title={`${list.length} ${list.length === 1 ? t('program') : t('programmes')}`}
            numColumns={isTablet() ? 4 : 3}
            element={{
              width: percentageWidth(isTablet() ? 25 : 33.333) - (isTablet() ? 10 : 20),
              height: percentageWidth((isTablet() ? 25 : 33.333) * 1.25),
              marginBottom: 20,
              marginHorizontal: isTablet() ? 3 : 5,
            }}
            listStyles={gridContainer}
            cardContentAfter={(item) => removeIcon(item)}
          />
        </GridWrapper>
      </>
    );
  };

  const renderBottomContent = () => (
    <BottomSheetWrapper>
      <Headline center color={theme.PRIMARY_TEXT_COLOR}>
        {t('watchlist:remove.title')}
      </Headline>
      <Button
        stretch
        size="big"
        fontWeight="medium"
        onPress={() => removeItem()}
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

  useEffect(() => {
    dispatch(sheetComponent(300, () => renderBottomContent()));
    return () => {
      dispatch(sheetComponent(0, () => <></>));
    };
  }, []);

  const getMenuItems = () => {
    if (menu && menu.length > 0) {
      const items = menu
        .filter((item) => item.label !== 'Explore' && item.label !== 'Help')
        .map((item, index) => {
          return {
            id: index.toString(),
            text: item.label,
            goTo: item?.path || '',
          };
        });
      return items;
    }
    return [];
  };

  return (
    <View style={[wrapper, { backgroundColor: theme.PRIMARY_COLOR }]}>
      <Header menuItems={getMenuItems()} />
      <ScrollView bounces={false}>{renderContent()}</ScrollView>
    </View>
  );
};

export default Watchlist;
