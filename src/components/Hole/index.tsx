import { Button } from '@components/Button';
import { getTextInConfigJSON } from '@src/utils/object';
import { hideIntroChromecast } from '@store/modules/core/actions';
import { AppState } from '@store/modules/rootReducer';
import { ThemeProps } from '@store/modules/theme/types';
import { rgba } from 'polished';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import GoogleCast from 'react-native-google-cast';
import { useDispatch, useSelector } from 'react-redux';
import { withTheme } from 'styled-components';
import { RNHoleView } from 'react-native-hole-view';
import { isTablet } from 'react-native-device-info';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HoleContent, HoleText } from './styles';

type Props = {
  readonly theme: ThemeProps;
};
const { height } = Dimensions.get('window');

const Hole = ({ theme }: Props) => {
  const dispatch = useDispatch();
  const [chromecastDevice, setChromecastDevice] = useState(false);
  const [fadeAnimation] = useState(new Animated.Value(0));
  const { introChromecast, isLogged, forceChromecast } = useSelector(
    (state: AppState) => state.core
  );
  const { loading, castPosition } = useSelector((state: AppState) => state.layout);

  const holeStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: rgba(theme.PRIMARY_COLOR_OPAQUE, 0.75),
  };

  useEffect(() => {
    async function getDevice() {
      await GoogleCast.getCastState().then((state) => {
        if (state !== 'NoDevicesAvailable') {
          setChromecastDevice(true);
        }
      });
    }
    getDevice();
  }, []);

  useEffect(() => {
    if (!loading && introChromecast && isLogged && (chromecastDevice || forceChromecast)) {
      setTimeout(() => {
        fadeIn();
      }, 500);
    }
  }, [loading, introChromecast, isLogged, chromecastDevice, forceChromecast]);

  useEffect(() => {
    if (!introChromecast) {
      fadeOut();
    }
  }, [introChromecast]);

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return introChromecast && isLogged ? (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
        },
        {
          opacity: fadeAnimation,
        },
      ]}
    >
      <HoleContent>
        <HoleText>{getTextInConfigJSON(['chromecast', 'intro'], '')}</HoleText>
        <Button
          stretch
          onPress={() => {
            dispatch(hideIntroChromecast());
          }}
        >
          {getTextInConfigJSON(['chromecast', 'button'], '')}
        </Button>
      </HoleContent>
      <RNHoleView
        style={holeStyles}
        holes={[
          {
            x: castPosition.x - (isTablet() ? 25 : 30),
            y: height - getBottomSpace() - 75 - (isTablet() ? 35 : 30) + castPosition.y,
            width: 120,
            height: 120,
            borderRadius: 60,
          },
        ]}
      />
    </Animated.View>
  ) : null;
};

export default withTheme(Hole);
