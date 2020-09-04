/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import Highlighter from 'react-native-highlight-words';
import { SearchIcon, SearchDeleteIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { loadCollectionPage } from '@src/services/detail';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Account.TS/api';
import {
  MassiveSDKModelPageEntry,
  MassiveSDKModelPerson,
} from '@src/sdks/Britbox.API.Content.TS/api';
import { getSearch } from '@store/modules/search/saga';
import Grid from '@screens/Shared/Grid';
import { widthPercentageToDP as vw } from 'react-native-responsive-screen';

import { wp } from '@src/utils/dimension';
import {
  Container,
  Title,
  Scroll,
  TitleWrapper,
  SearchWrapper,
  SearchInput,
  SearchClearButton,
  SearchIconWrapper,
  SuggestionWrapper,
  SuggestionText,
  NoResultWrapper,
  NoResultText,
  NoResultBold,
  ResultWrapper,
  ResultBold,
  ResultText,
  ResultGrid,
  ResultCastWrapper,
  CastFirstNameWrapper,
  CastStarIcon,
} from './styles';

const containerStyles = {
  marginTop: 10,
  paddingHorizontal: wp(0),
  alignItems: 'center',
};

export default function Search() {
  const { t } = useTranslation('search');
  const theme = useSelector((state: AppState) => state.theme.theme);
  const user = useSelector((state: AppState) => state.user);
  const [searchInput, setSearchInput] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchingItemData, setSearchingItemData] = useState<MassiveSDKModelItemList[] | undefined>(
    undefined
  );
  const [searchingPeopleData, setSearchingPeopleData] = useState<
    MassiveSDKModelPerson[] | undefined
  >(undefined);

  const searchResultCastContainer = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 20,
  };

  const searchResultPersonContainer = {
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderLeftWidth: 0.2,
    borderLeftColor: theme.PRIMARY_TEXT_COLOR_OPAQUE,
  };

  const searchResultPersonTextStyle = {
    color: theme.PRIMARY_TEXT_COLOR_OPAQUE,
    fontSize: 20,
    paddingVertical: 2,
    fontFamily: theme.PRIMARY_FONT_FAMILY_LIGHT,
  };

  const searchResultFirstPersonTextStyle = {
    color: theme.PRIMARY_TEXT_COLOR_OPAQUE,
    fontSize: 16,
    paddingTop: 2,
    paddingLeft: 8,
    fontFamily: theme.PRIMARY_FONT_FAMILY_LIGHT,
  };

  const searchResultTextStyle = {
    color: theme.PRIMARY_TEXT_COLOR_OPAQUE,
    fontSize: 20,
    paddingVertical: 10,
    fontFamily: theme.PRIMARY_FONT_FAMILY_LIGHT,
  };

  const searchResultHighLightTextStyle = {
    color: theme.PRIMARY_FOREGROUND_COLOR,
    fontFamily: theme.PRIMARY_FONT_FAMILY_MEDIUM,
  };

  const searchResultContainer = {
    paddingLeft: 50,
    paddingRight: 20,
    paddingVertical: 20,
  };

  const [suggestions, setSuggestions] = useState<MassiveSDKModelPageEntry | undefined>(undefined);
  // const [error, setError] = useState(false);

  const getDataDetail = async () => {
    const { response } = await loadCollectionPage('/our-top-picks', 6);

    if ((response?.entries || []).length === 0) {
      // setError(true);
    } else {
      const { entries } = response || {};
      const item = (entries || []).reduce((e) => e);
      setSuggestions(item);
    }
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.length >= 3) {
        setIsDone(false);
        doSearch(false);
      }
    }, 500);

    if (searchInput.length < 3) {
      setIsDone(false);
      setNoResults(false);
      setSearchingItemData([]);
      setSearchingPeopleData([]);
    }

    return () => clearTimeout(timer);
  }, [searchInput]);

  const doSearch = async (done: boolean) => {
    setIsLoading(true);
    const response = await getSearch(user?.access?.accessToken || '', searchInput, done);

    if (response) {
      const { response: responseData } = response;
      const { externalResponse: responseSearchData } = responseData;

      if (responseSearchData) {
        setSearchingItemData(responseSearchData?.items?.items || []);
        setSearchingPeopleData(responseSearchData?.people || []);
      }
      if ((responseSearchData?.items?.items || []).length === 0) {
        setNoResults(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Scroll>
        <TitleWrapper>
          <Title fontSize={25} lineHeight={38}>
            {t('title')}
          </Title>
        </TitleWrapper>
        <SearchWrapper>
          <SearchIconWrapper>
            <SearchIcon width={25} height={25} />
          </SearchIconWrapper>
          <SearchInput
            placeholder={t('placeholder')}
            returnKeyType="done"
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            onSubmitEditing={() => {
              if (searchInput.length >= 3) {
                setIsDone(true);
                doSearch(true);
              }
            }}
          />
          {searchInput !== '' && (
            <SearchClearButton onPress={() => setSearchInput('')}>
              {isLoading ? (
                <ActivityIndicator size="small" color={theme.PRIMARY_FOREGROUND_COLOR} />
              ) : (
                <SearchDeleteIcon width={25} height={25} />
              )}
            </SearchClearButton>
          )}
        </SearchWrapper>
        {(searchingItemData || []).length > 0 ? (
          <>
            {isDone ? (
              <ResultGrid>
                <ResultWrapper>
                  <ResultText>
                    {t('findResults')}
                    <ResultBold>&#34;{searchInput}&#34;</ResultBold>
                  </ResultText>
                </ResultWrapper>
                <Grid
                  items={searchingItemData || []}
                  title=""
                  numColumns={3}
                  element={{
                    width: vw(33.333) - wp(20),
                    height: vw(33.333 * 1.25),
                    marginBottom: 20,
                    marginHorizontal: wp(5),
                  }}
                  containerStyle={containerStyles}
                />
                <ResultCastWrapper>
                  <ResultText>{t('castFindResults')}</ResultText>
                </ResultCastWrapper>
                <FlatList
                  data={searchingPeopleData || []}
                  numColumns={2}
                  contentContainerStyle={searchResultCastContainer}
                  renderItem={({ item }) => {
                    const name: string[] | undefined = item?.name?.split(' ');
                    const firstName = name && name[0];
                    const lastName = name && name[1];
                    return (
                      <TouchableOpacity
                        style={searchResultPersonContainer}
                        onPress={() => navigateByPath(item)}
                        activeOpacity={1}
                      >
                        <CastFirstNameWrapper>
                          <CastStarIcon />
                          <Highlighter
                            highlightStyle={searchResultHighLightTextStyle}
                            searchWords={[searchInput]}
                            textToHighlight={firstName}
                            style={searchResultFirstPersonTextStyle}
                          />
                        </CastFirstNameWrapper>

                        <Highlighter
                          highlightStyle={searchResultHighLightTextStyle}
                          searchWords={[searchInput]}
                          textToHighlight={lastName}
                          style={searchResultPersonTextStyle}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </ResultGrid>
            ) : (
              <FlatList
                data={searchingItemData || []}
                contentContainerStyle={searchResultContainer}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigateByPath(item)} activeOpacity={1}>
                    <Highlighter
                      highlightStyle={searchResultHighLightTextStyle}
                      searchWords={[searchInput]}
                      textToHighlight={item?.title}
                      style={searchResultTextStyle}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </>
        ) : (
          <>
            {noResults ? (
              <NoResultWrapper>
                <NoResultText>
                  <NoResultBold>{t('noResults.bold')}</NoResultBold>
                  {t('noResults.text')}
                </NoResultText>
              </NoResultWrapper>
            ) : (
              <SuggestionWrapper>
                <SuggestionText>{t('browse')}</SuggestionText>
                <Button
                  link
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                  onPress={() => navigateByPath({ path: '/new_titles' })}
                >
                  {t('new')}
                </Button>
                <Button
                  link
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                  onPress={() => navigateByPath({ path: '/programmes' })}
                >
                  {t('programmes')}
                </Button>
              </SuggestionWrapper>
            )}

            <Grid
              items={suggestions?.list?.items || []}
              title={suggestions?.title || ''}
              numColumns={3}
              element={{
                width: vw(33.333) - wp(20),
                height: vw(33.333 * 1.25),
                marginBottom: 20,
                marginHorizontal: wp(5),
              }}
              containerStyle={containerStyles}
            />
          </>
        )}
      </Scroll>
    </Container>
  );
}
