import React, { useEffect, useCallback } from 'react';
import { Linking } from 'react-native';

import { Logo } from '@assets/icons';
import { Container } from './styles';

const Loading = () => {
  const appWokeUp = useCallback((event) => {
    const { url } = event;
    console.tron.log(url);
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
