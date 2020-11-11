/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { BackIcon } from '@assets/icons';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Logo,
  Gradient,
  EmptyView,
  TopWrapper,
  BackButton,
  SideView,
  Title,
  CenterWrapper,
} from './styles';

interface Props {
  isBack?: boolean;
  leftComponent?: any;
  title?: string;
  rightComponent?: any;
  shadow?: boolean;
  onBack?: () => void;
}

export default function HeaderCustom({
  isBack = false,
  leftComponent = <EmptyView />,
  title = '',
  rightComponent = <EmptyView />,
  shadow = false,
  onBack,
}: Props) {
  const { goBack } = useNavigation();

  return (
    <Container>
      <TopWrapper>
        <SideView>
          {isBack ? (
            <BackButton onPress={() => (onBack ? onBack() : goBack())}>
              <BackIcon width={20} height={20} />
            </BackButton>
          ) : (
            leftComponent
          )}
        </SideView>
        {title === '' ? (
          <CenterWrapper>
            <Logo />
          </CenterWrapper>
        ) : (
          <CenterWrapper>
            <Title>{title}</Title>
          </CenterWrapper>
        )}
        {rightComponent}
      </TopWrapper>
      {shadow && <Gradient />}
    </Container>
  );
}
