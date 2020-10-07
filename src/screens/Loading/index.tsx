/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { BritboxAPIContentModelsItemsGetItemRelatedListResponse } from '@src/sdks/Britbox.API.Content.TS/api';
import { getItemContent } from '@store/modules/home/saga';
import { setDeepLinkUrl } from '@store/modules/home/actions';
import { navigateByPath, navigate } from '@src/navigation/rootNavigation';

import { Logo } from '@assets/icons';
import { Container } from './styles';

const Loading = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state: AppState) => state.user.isLogged);

  const appWokeUp = async (event: any) => {
    const { url } = event;

    if (isLogged) {
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
              navigateByPath({ path: route[1], customId: true }, !(route[1] || '').includes('_'));
            }
          }
        }
      }
    } else {
      dispatch(setDeepLinkUrl(url));
      setTimeout(() => {
        navigate('Login');
      }, 200);
    }
  };

  useEffect(() => {
    Linking.addEventListener('url', appWokeUp);
  }, [appWokeUp, isLogged]);

  useEffect(() => {
    Linking.getInitialURL().then((url: string | null) => {
      if (url) {
        dispatch(setDeepLinkUrl(url));
        if (!isLogged) {
          setTimeout(() => {
            navigate('Login');
          }, 200);
        }
      }
    });
  }, []);

  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Loading;
