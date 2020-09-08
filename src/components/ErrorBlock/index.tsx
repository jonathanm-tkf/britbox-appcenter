/* eslint-disable no-unused-vars */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, Component } from 'react';
import { Animated } from 'react-native';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { ErrorText } from './styles';

class FadeInView extends Component {
  _visibility: Animated.Value = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    const { visible, style, children, ...rest } = this.props;

    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}

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
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 10,
  };

  useEffect(() => {
    if (visible) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [visible]);

  return (
    <FadeInView visible={show} duration={750} style={style} onFadeComplete={() => {}}>
      <ErrorText>{text}</ErrorText>
    </FadeInView>
  );
};

export default ErrorBlock;
