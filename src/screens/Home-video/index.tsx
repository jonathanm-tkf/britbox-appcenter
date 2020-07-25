import React from 'react';

import { Button } from '@components/Button';
import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      <Button onPress={modal}>Show Video Player</Button>
    </Container>
  );
}
