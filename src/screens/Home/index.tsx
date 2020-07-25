/* eslint-disable max-len */
import React, { Fragment, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Header from '@components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
import Outstanding from '@components/Outstanding';
import NewSlider from '@components/NewSlider';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
import UserWatching from '@components/UserWatching';
import { useNavigation } from '@react-navigation/native';
import { homeRequest } from '@store/modules/home/actions';
// import { getTemplate } from '@src/utils/template';
// import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
// import { useTranslation } from 'react-i18next';
// import { slice } from 'lodash';
import { Container } from './styles';
import { items, Element, continueWatchingItems } from './data';

const wrapper = {
  flex: 1,
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 10,
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeRequest());
  }, []);

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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const keyExtractor = (item: number) => `${item}`;

const Item = () => {
  const { navigate } = useNavigation();
  // const { t } = useTranslation('home');

  const modal = () => navigate('VideoPlayer');
  // const home = useSelector((state: AppState) => state.home.data);
  const home = {
    entries: items,
  };

  const heroDiscoverMore = (item: Element) => {
    navigate('Detail', { item });
  };

  return (
    <Container>
      {home &&
        home.entries &&
        home.entries.map((item, key) => {
          if (item.template === 'hero') {
            return (
              <Outstanding
                key={key.toString()}
                item={item.item}
                onPlay={modal}
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

          // if (getTemplate(item.template || '') === 'episodes') {
          //   return (item?.list?.items || []).length > 0 ? (
          //     <Fragment key={key.toString()}>
          //       <Row>
          //         <Headline>{item.title}</Headline>
          //       </Row>
          //       <Carousel
          //         items={slice(item?.list?.items, 0, 20)}
          //         listProps={{ horizontal: true }}
          //         renderItem={({ item: card }: { item: MassiveSDKModelItemSummary }) => (
          //           <Card
          //             isEpisode
          //             width={157}
          //             height={107}
          //             url={card.images?.wallpaper || ''}
          //             data={{
          //               title: card?.title || '',
          //               description:
          //                 card.type === 'movie'
          //                   ? card.shortDescription || ''
          //                   : card.type === 'show'
          //                   ? t('season', {
          //                       context: 'plural',
          //                       count: card?.availableSeasonCount,
          //                     })
          //                   : `E ${card.episodeNumber} - ${card.duration} min`,
          //             }}
          //           />
          //         )}
          //       />
          //     </Fragment>
          //   ) : null;
          // }
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
    </Container>
  );
};

export default Home;
