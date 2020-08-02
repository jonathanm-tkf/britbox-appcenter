import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
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
  sceneContainerStyle?: any;
  onChangeTab?: (index: number, key: string) => void;
}

type Scene = {
  route: {
    key: string;
    content: () => JSX.Element;
  };
};

const TabsComponent = ({ routes, sceneContainerStyle, onChangeTab }: Props) => {
  const [index, setIndex] = useState(0);
  const [data] = useState(routes);

  const renderScene = ({ route }: Scene) => {
    switch (route.key) {
      default:
        return route.content();
    }
  };

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
      {data.length > 0 ? (
        <TabView
          {...{ sceneContainerStyle }}
          navigationState={{ index, routes: data }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={(i) => {
            const { key } = routes[i];
            setIndex(i);
            if (onChangeTab) {
              onChangeTab(i, key);
            }
          }}
          // removeClippedSubviews={false}
          initialLayout={initialLayout}
          // initialLayout={{height: 0, width: Dimensions.get('window').width}}
        />
      ) : null}
    </Container>
  );
};

export default TabsComponent;
