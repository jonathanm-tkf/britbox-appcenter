/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { NativeScrollEvent, Platform, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Header from '@components/Header';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';

import {
  MassiveSDKModelItemSummary,
  MassiveSDKModelPagination,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { loadCollectionList, loadCollectionPage } from '@src/services/detail';
import Grid from '@screens/Shared/Grid';
import ErrorLanding from '@components/ErrorLanding';
import { useTranslation } from 'react-i18next';
import { Item } from '@screens/ModalFilter';
import { ArrowBottomIcon } from '@assets/icons';
import { compact } from 'lodash';
import { wp } from '@src/utils/dimension';
import { isTablet } from 'react-native-device-info';
import { dataDummy } from './data';
import {
  Container,
  WrapperContinuosScroll,
  AlphabetWrapper,
  LetterButton,
  LetterButtonText,
  ContainerGrid,
  Select,
} from './styles';

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

type DataTypes = {
  items: MassiveSDKModelItemSummary[];
  paging: MassiveSDKModelPagination;
};

const alphabet = String.fromCharCode(...Array(123).keys())
  .slice(97)
  .toUpperCase()
  .split('');

type AlphabetDataType = { label: string; count: number; param: string };
type AlphabetProps = {
  alphabetData: AlphabetDataType[] | undefined;
  onPress: (letter: string) => void;
};

const Alphabet = ({ alphabetData, onPress }: AlphabetProps) => {
  const [selected, setSelected] = useState('All');
  const filter = (item: string) => {
    setSelected(item);
    if (item !== selected) {
      return onPress(item);
    }
    return null;
  };

  return (
    <AlphabetWrapper>
      {(alphabetData || []).map((item) => {
        return (
          <LetterButton
            key={item.label}
            onPress={() => (item.count !== 0 ? filter(item.label) : {})}
          >
            <LetterButtonText
              desactivate={(selected !== 'All' && item.label !== selected) || item.count === 0}
            >
              {item.label}
            </LetterButtonText>
          </LetterButton>
        );
      })}
    </AlphabetWrapper>
  );
};

const AZ = () => {
  const navigation = useNavigation();
  const { params } = useRoute<AZScreenRouteProp>();
  const { filter } = params || {};

  const [data, setData] = useState<DataTypes | undefined>(dataDummy as DataTypes);
  const [error, setError] = useState(false);
  const [isLoadingContinuosScroll, setIsLoadingContinuosScroll] = useState(false);
  const [animationContinuosScroll, setAnimationContinuosScroll] = useState(true);
  const { t } = useTranslation(['layout', 'az']);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [alphabetData, setAlphabetData] = useState<AlphabetDataType[] | undefined>([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('a-z');

  const stylesSelect = {
    inputIOS: { color: theme.PRIMARY_TEXT_COLOR_OPAQUE, paddingRight: 30 },
    inputAndroid: {
      color: theme.PRIMARY_TEXT_COLOR_OPAQUE,
      paddingRight: 25,
    },
    iconContainer: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 0 : 16,
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

  const handleScroll = (event: any) => {
    if (isCloseToBottom(event.nativeEvent) && !isLoadingContinuosScroll) {
      setIsLoadingContinuosScroll(true);
      getMoreDataContinuosScroll();
    }
  };

  const filterLetter = (value: string) => {
    setData(dataDummy as DataTypes);
    setAnimationContinuosScroll(true);
    getMoreDataContinuosScroll(true, order, orderBy, value);
  };

  const getMoreDataContinuosScroll = (
    reset?: boolean,
    orderFilter?: string,
    orderByFilter?: string,
    letter?: string
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

        loadCollectionList({
          id: 'a-z',
          page: reset ? 1 : parameters.nextPage,
          pageSize: reset ? 24 : parameters.pageSize,
          sub: parameters.sub,
          order: orderFilter || order,
          orderBy: orderByFilter || orderBy,
          param: typeof letter === 'undefined' ? '' : `TitleGroupKey:${letter}`,
        })
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

  const renderContent = () => {
    return (
      <Container>
        {data && (
          <WrapperContinuosScroll>
            {/* <ChangeOrderButton
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
                  previusRoute: 'AZ',
                })
              }
            >
              <ChangeOrderText>{t('layout:filter')} +</ChangeOrderText>
            </ChangeOrderButton> */}
            {alphabetData && alphabetData?.length > 0 && (
              <Select>
                <RNPickerSelect
                  placeholder={{}}
                  InputAccessoryView={() => null}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={(value) => filterLetter(value)}
                  items={alphabetData as any}
                  style={stylesSelect}
                  Icon={() => (
                    <ArrowBottomIcon
                      width={15}
                      height={15}
                      fill={theme.PRIMARY_TEXT_COLOR_OPAQUE}
                    />
                  )}
                />
              </Select>
            )}
            <ContainerGrid>
              <Grid
                items={data.items || []}
                title={t('az:title')}
                loading={animationContinuosScroll}
                numColumns={isTablet() ? 4 : 3}
                element={{
                  width: vw(isTablet() ? 25 : 33.333) - wp(isTablet() ? 10 : 20),
                  height: vw((isTablet() ? 25 : 33.333) * 1.25),
                  marginBottom: 20,
                  marginHorizontal: wp(isTablet() ? 3 : 5),
                }}
                containerStyle={{
                  marginTop: 10,
                  paddingHorizontal: wp(isTablet() ? 7 : 15),
                }}
              />
            </ContainerGrid>
          </WrapperContinuosScroll>
        )}
        {error && <ErrorLanding onPress={() => back()} />}
      </Container>
    );
  };

  return (
    <View style={[wrapper, { backgroundColor: theme.PRIMARY_COLOR }]}>
      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={
          <>
            <Header />
            {/* <Alphabet {...{ alphabetData }} onPress={(value) => filterLetter(value)} /> */}
          </>
        }
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
