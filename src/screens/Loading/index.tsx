import React, { useEffect, useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import { BritboxAPIContentModelsItemsGetItemRelatedListResponse } from '@src/sdks/Britbox.API.Content.TS/api';
import { getItemContent } from '@store/modules/home/saga';
import { navigateByPath } from '@src/navigation/rootNavigation';

import { Logo } from '@assets/icons';
import { Container } from './styles';

const Loading = () => {
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
                navigateByPath(externalResponse);
              }
            }
          }
        }
      } else {
        const route = url?.split('www.britbox.com');
        if (route[1] && route[1] !== '') {
          if (/\/show\/|\/movie\/|\/season\/|\/episode\//.test(route[1] || '')) {
            navigateByPath({ path: route[1], customId: true });
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', appWokeUp);
  }, [appWokeUp]);

  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Loading;
