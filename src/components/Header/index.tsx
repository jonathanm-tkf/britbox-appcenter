/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import { logout } from '@store/modules/user/actions';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Container, Logo, LinksList, Gradient } from './styles';

interface DataElement {
  text: string;
  goTo: string;
  onPressTouch: (hide: boolean) => void;
}

function Item({ text, goTo, onPressTouch }: DataElement) {
  return (
    <Button
      link
      onPress={() => (goTo !== 'Logout' ? onPressTouch(true) : onPressTouch(false))}
      color="#FFF"
    >
      {text}
    </Button>
  );
}

interface Item {
  id: string;
}
interface Props {
  hideSignIn?: boolean;
  shadow?: boolean;
}

export default function Header({ hideSignIn, shadow }: Props) {
  const { t } = useTranslation('layout');
  const isLogged = useSelector((state: AppState) => state.core.isLogged);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const toggleSignIn = (value: boolean, goTo?: string) => {
    if (value && goTo) {
      navigate(goTo);
    } else {
      dispatch(logout());
    }
  };
  return (
    <Container>
      <Logo />
      {!hideSignIn && (
        <Animated.View>
          {!isLogged ? (
            <LinksList
              data={[
                {
                  id: '1',
                  text: t('signin'),
                  goTo: 'Login',
                },
              ]}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <Item
                  text={item.text}
                  goTo={item.goTo}
                  onPressTouch={(value) => toggleSignIn(value, item.goTo)}
                />
              )}
            />
          ) : (
            <LinksList
              data={[
                {
                  id: '2',
                  text: t('logout'),
                  goTo: 'Logout',
                },
              ]}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <Item
                  text={item.text}
                  goTo={item.goTo}
                  onPressTouch={(value) => toggleSignIn(value)}
                />
              )}
            />
          )}
        </Animated.View>
      )}
      {shadow && <Gradient />}
    </Container>
  );
}
