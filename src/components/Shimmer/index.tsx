import React, { useEffect, useState, ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ContentHidden } from './styles';

type Props = {
  shimmerComponent: () => ReactNode;
  children: ReactNode;
  visible: boolean;
  style?: StyleProp<ViewStyle>;
};

const Shimmer = ({ style, visible = false, children, shimmerComponent }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    }
  }, [visible]);

  return (
    <View style={!isVisible ? [styles.container, style] : []}>
      {!isVisible ? (
        <View style={{ flex: 1 }}>
          {shimmerComponent && shimmerComponent()}
          <ContentHidden>{children}</ContentHidden>
        </View>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default Shimmer;
