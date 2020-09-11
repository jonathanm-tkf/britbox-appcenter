import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { ErrorText } from './styles';

interface FadeInViewProps {
  visible?: boolean;
  duration?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const FadeInView = ({ visible, duration, style, children }: FadeInViewProps) => {
  const _visibility: Animated.Value = new Animated.Value(visible ? 1 : 0);
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
    }

    Animated.timing(_visibility, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [visible, _visibility, duration]);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const containerStyle = {
    opacity: _visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: _visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [1.1, 1],
        }),
      },
    ],
  };

  const combinedStyle = [containerStyle, style];

  return (
    <Animated.View style={show ? combinedStyle : containerStyle}>
      {show ? children : null}
    </Animated.View>
  );
};

interface Props {
  visible?: boolean;
  type?: string;
  text?: string;
}

const ErrorBlock = ({ visible = false, type = 'success', text = '' }: Props) => {
  const theme = useSelector((state: AppState) => state.theme.theme);
  const [show, setShow] = useState(visible);

  const style = {
    backgroundColor: type === 'success' ? theme.SUCCESS_COLOR : theme.ERROR_COLOR,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
  };

  useEffect(() => {
    if (visible) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [visible]);

  return (
    <FadeInView visible={show} duration={2000} style={style}>
      <ErrorText>{text}</ErrorText>
    </FadeInView>
  );
};

export default ErrorBlock;
