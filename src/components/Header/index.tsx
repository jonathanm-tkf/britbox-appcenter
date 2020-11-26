/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, memo } from 'react';
import { Dimensions } from 'react-native';
import { Button } from '@components/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { navigateByPath } from '@src/navigation/rootNavigation';
import { getDimensions } from '@src/utils/dimension';
import { analyticsRef } from '@src/utils/analytics';
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
  onPressSignIn?: () => void;
  style?: any;
  menuItems: any;
}

const Header = ({ hideSignIn, shadow, isCenter, onPressSignIn, style, menuItems }: Props) => {
  const { t } = useTranslation('layout');
  const isLogged = useSelector((state: AppState) => state.user.isLogged);
  const { navigate } = useNavigation();
  const [screenData, setScreenData] = useState(getDimensions());

  const toggleSignIn = (goTo: string) => {
    if (onPressSignIn) {
      onPressSignIn();
    }
    navigate(goTo);
  };

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return (
    <Container style={style}>
      {isCenter ? (
        <>
          <CenterLogoWrapper width={screenData.width}>
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
                  onPressTouch={() => {
                    navigateByPath({ path: item.goTo });
                    if (analyticsRef.current) {
                      analyticsRef.current.onTrackEvent({
                        type: 'event',
                        actionType: 'select',
                        actionName: item.text.toLocaleLowerCase(),
                        eventProperties: {
                          is_background: false,
                          container: 'Application',
                          result: item.text,
                          source: 'Britbox~App',
                          metadata: '',
                        },
                      });
                    }
                  }}
                />
              )}
            />
          )}
        </Animated.View>
      )}
      {shadow && <Gradient />}
    </Container>
  );
};

export default memo(Header);
