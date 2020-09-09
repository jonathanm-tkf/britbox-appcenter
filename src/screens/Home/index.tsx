/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useCallback, useEffect } from 'react';
import { View, Platform, Linking } from 'react-native';
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
import { useNavigation, useNavigationState } from '@react-navigation/native';
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
  Hero,
} from '@screens/Shared';
import { getImage } from '@src/utils/images';
import UserWatching from '@components/UserWatching';
import { getItemContent } from '@store/modules/home/saga';
import {
  MassiveSDKModelItemSummary,
  BritboxAPIContentModelsItemsGetItemRelatedListResponse,
} from '@src/sdks/Britbox.API.Content.TS/api';

import Cast from '@screens/Shared/Cast';
import { navigateByPath } from '@src/navigation/rootNavigation';
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

  const appWokeUp = useCallback(async (url) => {
    if (url) {
      if (Platform.OS === 'ios') {
        const route = url?.split('://');

        if (route && route[1]) {
          const routeName = route[1]?.split('/');

          if (routeName && routeName[0]) {
            if (routeName[0] === 'watch' || routeName[0] === 'open') {
              const response: BritboxAPIContentModelsItemsGetItemRelatedListResponse = await getItemContent(
                routeName[1]
              );

              if (response && response?.externalResponse) {
                const { externalResponse } = response;
                navigateByPath(externalResponse);
              }
            }
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    Linking.getInitialURL().then((url: string | null) => {
      if (url) {
        appWokeUp(url);
      }
    });
  }, [appWokeUp]);

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
  const navigation = useNavigation();
  const { t } = useTranslation('home');

  const modal = (item: MassiveSDKModelItemSummary) => {
    if (item.type === 'movie' || item.type === 'episode') {
      return navigation.navigate('VideoPlayer', { item });
    }
    return navigateByPath(item);
  };
  const home = useSelector((state: AppState) => state.home.data);

  const heroDiscoverMore = (item: any) => {
    navigateByPath(item);
  };

  return (
    <Container>
      {/* <UserWatching data={ContinueWatchingData} /> */}

      {home &&
        home.entries &&
        home.entries.map((item, key) => {
          // if (item.template === 'user-watching') {
          //   return <UserWatching key={key.toString()} data={ContinueWatchingData} />;
          // }

          if ((item?.list?.items || []).length === 0) {
            return null;
          }

          switch (getTemplate(item.template || '')) {
            case 'hero':
              return (
                <Hero
                  key={key.toString()}
                  {...{ item }}
                  onPlay={(i: MassiveSDKModelItemSummary) => modal(i)}
                  onDiscoverMore={(i) => heroDiscoverMore(i)}
                />
              );
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

// import React, { useState, useEffect } from 'react';
// import { Button, FlatList, Image, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
// import GoogleCast, { CastButton, CastOptions } from 'react-native-google-cast';
// import styles from './main.style';

// function cast(video: CastOptions) {
//   GoogleCast.getCastDevice().then(console.log);
//   GoogleCast.castMedia(video);
//   GoogleCast.launchExpandedControls();
// }

// function registerListeners() {
//   const events = `
//     SESSION_STARTING SESSION_STARTED SESSION_START_FAILED SESSION_SUSPENDED
//     SESSION_RESUMING SESSION_RESUMED SESSION_ENDING SESSION_ENDED
//     MEDIA_STATUS_UPDATED MEDIA_PLAYBACK_STARTED MEDIA_PLAYBACK_ENDED MEDIA_PROGRESS_UPDATED
//     CHANNEL_CONNECTED CHANNEL_DISCONNECTED CHANNEL_MESSAGE_RECEIVED
//   `
//     .trim()
//     .split(/\s+/);

//   events.forEach((event) => {
//     GoogleCast.EventEmitter.addListener(GoogleCast[event]);
//   });
// }

// function RenderVideos({ item }) {
//   const video = item;

//   return (
//     <TouchableOpacity key={video.title} onPress={() => cast(video)} style={styles.midiaContainer}>
//       <Image source={{ uri: video.imageUrl }} style={styles.renderImg} />
//       <View style={styles.textMidia}>
//         <Text>{video.title}</Text>
//         <Text>{video.studio}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// export default function Main() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     registerListeners();

//     // device : {id, model, name, version}

//     const CAST_VIDEOS_URL =
//       'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/f.json';
//     fetch(CAST_VIDEOS_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         const mp4Url = data.categories[0].mp4;
//         const imagesUrl = data.categories[0].images;

//         setVideos({
//           video: data.categories[0].videos.map(
//             (video: {
//               [x: string]: any;
//               title: any;
//               subtitle: any;
//               studio: any;
//               duration: any;
//               sources: { url: any }[];
//             }) => ({
//               title: video.title,
//               subtitle: video.subtitle,
//               studio: video.studio,
//               duration: video.duration,
//               mediaUrl: mp4Url + video.sources[2].url,
//               imageUrl: imagesUrl + video['image-480x270'],
//               posterUrl: imagesUrl + video['image-780x1200'],
//             })
//           ),
//         });
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <View style={styles.toolbar}>
//           <CastButton style={styles.castButton} />

//           <Button title="Desconectar" onPress={() => GoogleCast.endSession()} />

//           <Button title="Abrir player" onPress={() => GoogleCast.launchExpandedControls()} />
//         </View>
//       </SafeAreaView>

//       <FlatList
//         data={videos.video}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => <RenderVideos item={item} />}
//       />
//     </View>
//   );
// }
