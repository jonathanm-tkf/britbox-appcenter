/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { getDeviceName } from 'react-native-device-info';

import { CloseIcon, Logo } from '@assets/icons';
import { AppState } from '@store/modules/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTextInConfigJSON } from '@src/utils/object';
import { isTablet } from '@src/utils/tablet';
import { device, loadingOff } from '@store/modules/layout/actions';
import FastImage from 'react-native-fast-image';
import { withTheme } from 'styled-components';
import { ThemeProps } from '@store/modules/theme/types';
// import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { Container, GettingInformation, GettingInformationText } from './styles';

type Props = {
  theme: ThemeProps;
};

const Loading = ({ theme }: Props) => {
  const { error, retry, finishedConfiguration } = useSelector((state: AppState) => state.layout);
  const { isLogged } = useSelector((state: AppState) => state.user);
  const { t } = useTranslation('layout');
  const dispatch = useDispatch();

  useEffect(() => {
    getDeviceName().then((name) => {
      dispatch(device(name));
    });
  }, []);

  useEffect(() => {
    if (finishedConfiguration) {
      if (!isLogged) {
        downloadAssetsAuth();
      } else {
        dispatch(loadingOff());
      }
    }
  }, [finishedConfiguration, isLogged]);

  const downloadAssetsAuth = async () => {
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

    await Promise.all(preFetchTasks).then((results) => {
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

export default withTheme(Loading);
