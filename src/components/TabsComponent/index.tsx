import React from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { AppState } from '@store/modules/rootReducer';
import { useSelector } from 'react-redux';
import { Container, TabBar, TabLabel } from './styles';

const FirstRoute = () => <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />;

const SecondRoute = () => <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />;

const initialLayout = { width: Dimensions.get('window').width };

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

const TabsComponent = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, color, focus }: any) => (
        <TabLabel {...{ color, focus }}>{route.title}</TabLabel>
      )}
    />
  );

  return (
    <Container>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Container>
  );
};

export default TabsComponent;
