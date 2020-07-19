import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Container, TabWrapper, TabBar, TabLabel, Indicator, IndicatorWrapper } from './styles';

type State = {
  key: string;
  title: string;
} & {
  content: () => JSX.Element;
};

const initialLayout = { width: Dimensions.get('window').width };

interface Props {
  routes: State[];
}

interface Scene {
  key: string;
  content: () => JSX.Element;
}

const TabsComponent = ({ routes }: Props) => {
  const [index, setIndex] = useState(0);
  const [data] = useState(routes);

  const getScenes = (): Record<string, any> => {
    const allScenes: any = {};
    routes.forEach((element: Scene) => {
      allScenes[element.key] = element.content;
    });

    return allScenes;
  };

  const renderScene = SceneMap(getScenes());

  const renderTabBar = (props: any & { navigationState: any }) => (
    <TabBar
      {...props}
      scrollEnabled
      renderLabel={({ route, color, focused }: any) => (
        <TabWrapper>
          <TabLabel {...{ color, focused }}>{route.title}</TabLabel>
          {focused && (
            <IndicatorWrapper>
              <Indicator />
            </IndicatorWrapper>
          )}
        </TabWrapper>
      )}
    />
  );

  return (
    <Container>
      <TabView
        navigationState={{ index, routes: data }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Container>
  );
};

export default TabsComponent;
