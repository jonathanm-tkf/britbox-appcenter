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
import UserWatching from '@components/UserWatching';
import { Container } from './styles';
import { items, Element, continueWatchingItems } from './data';

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
};

const marginBottom = {
  marginBottom: Platform.OS === 'ios' ? 40 : 20,
};

const ContinueWatchingData = [
  {
    key: 0,
    label: 'Continue Watching',
    active: true,
    content: () => (
      <Carousel
        items={continueWatchingItems}
        listProps={{ horizontal: true }}
        renderItem={({ item: card }) => (
          <Card
            isContinue
            newEpisode
            width={157}
            height={107}
            url={card.url}
            data={card.data}
            actionText={card.data.actionText}
            onRemove={() => {}}
          />
        )}
      />
    ),
  },
  {
    key: 1,
    label: 'Watchlist',
    active: false,
    content: () => (
      <Carousel
        items={continueWatchingItems}
        listProps={{ horizontal: true }}
        renderItem={({ item: card }) => (
          <Card width={122} height={162} url={card.url} data={card.data} onRemove={() => {}} />
        )}
      />
    ),
  },
];

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

        if (item.template === 'user-watching') {
          return <UserWatching key={key.toString()} data={ContinueWatchingData} />;
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
                  <Card isEpisode width={157} height={107} url={card.url} data={card.data} />
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
