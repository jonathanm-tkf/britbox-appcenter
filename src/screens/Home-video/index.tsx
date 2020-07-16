import React from 'react';

import { Button } from '@components/Button';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@store/modules/layout/actions';
import { Container } from './styles';

export default function Home() {
  const dispatch = useDispatch();

  const modal = () => dispatch(toggleModal());

  return (
    <Container>
      <Button onPress={modal}>Show Video Player</Button>
    </Container>
  );
}
