/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import { Linking, Platform, ActivityIndicator, Image } from 'react-native';
import { BritboxAPIContentModelsItemsGetItemRelatedListResponse } from '@src/sdks/Britbox.API.Content.TS/api';
import { getItemContent } from '@store/modules/home/saga';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { isTablet } from 'react-native-device-info';

import { CloseIcon, Logo } from '@assets/icons';
import { AppState } from '@store/modules/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTextInConfigJSON } from '@src/utils/object';
import { loadingOff } from '@store/modules/layout/actions';
import FastImage from 'react-native-fast-image';
import { Container, GettingInformation, GettingInformationText } from './styles';

const Loading = () => {
  const { error, retry, finishedConfiguration } = useSelector((state: AppState) => state.layout);
  const theme = useSelector((state: AppState) => state.theme.theme);
  const { isLogged } = useSelector((state: AppState) => state.core);
  const { t } = useTranslation('layout');
  const dispatch = useDispatch();

  const appWokeUp = useCallback(async (event) => {
    const { url } = event;

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
                navigateByPath(externalResponse, routeName[0] === 'watch');
              }
            }
          }
        }
      } else {
        const route = url?.split('www.britbox.com');
        if (route[1] && route[1] !== '') {
          if (/\/show\/|\/movie\/|\/season\/|\/episode\//.test(route[1] || '')) {
            navigateByPath(
              { path: route[1], customId: true },
              /\/show\/|\/movie\/|\/episode\//.test(route[1] || '')
            );
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', appWokeUp);
  }, [appWokeUp]);

  useEffect(() => {
    if (finishedConfiguration) {
      downloadAssetsAuth();
    }
  }, [finishedConfiguration, isLogged]);

  const downloadAssetsAuth = () => {
    const images = isTablet()
      ? [
          getTextInConfigJSON(['paywall', '0', 'imageURL-tablet'], ''),
          getTextInConfigJSON(['paywall', '1', 'imageURL-tablet'], ''),
          getTextInConfigJSON(['paywall', '2', 'imageURL-tablet'], ''),
          getTextInConfigJSON(['paywall', '3', 'imageURL-tablet'], ''),
        ]
      : [
          getTextInConfigJSON(['paywall', '0', 'imageURL'], ''),
          getTextInConfigJSON(['paywall', '1', 'imageURL'], ''),
          getTextInConfigJSON(['paywall', '2', 'imageURL'], ''),
          getTextInConfigJSON(['paywall', '3', 'imageURL'], ''),
        ];

    const preFetchTasks: string[] = [];

    images.forEach((element) => {
      if (element) {
        FastImage.preload([{ uri: element }]);
        preFetchTasks.push(Image.prefetch(element));
      }
    });

    Promise.all(preFetchTasks).then((results) => {
      let downloadedAll = true;
      results.forEach((result) => {
        if (!result) {
          downloadedAll = false;
        }
      });

      if (downloadedAll) {
        dispatch(loadingOff());
      }
    });
  };

  return (
    <Container>
      <Logo />
      <GettingInformation>
        {error ? (
          <CloseIcon width={22} height={22} fill={theme.PRIMARY_FOREGROUND_COLOR} />
        ) : (
          <ActivityIndicator size={32} color={theme.PRIMARY_FOREGROUND_COLOR} />
        )}
        <GettingInformationText>
          {error
            ? t('gettingInformation.error')
            : retry > 1
            ? t('gettingInformation.retry')
            : t('gettingInformation.title')}
        </GettingInformationText>
      </GettingInformation>
    </Container>
  );
};

export default Loading;
