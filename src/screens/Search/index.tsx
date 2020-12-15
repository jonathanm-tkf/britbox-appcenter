/* eslint-disable react-hooks/exhaustive-deps */
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
=======
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
>>>>>>> 545084e... fix last commit for ios
import { useTranslation } from 'react-i18next';
import Highlighter from 'react-native-highlight-words';
import { SearchIcon, SearchDeleteIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Account.TS/api';
import { MassiveSDKModelPerson } from '@src/sdks/Britbox.API.Content.TS/api';
import { getSearch } from '@store/modules/search/saga';
import Grid from '@screens/Shared/Grid';
import { percentageWidth } from '@src/utils/dimension';
import { isTablet } from 'react-native-device-info';
import { getTextInConfigJSON } from '@src/utils/object';
import { useColumns } from '@src/utils/columns';
import { analyticsRef } from '@src/utils/analytics';
import { withTheme } from 'styled-components';
import { ThemeProps } from '@store/modules/theme/types';
import {
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
  alignItems: 'center',
};

const listStyles = {
  marginTop: 10,
  paddingHorizontal: 10,
};

type Props = {
  readonly theme: ThemeProps;
};

const Search = ({ theme }: Props) => {
  const { t } = useTranslation('search');
  const user = useSelector((state: AppState) => state.user);
  const { search } = useSelector((state: AppState) => state.home);
  const [searchInput, setSearchInput] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numOfColums, elementWidth, elementHeight] = useColumns(
    18,
    Platform.OS === 'ios' ? 16 : 28
  );
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

  const suggestionLinks = getTextInConfigJSON(['search-links'], '');

  useEffect(() => {
    const searchString = searchInput?.trim();
    if (!searchString) setSearchInput('');

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

  const onOrientationDidChange = useCallback((prevOrientation: OrientationType) => {
    if (!isTablet()) {
      return;
    }

    if (prevOrientation === 'PORTRAIT' || prevOrientation === 'PORTRAIT-UPSIDEDOWN') {
      setNumOfColumns(Platform.OS === 'ios' ? TABLET_PORTRAIT_COLUMNS : TABLET_LANDSCAPE_COLUMNS);
    } else if (prevOrientation === 'LANDSCAPE-LEFT' || prevOrientation === 'LANDSCAPE-RIGHT') {
      setNumOfColumns(Platform.OS === 'ios' ? TABLET_LANDSCAPE_COLUMNS : TABLET_PORTRAIT_COLUMNS);
    }
  }, []);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(onOrientationDidChange);

    return () => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  }, []);

  const doSearch = async (done: boolean) => {
    const searchString = searchInput?.trim();
    if (searchString.length >= 3) {
      setIsLoading(true);
      const response = await getSearch(user?.access?.accessToken || '', searchInput?.trim(), done);

      if (response) {
        const { response: responseData } = response;
        const { externalResponse: responseSearchData } = responseData;

        if (responseSearchData) {
          if (analyticsRef.current) {
            analyticsRef.current.onTrackEvent({
              type: 'event',
              actionType: 'search',
              actionName: 'ns_search_terms',
              eventProperties: {
                is_background: false,
                container: 'Application',
                result: `${searchInput}: ${(responseSearchData?.items?.items || []).length}`,
                source: 'Britbox~App',
                metadata: '',
              },
            });
          }
          setSearchingItemData(responseSearchData?.items?.items || []);
          setSearchingPeopleData(responseSearchData?.people || []);
        }
        if (
          (responseSearchData?.items?.items || []).length === 0 &&
          (responseSearchData?.people || []).length === 0
        ) {
          setNoResults(true);
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <Scroll>
      <TitleWrapper>
        <Title fontSize={isTablet() ? 32 : 25} lineHeight={isTablet() ? 42 : 38}>
          {t('title')}
        </Title>
      </TitleWrapper>
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon width={isTablet() ? 30 : 25} height={isTablet() ? 30 : 25} />
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
      {(searchingItemData || []).length > 0 || (searchingPeopleData || []).length > 0 ? (
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
                numColumns={isTablet() ? 4 : 3}
                element={{
                  width: percentageWidth(isTablet() ? 25 : 33.333) - (isTablet() ? 10 : 20),
                  height: percentageWidth((isTablet() ? 25 : 33.333) * 1.25),
                  marginBottom: 20,
                  marginHorizontal: isTablet() ? 3 : 5,
                }}
                containerStyles={containerStyles}
                listStyles={listStyles}
              />
              {(searchingPeopleData || [])?.length > 0 && (
                <ResultCastWrapper>
                  <ResultText>{t('castFindResults')}</ResultText>
                </ResultCastWrapper>
              )}
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
              data={[...(searchingItemData || []), ...(searchingPeopleData || [])]}
              contentContainerStyle={searchResultContainer}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateByPath(item)} activeOpacity={1}>
                  <Highlighter
                    highlightStyle={searchResultHighLightTextStyle}
                    searchWords={[searchInput]}
                    textToHighlight={item?.title || item?.name}
                    style={searchResultTextStyle}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </>
      ) : (
        <ResultGrid>
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
              {suggestionLinks.map((link: { text: string; link: string }) => (
                <Button
                  key={link.link}
                  link
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                  onPress={() => navigateByPath({ path: link.link })}
                >
                  {link.text}
                </Button>
              ))}
            </SuggestionWrapper>
          )}

          <Grid
            items={search?.items || []}
            title={search?.title || ''}
            numColumns={numOfColums}
            element={{
              width: percentageWidth(elementWidth),
              height: percentageWidth(elementHeight),
              marginBottom: 20,
              marginHorizontal: isTablet() ? 3 : 5,
            }}
            containerStyles={containerStyles}
            listStyles={listStyles}
          />
        </ResultGrid>
      )}
    </Scroll>
  );
};

export default withTheme(Search);
