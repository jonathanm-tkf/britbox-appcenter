/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { View, Platform } from 'react-native';
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Header from '@components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '@store/modules/rootReducer';
// import Outstanding from '@components/Outstanding';
import NewSlider from '@components/NewSlider';
import { Headline } from '@components/Typography';
import { Row } from '@components/Layout';
import Carousel from '@components/Carousel';
import Card from '@components/Card';
// import UserWatching from '@components/UserWatching';
import { useNavigation } from '@react-navigation/native';
import { getTemplate } from '@src/utils/template';
import { useTranslation } from 'react-i18next';
import {
  New,
  Episodes,
  LargeProgramming,
  TitleTreatment,
  Popular,
  Standard,
  Genre,
  Collections,
} from '@screens/Shared';
import { Container } from './styles';
import { Element, continueWatchingItems } from './data';

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
  const { t } = useTranslation('home');

  const modal = () => navigate('VideoPlayer');
  const home = useSelector((state: AppState) => state.home.data);

  const heroDiscoverMore = (item: Element) => {
    navigate('Detail', { item });
  };

  return (
    <Container>
      {home &&
        home.entries &&
        home.entries.map((item, key) => {
          // if (item.template === 'hero') {
          //   return (
          //     <Outstanding
          //       key={key.toString()}
          //       item={item.item}
          //       onPlay={modal}
          //       onDiscoverMore={() => heroDiscoverMore(item)}
          //     />
          //   );
          // }
          // if (item.template === 'user-watching') {
          //   return <UserWatching key={key.toString()} data={ContinueWatchingData} />;
          // }

          if ((item?.list?.items || []).length === 0) {
            return null;
          }

          switch (getTemplate(item.template || '')) {
            case 'new':
              return <New key={key.toString()} {...{ item }} />;
            case 'episodes':
              return <Episodes key={key.toString()} {...{ item }} />;
            case 'large-programing':
              return <LargeProgramming key={key.toString()} {...{ item }} />;
            case 'title-treatment':
              return <TitleTreatment key={key.toString()} {...{ item }} />;
            case 'popular':
              return <Popular key={key.toString()} {...{ item }} />;
            case 'standard':
              return <Standard key={key.toString()} {...{ item }} />;
            case 'genre':
              return <Genre key={key.toString()} {...{ item }} />;
            case 'collections':
              return <Collections key={key.toString()} {...{ item }} />;
            default:
              return null;
          }
        })}
    </Container>
  );
};

export default Home;
