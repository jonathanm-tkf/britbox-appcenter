import React, { useState, useEffect } from 'react';
import { NativeScrollEvent, Platform, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Header from '@components/Header';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';

import {
  MassiveSDKModelItemSummary,
  MassiveSDKModelPage,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadCollectionPage, loadCollectionList } from '@src/services/detail';
import { getTemplate } from '@src/utils/template';
import Grid from '@screens/Shared/Grid';
import ErrorLanding from '@components/ErrorLanding';
import { useTranslation } from 'react-i18next';
import { Item } from '@screens/ModalFilter';
import { dataDummy } from './data';
import { Container, ChangeOrderButton, ChangeOrderText, WrapperContinuosScroll } from './styles';

type RootParamList = {
  Collection: {
    item: MassiveSDKModelItemSummary;
    genre: string;
    filter: Item;
  };
};

type AZScreenRouteProp = RouteProp<RootParamList, 'Collection'>;

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
};

const keyExtractor = (item: number) => `${item}`;

const AZ = () => {
  const navigation = useNavigation();
  const { params } = useRoute<AZScreenRouteProp>();
  const { filter } = params || {};

  const [data, setData] = useState<MassiveSDKModelPage | undefined>(dataDummy);
  const [error, setError] = useState(false);
  const [isLoadingContinuosScroll, setIsLoadingContinuosScroll] = useState(false);
  const [animationContinuosScroll, setAnimationContinuosScroll] = useState(true);
  const { t } = useTranslation(['layout', 'az']);
  const theme = useSelector((state: AppState) => state.theme.theme);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('a-z');

  const back = () => {
    navigation.goBack();
  };

  const getDataDetail = async (path: string) => {
    const { response } = await loadCollectionPage(path);
    setData(response);

    if ((response?.entries || []).length === 0) {
      setError(true);
    }
  };

  useEffect(() => {
    getDataDetail('/genre/mystery');

    return () => {
      setData(dataDummy);
      setIsLoadingContinuosScroll(false);
      setError(false);
    };
  }, []);

  useEffect(() => {
    if (filter) {
      setOrder(filter.value === 'date-added' ? 'desc' : 'asc');
      setOrderBy(filter.value);

      const newData = (data?.entries || []).map((item) => {
        if (getTemplate(item.template || '') === 'grid-infinite') {
          return {
            ...item,
            list: {
              ...item.list,
              items: [
                ...(dataDummy.entries
                  .filter((f: { template: string }) => f.template === 'Continuous Scroll Automatic')
                  .reduce((element) => element).list.items || []),
              ],
            },
          };
        }
        return item;
      });

      setData({ ...data, entries: newData });
      getMoreDataContinuosScroll(
        true,
        filter.value === 'date-added' ? 'desc' : 'asc',
        filter.value
      );
    }
  }, [filter]);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
  };

  const handleScroll = (event: any) => {
    if (isCloseToBottom(event.nativeEvent) && !isLoadingContinuosScroll) {
      setIsLoadingContinuosScroll(true);
      getMoreDataContinuosScroll();
    }
  };

  const getMoreDataContinuosScroll = (
    reset?: boolean,
    orderFilter?: string,
    orderByFilter?: string
  ) => {
    const { next, page, total } =
      (data?.entries || [])
        .filter((item) => getTemplate(item.template || '') === 'grid-infinite')
        .reduce((item) => item).list?.paging || {};

    if (page !== total) {
      const url = (next || '').split('?');

      if (url.length > 0) {
        const { page: nextPage, page_size: pageSize, sub } = JSON.parse(
          `{"${url[url.length - 1].replace(/&/g, '","').replace(/=/g, '":"')}"}`,
          (key, value) => {
            return key === '' ? value : decodeURIComponent(value);
          }
        );
        const id = url[0].split('/').pop() || '';

        loadCollectionList({
          id,
          page: reset ? 1 : nextPage,
          pageSize,
          sub,
          order: orderFilter || order,
          orderBy: orderByFilter || orderBy,
        }).then(({ response }) => {
          const newData = (data?.entries || []).map((item) => {
            if (getTemplate(item.template || '') === 'grid-infinite') {
              return {
                ...item,
                list: {
                  ...item.list,
                  items: reset
                    ? [...(response?.items || [])]
                    : [...(item.list?.items || []), ...(response?.items || [])],
                  paging: { ...response?.paging },
                },
              };
            }
            return item;
          });

          setData({ ...data, entries: newData });
          setIsLoadingContinuosScroll(false);

          if ((page || 0) + 1 === total) {
            setAnimationContinuosScroll(false);
          }
        });
      }
    }
  };

  const renderContent = () => {
    return (
      <Container>
        {data &&
          data.entries &&
          data.entries.map((item, key) => {
            if ((item?.list?.items || []).length === 0) {
              return null;
            }

            switch (getTemplate(item.template || '')) {
              case 'grid-infinite':
                return (
                  <WrapperContinuosScroll key={key.toString()}>
                    <ChangeOrderButton
                      onPress={() =>
                        navigation.navigate('ModalFilter', {
                          title: t('layout:filter'),
                          data: [
                            {
                              title: t('layout:order'),
                              data: [
                                {
                                  title: t('layout:recent'),
                                  value: 'date-added',
                                  selected: orderBy === 'date-added',
                                },
                                {
                                  title: t('layout:az'),
                                  value: 'a-z',
                                  selected: orderBy === 'a-z',
                                },
                              ],
                            },
                          ],
                        })
                      }
                    >
                      <ChangeOrderText>Filter +</ChangeOrderText>
                    </ChangeOrderButton>
                    <Grid
                      items={item?.list?.items || []}
                      title={t('az:title')}
                      loading={animationContinuosScroll}
                    />
                  </WrapperContinuosScroll>
                );

              default:
                return null;
            }
          })}
        {error && <ErrorLanding onPress={() => back()} />}
      </Container>
    );
  };

  return (
    <View style={[wrapper, { backgroundColor: theme.PRIMARY_COLOR }]}>
      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={<Header />}
        headerContainerBackgroundColor={theme.PRIMARY_COLOR}
        headerHeight={77}
        data={[0]}
        renderItem={renderContent}
        clipHeader
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default AZ;
