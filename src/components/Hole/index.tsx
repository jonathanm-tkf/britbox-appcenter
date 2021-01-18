/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@components/Button';
import { getTextInConfigJSON } from '@src/utils/object';
import { hideIntroChromecast } from '@store/modules/core/actions';
import { AppState } from '@store/modules/rootReducer';
import { ThemeProps } from '@store/modules/theme/types';
import { rgba } from 'polished';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withTheme } from 'styled-components';
import { RNHoleView } from 'react-native-hole-view';
import { isTablet } from 'react-native-device-info';
import { getDimensions } from '@src/utils/dimension';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HoleContent, HoleText } from './styles';

type Props = {
  readonly theme: ThemeProps;
};
const { height } = getDimensions();

const Hole = ({ theme }: Props) => {
  const dispatch = useDispatch();
  const [fadeAnimation] = useState(new Animated.Value(0));
  const { introChromecast, isLogged, forceChromecast } = useSelector(
    (state: AppState) => state.core
  );
  const { loading, castPosition, castDevice } = useSelector((state: AppState) => state.layout);

  const styles = StyleSheet.create({
    animate: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
    },
    hidden: {
      opacity: 0,
    },
    hole: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: rgba(theme.PRIMARY_COLOR_OPAQUE, 0.75),
    },
  });

  useEffect(() => {
    if (
      !loading &&
      introChromecast &&
      isLogged &&
      (castDevice || forceChromecast) &&
      castPosition.x !== 0 &&
      castPosition.y !== 0
    ) {
      setTimeout(() => {
        fadeIn();
      }, 500);
    }
  }, [loading, introChromecast, isLogged, castDevice, forceChromecast, castPosition]);

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

  return introChromecast &&
    isLogged &&
    (castDevice || forceChromecast) &&
    castPosition.x !== 0 &&
    castPosition.y !== 0 ? (
    <Animated.View
      style={[
        styles.animate,
        styles.hidden,
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
        style={styles.hole}
        holes={[
          {
            x: castPosition.x - (isTablet() ? 25 : 30),
            y: height - getBottomSpace() - 120 - (isTablet() ? 100 : 75) + (isTablet() ? 35 : 30),
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
