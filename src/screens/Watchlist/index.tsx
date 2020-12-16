/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Header from '@components/Header';
import { sheetComponent, showSheetBottom } from '@store/modules/layout/actions';
import { useTranslation } from 'react-i18next';
import { percentageWidth } from '@src/utils/dimension';
import { useColumns } from '@src/utils/columns';
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
  const [orientation, setOrientation] = useState(isPortrait ? 'PORTRAIT' : 'LANDSCAPE');
  const [numOfColums, setNumOfColumns] = useState(
    isTablet() ? (isPortrait ? TABLET_PORTRAIT_COLUMNS : TABLET_LANDSCAPE_COLUMNS) : 3
  );
  const { filter } = params || {};
  const menu = useSelector((state: AppState) => state.core.menu?.navigation?.header); // TODO: get data from properties
  const [numOfColums, elementWidth, elementHeight] = useColumns(
    18.75,
    Platform.OS === 'ios' ? 16 : 28.5
  );

  const [list, setList] = useState<MassiveSDKModelItemSummary[]>([]);

  const getProfile = useCallback(async () => {
    const { response } = await profile(token, segment);
    return response?.bookmarkList?.items || [];
  }, []);

  useEffect(() => {
    const dataDummy = {
      items: fill(new Array((bookmarkList?.items || []).length), {
        images: {
          poster: 'loading',
        },
      }),
    };

    setList(dataDummy.items);

    if (!filter) {
      getProfile().then((response) => {
        setList(response);
      });
    }
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

  const onOrientationDidChange = useCallback((prevOrientation: OrientationType) => {
    if (isTablet()) {
      if (prevOrientation === 'PORTRAIT' || prevOrientation === 'PORTRAIT-UPSIDEDOWN') {
        setNumOfColumns(Platform.OS === 'ios' ? TABLET_PORTRAIT_COLUMNS : TABLET_LANDSCAPE_COLUMNS);
      } else if (prevOrientation === 'LANDSCAPE-LEFT' || prevOrientation === 'LANDSCAPE-RIGHT') {
        setNumOfColumns(Platform.OS === 'ios' ? TABLET_LANDSCAPE_COLUMNS : TABLET_PORTRAIT_COLUMNS);
      }
    } else if (prevOrientation === 'PORTRAIT') {
      setOrientation('PORTRAIT');
    } else if (prevOrientation === 'LANDSCAPE-LEFT' || prevOrientation === 'LANDSCAPE-RIGHT') {
      setOrientation('LANDSCAPE');
    }
  }, []);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(onOrientationDidChange);

    return () => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  }, []);

  const [elementWidth, elementHeight] = useMemo((): Array<number> => {
    let size = [29, 29 * 1.25];

    if (isTablet()) {
      if (Platform.OS === 'ios' && numOfColums === TABLET_LANDSCAPE_COLUMNS) {
        size = [13.8, 13.8 * 1.25];
      } else {
        size = [25, 25 * 1.25];
      }
    }

    return size;
  }, [numOfColums, orientation]);

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

  const getGridTitle = useCallback(() => {
    switch (filter?.value) {
      case 'movie':
        return `${list.length} ${list.length === 1 ? t('movie') : t('movies')}`;
      case 'show':
        return `${list.length} ${list.length === 1 ? t('show') : t('shows')}`;
      default:
        return `${list.length} ${list.length === 1 ? t('program') : t('programmes')}`;
    }
  }, [list, filter]);

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
            title={getGridTitle()}
            numColumns={numOfColums}
            element={{
              width: percentageWidth(elementWidth),
              height: percentageWidth(elementHeight),
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
