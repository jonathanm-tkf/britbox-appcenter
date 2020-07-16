/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { View, Platform } from 'react-native';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Header from '@components/Header';
import { useSelector } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Outstanding from '@components/Outstanding';
import { useNavigation } from 'react-navigation-hooks';
import { toggleTabs } from '@src/utils';
import NewSlider from '@components/NewSlider';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import { Container } from './styles';
import { items, Element } from './data';

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
};

const marginBottom = {
  marginBottom: 60,
};

const Home = () => {
  const theme = useSelector((state: AppState) => state.theme.theme);

  return (
    <View style={wrapper}>
      <CollapsibleHeaderFlatList
        CollapsibleHeaderComponent={<Header />}
        headerContainerBackgroundColor={theme.PRIMARY_COLOR}
        headerHeight={77}
        data={[0]}
        renderItem={() => <Item />}
        clipHeader
        keyExtractor={keyExtractor}
        style={marginBottom}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const keyExtractor = (item: number) => `${item}`;

const Item = () => {
  const { navigate, dangerouslyGetParent } = useNavigation();
  const parent = dangerouslyGetParent();

  const heroDiscoverMore = (item: Element) => {
    if (parent) {
      toggleTabs(parent, false);
    }
    navigate('Detail', { item });
  };

  return (
    <Container>
      {items.map((item: Element, key) => {
        if (item.template === 'hero') {
          return (
            <Outstanding
              key={key.toString()}
              item={item.item}
              onDiscoverMore={() => heroDiscoverMore(item)}
            />
          );
        }

        if (item.template === 'new') {
          return (
            <Fragment key={key.toString()}>
              <Row>
                <Headline>New to Britbox</Headline>
              </Row>
              <NewSlider data={item.items} />
            </Fragment>
          );
        }

        if (item.template === 'episodes') {
          return (
            <Fragment key={key.toString()}>
              <Row>
                <Headline>{item.title}</Headline>
              </Row>
              <Carousel
                items={item.items}
                listProps={{ horizontal: true }}
                renderItem={({ item: card }) => (
                  <Card newEpisode width={157} height={107} url={card.url} data={card.data} />
                )}
              />
            </Fragment>
          );
        }

        return (
          <Fragment key={key.toString()}>
            <Row>
              <Headline>{item.title}</Headline>
            </Row>
            <Carousel
              items={item.items}
              listProps={{ horizontal: true }}
              renderItem={({ item: card }) => <Card url={card.url} />}
            />
          </Fragment>
        );
      })}
      {/* {listings.map((listing) => (
        <Listing key={listing.id} {...{ listing }} />
      ))} */}
    </Container>
  );
};

export default Home;
