import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { SearchIcon, SearchDeleteIcon } from '@assets/icons';
import { Button } from '@components/Button';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { loadCollectionPage } from '@src/services/detail';
import { MassiveSDKModelPageEntry } from '@src/sdks/Britbox.API.Content.TS/api';
import Grid from '@screens/Shared/Grid';
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
} from './styles';

export default function Search() {
  const { t } = useTranslation('search');
  const theme = useSelector((state: AppState) => state.theme.theme);

  const [suggestions, setSuggestions] = useState<MassiveSDKModelPageEntry | undefined>(undefined);
  // const [error, setError] = useState(false);

  const getDataDetail = async () => {
    const { response } = await loadCollectionPage('/our-top-picks', 6);
    console.tron.log({ response });

    if ((response?.entries || []).length === 0) {
      // setError(true);
    } else {
      const { entries } = response || {};

      const item = (entries || []).reduce((e) => e);

      console.tron.log(item);
      setSuggestions(item);
    }
  };

  useEffect(() => {
    getDataDetail();
  }, []);

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
          <SearchInput placeholder={t('placeholder')} returnKeyType="done" />
          <SearchClearButton>
            <SearchDeleteIcon width={25} height={25} />
          </SearchClearButton>
        </SearchWrapper>
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

        <Grid items={suggestions?.list?.items || []} title={suggestions?.title || ''} />
      </Scroll>
    </Container>
  );
}
