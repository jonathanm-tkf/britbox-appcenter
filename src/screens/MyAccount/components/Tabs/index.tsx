/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Animated, Keyboard } from 'react-native';
import { TabView } from 'react-native-tab-view';
import HeaderCustom from '@components/HeaderCustom';
import { useTranslation } from 'react-i18next';
import { useNavigation, CommonActions } from '@react-navigation/native';

import {
  TitleWrapper,
  Title,
  Header,
  TabWrapper,
  TabLabel,
  IndicatorWrapper,
  Indicator,
  TabBar,
  SafeAreaView,
} from './styles';

const TabBarHeight = 48;
const HeaderHeight = 90;
const windowHeight = Dimensions.get('window').height;

type TabSceneProps = {
  data: any;
  renderItem: any;
  onGetRef: any;
  scrollY: any;
  onScrollEndDrag: any;
  onMomentumScrollEnd: any;
  onMomentumScrollBegin: any;
};

const TabScene = ({
  data,
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}: TabSceneProps) => {
  const contentContainerStyle = {
    paddingTop: HeaderHeight + TabBarHeight,
    minHeight: windowHeight - TabBarHeight,
  };

  return (
    <Animated.FlatList
      scrollToOverflowEnabled
      ref={onGetRef}
      bounces={false}
      scrollEventThrottle={1}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      })}
      keyboardShouldPersistTaps="handled"
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={contentContainerStyle}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_: undefined, index: number) => index.toString()}
    />
  );
};

type Scene = {
  route: {
    key: string;
    content: () => JSX.Element;
  };
};
type State = {
  key: string;
  title: string;
} & {
  content: () => JSX.Element;
};

interface Props {
  routes: State[];
  subscriptionSelected: boolean;
  onTabChanged: (index: number) => void;
}

const Tabs = ({ routes, subscriptionSelected, onTabChanged }: Props) => {
  const [tabIndex, setIndex] = useState(0);
  const scrollY: any = useRef(new Animated.Value(0)).current;
  const listRefArr: any = useRef([]);
  const listOffset: any = useRef({});
  const isListGliding = useRef(false);
  const { t } = useTranslation(['myaccount', 'signup']);
  const { dispatch } = useNavigation();

  useEffect(() => {
    scrollY.addListener(({ value }: { value: number }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  useEffect(() => {
    if (subscriptionSelected) {
      // Index 2 is equal subscription
      setTimeout(() => {
        setIndex(2);
      }, 1000);
    }
  }, [subscriptionSelected]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(
      (item: {
        value: { scrollToOffset: (item: Record<string, unknown>) => void };
        key: string;
      }) => {
        if (item.key !== curRouteKey) {
          if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: scrollY._value,
                animated: false,
              });
              listOffset.current[item.key] = scrollY._value;
            }
          } else if (scrollY._value >= HeaderHeight) {
            if (
              listOffset.current[item.key] < HeaderHeight ||
              listOffset.current[item.key] == null
            ) {
              if (item.value) {
                item.value.scrollToOffset({
                  offset: HeaderHeight,
                  animated: false,
                });
                listOffset.current[item.key] = HeaderHeight;
              }
            }
          }
        }
      }
    );
  };

  const syncScrollOffsetTop = (isTop: boolean) => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(
      (item: {
        value: { scrollToOffset: (item: Record<string, unknown>) => void };
        key: string;
      }) => {
        if (item.key !== curRouteKey) {
          if (item.value) {
            if ((scrollY._value ?? 0) <= HeaderHeight) {
              item.value.scrollToOffset({
                offset: isTop ? HeaderHeight : 0,
                animated: true,
              });
              listOffset.current[item.key] = isTop ? HeaderHeight : 0;
            }
          }
        }
      }
    );
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidShow = () => {
    syncScrollOffsetTop(true);
  };

  const keyboardDidHide = () => {
    syncScrollOffsetTop(false);
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
    });

    return (
      <Header style={[styles.header, { transform: [{ translateY: y }] }]}>
        <TitleWrapper>
          <Title>{t('myaccount.screentitle')}</Title>
        </TitleWrapper>
      </Header>
    );
  };

  const renderScene = ({ route }: Scene) => {
    return (
      <TabScene
        data={[{}]}
        renderItem={() => route.content()}
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onGetRef={(ref: any) => {
          if (ref) {
            const found = listRefArr.current.find((e: { key: string }) => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
      />
    );
  };

  const renderTabBar = (props: any) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolateRight: 'clamp',
    });

    const tabBarWrapperStyle = {
      top: 0,
      zIndex: 1,
      position: 'absolute',
      transform: [{ translateY: y }],
      width: '100%',
    };

    return (
      <Animated.View style={tabBarWrapperStyle}>
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
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={(index) => {
          setIndex(index);
          onTabChanged(index);
        }}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={{ position: 'absolute', width: '100%', zIndex: 3 }}>
        <HeaderCustom
          isBack
          shadow
          onBack={() => {
            dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'More' }],
              })
            );
          }}
        />
      </View>
      <View style={{ flex: 1, marginTop: 75 }}>
        {renderTabView()}
        {renderHeader()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: 90,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#171b23',
    zIndex: 2,
  },
  label: { fontSize: 16, color: '#FFF' },
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: '#171b23' },
  indicator: { backgroundColor: '#FFF' },
});

export default Tabs;
