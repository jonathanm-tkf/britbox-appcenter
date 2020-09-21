/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { Container, Logo, LinksList, Gradient, CenterLogoWrapper, Content } from './styles';

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

interface Props {
  hideSignIn?: boolean;
  shadow?: boolean;
  isCenter?: boolean;
}

type MenuItem = {
  id: string;
  text: string;
  goTo: string;
};

export default function Header({ hideSignIn, shadow, isCenter }: Props) {
  const { t } = useTranslation('layout');
  const isLogged = useSelector((state: AppState) => state.core.isLogged);
  const menu = useSelector((state: AppState) => state.core.menu?.navigation?.header); // TODO: get data from properties
  const { navigate } = useNavigation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // TODO: after get all properties remove this effect
    if (menu && menu.length > 0) {
      const items = menu
        .filter((item) => item.label !== 'Explore' && item.label !== 'Help')
        .map((item, index) => {
          return {
            id: index.toString(),
            text: item.label,
            goTo: item?.path || '',
          };
        });

      setMenuItems(items);
    }
  }, [menu]);

  const toggleSignIn = (goTo: string) => {
    navigate(goTo);
  };

  return (
    <Container>
      {isCenter ? (
        <>
          <CenterLogoWrapper>
            <Logo />
          </CenterLogoWrapper>
          <Content />
        </>
      ) : (
        <Logo />
      )}
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
                  onPressTouch={() => toggleSignIn(item.goTo)}
                />
              )}
            />
          ) : (
            <LinksList
              data={menuItems}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => (
                <Item
                  text={item.text}
                  goTo={item.goTo}
                  onPressTouch={() => navigateByPath({ path: item.goTo })}
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
