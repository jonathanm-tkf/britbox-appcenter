import React, { useEffect } from 'react';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, View, TouchableOpacity } from 'react-native';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Header from '@components/Header';
import { sheetComponent, showSheetBottom, hideSheetBottom } from '@store/modules/layout/actions';
import { useTranslation } from 'react-i18next';
import { wp } from '@src/utils/dimension';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';
import Grid from '@screens/Shared/Grid';
import { CloseIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { store } from '@store/index';
import { LayoutState } from '@store/modules/layout/types';
import { watchlistToggleRequest } from '@store/modules/user/actions';
import {
  Container,
  Title,
  Paragraph,
  GridWrapper,
  RemoveButtonWrapper,
  Headline,
  BottomSheetWrapper,
} from './styles';

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
};

const keyExtractor = (item: number) => `${item}`;

const getItemId = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.data?.itemId || '0';
};

const getSheetHeight = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.sheet.height || 0;
};

const Watchlist = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const bookmarkList = useSelector((state: AppState) => state.user.profile.bookmarkList);
  const dispatch = useDispatch();
  const { t } = useTranslation(['watchlist']);

  const showSheetBottomContent = (item: MassiveSDKModelItemSummary) => {
    if (getSheetHeight() === 0) {
      dispatch(sheetComponent(300, () => renderBottomContent()));
    }
    dispatch(showSheetBottom({ itemId: item?.id || '0' }));
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
    dispatch(watchlistToggleRequest({ itemId: getItemId(), isInWatchlist: true }));
    dispatch(hideSheetBottom());
  };

  const renderContent = () => {
    return (
      <>
        <Container>
          <Title>{t('title')}</Title>
          <Paragraph>{t('description')}</Paragraph>
        </Container>
        <GridWrapper>
          <Grid
            items={bookmarkList.items || []}
            title={`${(bookmarkList.items || []).length} ${
              (bookmarkList.items || []).length === 1 ? t('program') : t('programmes')
            }`}
            numColumns={3}
            element={{
              width: vw(33.333) - wp(20),
              height: vw(33.333 * 1.25),
              marginBottom: 20,
              marginHorizontal: wp(5),
            }}
            containerStyle={{
              marginTop: 10,
              paddingHorizontal: wp(15),
            }}
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
          dispatch(hideSheetBottom());
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
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Watchlist;
