/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '@components/Header';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { useColumns } from '@src/utils/columns';
import { isTablet } from '@src/utils/tablet';
import {
  MassiveSDKModelItemSummary,
  MassiveSDKModelPagination,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadCollectionPage } from '@src/services/detail';
import Grid from '@screens/Shared/Grid';
import ErrorLanding from '@components/ErrorLanding';
import { useTranslation } from 'react-i18next';
import { Item } from '@screens/ModalFilter';
import { ArrowBottomIcon } from '@assets/icons';
import { compact } from 'lodash';

import { loadCollectionList } from '@src/services/util';
import ModalPicker from '@screens/Shared/ModalPicker';
import { dataDummy } from './data';
import {
  Container,
  WrapperContinuosScroll,
  ContainerGrid,
  Select,
  SafeAreaView,
  SelectText,
} from './styles';

type RootParamList = {
  Collection: {
    item: MassiveSDKModelItemSummary;
    genre: string;
    filter: Item;
  };
};

type AZScreenRouteProp = RouteProp<RootParamList, 'Collection'>;

type DataTypes = {
  items: MassiveSDKModelItemSummary[];
  paging: MassiveSDKModelPagination;
};

const alphabet = String.fromCharCode(...Array(123).keys())
  .slice(97)
  .toUpperCase()
  .split('');

type AlphabetDataType = { label: string; count: number; param: string };

const headerStyles = {};

const listStyles = {
  marginTop: 10,
  paddingHorizontal: isTablet() ? 7 : 15,
};

const gridElementMargin = isTablet() ? 3 : 5;

const AZ = () => {
  const navigation = useNavigation();
  const { params } = useRoute<AZScreenRouteProp>();
  const { filter } = params || {};

  const [data, setData] = useState<DataTypes | undefined>(dataDummy as DataTypes);
  const [error, setError] = useState(false);
  const [letter, setLetter] = useState('All');
  const [isLoadingContinuosScroll, setIsLoadingContinuosScroll] = useState(false);
  const [animationContinuosScroll, setAnimationContinuosScroll] = useState(true);
  const { t } = useTranslation(['layout', 'az']);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { segment } = useSelector((state: AppState) => state.core);
  const [alphabetData, setAlphabetData] = useState<AlphabetDataType[] | undefined>([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('a-z');
  const menu = useSelector((state: AppState) => state.core.menu?.navigation?.header); // TODO: get data from properties
  const [width, setWidth] = useState(0);
  const [numOfColums, gridElementWidth] = useColumns(width, gridElementMargin);

  const pickerRef = useRef<any>();

  const stylesSelect = {
    inputIOS: {
      opacity: 0,
      display: 'none',
    },
    inputAndroid: {
      opacity: 0,
      display: 'none',
    },
  };

  const back = () => {
    navigation.goBack();
  };

  const getDataDetail = async () => {
    const { response } = await loadCollectionPage('/Programmes');
    if (response) {
      const alphabetItems = (response?.entries || []).filter(
        (item) => item.template === 'A to Z Continuous Scroll (BBC)'
      );
      if (alphabet.length > 0) {
        const items = (alphabetItems.reduce((a) => a).customFields as AlphabetDataType[]).map(
          (item) => {
            if (item.count > 0) {
              return { ...item, value: item.label };
            }

            return null;
          }
        );

        setAlphabetData(compact(items || []));
      }
    }
    if ((response?.entries || []).length === 0) {
      setError(true);
    }
  };

  useEffect(() => {
    getDataDetail();
    getMoreDataContinuosScroll(true);

    return () => {
      setData(dataDummy as DataTypes);
      setIsLoadingContinuosScroll(false);
      setError(false);
    };
  }, []);

  useEffect(() => {
    if (filter) {
      setOrder(filter.value === 'date-added' ? 'desc' : 'asc');
      setOrderBy(filter.value);

      setData(dataDummy as DataTypes);
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(event.nativeEvent) && !isLoadingContinuosScroll) {
      setIsLoadingContinuosScroll(true);
      getMoreDataContinuosScroll(false, order, orderBy, letter);
    }
  };

  const filterLetter = (value: string) => {
    setLetter(value);
    setData(dataDummy as DataTypes);
    setAnimationContinuosScroll(true);
    getMoreDataContinuosScroll(true, order, orderBy, value);
  };

  const getMoreDataContinuosScroll = (
    reset?: boolean,
    orderFilter?: string,
    orderByFilter?: string,
    letterValue?: string
  ) => {
    const { next, page, total } = data?.paging || {};
    if (page !== total || reset) {
      const url = (next || '').split('?');

      if (url.length > 0) {
        const parameters = {
          nextPage: 1,
          pageSize: 24,
          sub: 'Subscriber',
        };

        if (!reset) {
          const { page: nextPage, page_size: pageSize, sub } = JSON.parse(
            `{"${url[url.length - 1].replace(/&/g, '","').replace(/=/g, '":"')}"}`,
            (key, value) => {
              return key === '' ? value : decodeURIComponent(value);
            }
          );

          parameters.nextPage = nextPage;
          parameters.pageSize = pageSize;
          parameters.sub = sub;
        }

        loadCollectionList(
          {
            id: 'a-z',
            page: reset ? 1 : parameters.nextPage,
            pageSize: reset ? 24 : parameters.pageSize,
            sub: parameters.sub,
            order: orderFilter || order,
            orderBy: orderByFilter || orderBy,
            param: typeof letterValue === 'undefined' ? '' : `TitleGroupKey:${letterValue}`,
          },
          segment
        )
          .then(({ response }) => {
            setData({
              ...data,
              items: reset
                ? [...(response?.items || [])]
                : [...(data?.items || []), ...(response?.items || [])],
              paging: { ...response?.paging },
            });
            setIsLoadingContinuosScroll(false);
            const { page: checkPage, total: checkTotal } = response?.paging || {};
            if (Number(checkPage || 0) === Number(checkTotal || 0)) {
              setAnimationContinuosScroll(false);
            }
          })
          .catch(() => {
            setData(undefined);
            setError(true);
          });
      }
    }
  };

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
    <SafeAreaView
      onLayout={({
        nativeEvent: {
          layout: { width: newWidth },
        },
      }: LayoutChangeEvent) => {
        // * 2 because it has padding on both sides, left and right
        setWidth(newWidth - listStyles.paddingHorizontal * 2);
      }}
    >
      <Header style={headerStyles} menuItems={getMenuItems()} />
      <ScrollView
        bounces={false}
        onScroll={(event) => handleScroll(event)}
        scrollEventThrottle={16}
      >
        <Container>
          {alphabetData && alphabetData?.length > 0 ? (
            Platform.OS === 'ios' ? (
              <RNPickerSelect
                ref={pickerRef}
                placeholder={{}}
                InputAccessoryView={() => null}
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => filterLetter(value)}
                items={alphabetData as any}
                style={stylesSelect}
              />
            ) : (
              <ModalPicker
                ref={pickerRef}
                data={alphabetData}
                label="label"
                value="value"
                onValueChange={(value) => filterLetter(value)}
              />
            )
          ) : null}

          {data && (
            <WrapperContinuosScroll>
              <ContainerGrid>
                <Grid
                  items={data.items || []}
                  title={t('az:title')}
                  filter={() =>
                    alphabetData && alphabetData?.length > 0 ? (
                      <Select
                        activeOpacity={0.5}
                        onPress={() => {
                          if (pickerRef.current) {
                            pickerRef.current.togglePicker(true);
                          }
                        }}
                      >
                        <SelectText>{letter}</SelectText>
                        <ArrowBottomIcon
                          width={15}
                          height={15}
                          fill={theme.PRIMARY_TEXT_COLOR_OPAQUE}
                        />
                      </Select>
                    ) : null
                  }
                  loading={animationContinuosScroll}
                  numColumns={numOfColums}
                  element={{
                    width: gridElementWidth,
                    height: gridElementWidth * 1.5,
                    marginBottom: 20,
                    marginHorizontal: gridElementMargin,
                  }}
                  listStyles={listStyles}
                />
              </ContainerGrid>
            </WrapperContinuosScroll>
          )}
          {error && <ErrorLanding onPress={() => back()} />}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AZ;
