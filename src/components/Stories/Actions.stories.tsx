/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { SafeAreaView } from 'react-native';

import Actions from '@components/Actions';
import { MassiveSDKModelItemList } from '@src/sdks/Britbox.API.Content.TS/api';
import Theme from './Theme';

const DATA = {
  items: [
    {
      type: 'season',
      id: '33854',
      title: 'Our Girl S4',
      contextualTitle: 'Season 4',
      shortDescription:
        'In this riveting female-led drama, Michelle Keegan stars as Sergeant Georgie Lane, who must face painful memories as she returns to Afghanistan.',
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/season/Our_Girl_S4_m000gpkx',
      scopes: ['33854'],
      releaseYear: 2020,
      episodeCount: 6,
      availableEpisodeCount: 2,
      seasonNumber: 4,
      showId: '18100',
      showTitle: 'Our Girl',
      badge: 'New',
      genres: ['Drama'],
      customId: 'm000gpkx',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['33854'],
        },
      ],
      images: {
        block:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268326'&EntityType='Item'&EntityId='33854'&Width=2560&Height=1920&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268298'&EntityType='Item'&EntityId='33854'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        brand:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268309'&EntityType='Item'&EntityId='33854'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268304'&EntityType='Item'&EntityId='33854'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        square:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268340'&EntityType='Item'&EntityId='33854'&Width=2400&Height=2400&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268314'&EntityType='Item'&EntityId='33854'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        poster:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268321'&EntityType='Item'&EntityId='33854'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
      customFields: {
        IngestionHash: '3895DB42441649507F235985A7661C49',
        Now: 'F',
        PDD: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Female-Led',
        NumberOfEpisodes: 6,
      },
    },
    {
      type: 'show',
      id: '26377',
      title: 'Good Neighbors',
      contextualTitle: 'Good Neighbors',
      shortDescription:
        'The Goods leave behind the irritations of the everyday and embrace the simple life, much to the horror of the neighbors next door.',
      path: '/show/Good_Neighbors_b00732tl',
      scopes: ['26377'],
      availableSeasonCount: 4,
      genres: ['Comedy'],
      customId: 'b00732tl',
      offers: [],
      images: {
        custom5:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='254277'&EntityType='Item'&EntityId='26377'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        logolight:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='254279'&EntityType='Item'&EntityId='26377'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        custom4:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='254283'&EntityType='Item'&EntityId='26377'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        custom6:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='254285'&EntityType='Item'&EntityId='26377'&Width=2400&Height=2400&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        custom3:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='254281'&EntityType='Item'&EntityId='26377'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='250075'&EntityType='Item'&EntityId='26377'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        block:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268260'&EntityType='Item'&EntityId='26377'&Width=2560&Height=1920&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        square:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268264'&EntityType='Item'&EntityId='26377'&Width=2400&Height=2400&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268266'&EntityType='Item'&EntityId='26377'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='250071'&EntityType='Item'&EntityId='26377'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        wide2x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='254287'&EntityType='Item'&EntityId='26377'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        poster:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268262'&EntityType='Item'&EntityId='26377'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
      customFields: {
        IngestionHash: '8DB24A34864F15C6042549ED1A3C89C0',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Classic',
        NumberOfEpisodes: 29,
        YearRange: '1975 - 1977',
      },
    },
    {
      type: 'show',
      id: '11710',
      title: 'To the Manor Born',
      contextualTitle: 'To the Manor Born',
      shortDescription:
        'Snobbish Audrey fforbes-Hamilton is forced to sell her stately home and decides to show the new owner a thing or two about “nobility”.',
      path: '/show/To_the_Manor_Born_b008nd1q',
      scopes: ['11710'],
      availableSeasonCount: 4,
      genres: ['Comedy'],
      customId: 'b008nd1q',
      offers: [],
      images: {
        custom4:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='258420'&EntityType='Item'&EntityId='11710'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        custom5:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='258414'&EntityType='Item'&EntityId='11710'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='247365'&EntityType='Item'&EntityId='11710'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        custom6:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='258422'&EntityType='Item'&EntityId='11710'&Width=2400&Height=2400&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        poster:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='247371'&EntityType='Item'&EntityId='11710'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        logolight:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='258416'&EntityType='Item'&EntityId='11710'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        square:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='247373'&EntityType='Item'&EntityId='11710'&Width=2400&Height=2400&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        brand:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='247367'&EntityType='Item'&EntityId='11710'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        custom3:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='258418'&EntityType='Item'&EntityId='11710'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='247369'&EntityType='Item'&EntityId='11710'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='247375'&EntityType='Item'&EntityId='11710'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        block:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='247363'&EntityType='Item'&EntityId='11710'&Width=2560&Height=1920&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        wide2x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='258424'&EntityType='Item'&EntityId='11710'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
      customFields: {
        IngestionHash: '412E12F0DE9F4289391D34D982A142B8',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'T',
        SubGenre: 'Sitcoms',
        NumberOfEpisodes: 22,
        YearRange: '1979 - 2007',
      },
    },
    {
      type: 'season',
      id: '33050',
      title: 'Death in Paradise S9',
      contextualTitle: 'Season 9',
      shortDescription:
        "Saint Marie welcomes a new DI, but the Caribbean island isn't exactly his idea of paradise. New episodes every Sunday.",
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/season/Death_in_Paradise_S9_m000d2td',
      scopes: ['33050'],
      releaseYear: 2020,
      episodeCount: 8,
      availableEpisodeCount: 6,
      seasonNumber: 9,
      showId: '24258',
      showTitle: 'Death in Paradise',
      genres: ['Mystery'],
      customId: 'm000d2td',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['33050'],
        },
      ],
      images: {
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='265351'&EntityType='Item'&EntityId='33050'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='270144'&EntityType='Item'&EntityId='33050'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        brand:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='265353'&EntityType='Item'&EntityId='33050'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        block:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='265359'&EntityType='Item'&EntityId='33050'&Width=2560&Height=1920&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        square:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='265349'&EntityType='Item'&EntityId='33050'&Width=2400&Height=2400&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='265355'&EntityType='Item'&EntityId='33050'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        poster:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='265357'&EntityType='Item'&EntityId='33050'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
      customFields: {
        IngestionHash: '26E36C550420B58F74015D70D14B3821',
        Now: 'F',
        PDD: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Cozy',
        NumberOfEpisodes: 8,
      },
    },
    {
      type: 'season',
      id: '33824',
      title: 'Autumnwatch 2020 S2',
      contextualTitle: '2020',
      shortDescription:
        "Autumnwatch is back to capture the beauty of this brilliant season with more footage of Britain's breathtaking wildlife. New episode arrives everyday.",
      classification: {
        code: 'TVPG-TV-G',
        name: 'TV-G',
      },
      path: '/season/Autumnwatch_2020_S2_m000nwy9',
      scopes: ['33824'],
      releaseYear: 2020,
      episodeCount: 8,
      availableEpisodeCount: 8,
      seasonNumber: 2,
      showId: '24617',
      showTitle: 'Autumnwatch',
      badge: 'New',
      genres: ['Factual'],
      customId: 'm000nwy9',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['33824'],
        },
      ],
      images: {
        brand:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268250'&EntityType='Item'&EntityId='33824'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268244'&EntityType='Item'&EntityId='33824'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268246'&EntityType='Item'&EntityId='33824'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        square:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268252'&EntityType='Item'&EntityId='33824'&Width=2400&Height=2400&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268248'&EntityType='Item'&EntityId='33824'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        poster:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268254'&EntityType='Item'&EntityId='33824'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        block:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268256'&EntityType='Item'&EntityId='33824'&Width=2560&Height=1920&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
      customFields: {
        IngestionHash: 'D6714126217244DE82E453A053720186',
        Now: 'F',
        PDD: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Animals',
        NumberOfEpisodes: 8,
      },
    },
    {
      type: 'link',
      id: '33531',
      title: 'Best of British Comedy',
      contextualTitle: 'Best of British Comedy',
      shortDescription: 'LinkItem',
      path: '/best_of_british_comedy',
      scopes: ['33531'],
      genres: [],
      customId: '',
      offers: [],
      images: {
        square:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268191'&EntityType='Item'&EntityId='33531'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268167'&EntityType='Item'&EntityId='33531'&Width=1920&Height=1080&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        brand:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268161'&EntityType='Item'&EntityId='33531'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268159'&EntityType='Item'&EntityId='33531'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268189'&EntityType='Item'&EntityId='33531'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US%2Cus_newapp",
      },
      customFields: {
        description:
          "In need of a laugh? Dive into the largest collection of classic British comedy, where we're serious about not being serious.",
      },
    },
  ],
};

const watchedList: MassiveSDKModelItemList = {
  id: 'ContinueWatching',
  title: 'Continue Watching',
  path: '/account/profiles/watched',
  size: 26,
  items: [
    {
      type: 'episode',
      id: '33767',
      title: "Dad's Army S1 E6",
      contextualTitle: '6. Shooting Pains',
      shortDescription:
        'The crew use their rifles and their wits to compete for the honour of guarding a VIP.',
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/episode/Dads_Army_S1_E6_b0077l66',
      watchPath: '/watch/Dads_Army_S1_E6_b0077l66',
      scopes: ['33767', '33759'],
      releaseYear: 1968,
      episodeNumber: 6,
      episodeName: 'Shooting Pains',
      showId: '33684',
      showTitle: "Dad's Army",
      seasonId: '33759',
      seasonTitle: 'Season 1',
      badge: 'New',
      genres: ['Comedy'],
      duration: 1779,
      customId: 'b0077l66',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['33767'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='270084'&EntityType='Item'&EntityId='33767'&Width=822&Height=463&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'False',
        IngestionHash: 'D400E4057B6FC1615A512ACA02619ED7.-1337568620',
        Now: 'F',
        PayloadId: '11096124,11096125',
        Premiere: 'F',
        PrimaryVpid: 'p08st6qj',
        SubGenre: 'Sitcoms',
      },
    },
    {
      type: 'episode',
      id: '31254',
      title: 'Best in Paradise S1 E1',
      contextualTitle: 'Arriving in Paradise',
      shortDescription:
        'When a policeman is found murdered in a locked room on the tiny paradise island of Sainte-Marie, DI Richard Poole is sent to investigate.',
      classification: {
        code: 'TVPG-TV-G',
        name: 'TV-G',
      },
      path: '/episode/Best_in_Paradise_S1_E1_p08h5fdy',
      watchPath: '/watch/Best_in_Paradise_S1_E1_p08h5fdy',
      scopes: ['31254', '31252'],
      releaseYear: 2020,
      episodeNumber: 1,
      episodeName: 'Arriving in Paradise',
      showId: '31251',
      showTitle: 'Best in Paradise',
      seasonId: '31252',
      seasonTitle: 'Season 1',
      genres: ['Mystery'],
      duration: 3559,
      customId: 'p08h5fdy',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['31254'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='237486'&EntityType='Item'&EntityId='31254'&Width=1280&Height=720&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'True',
        IngestionHash: '288A7C0FF9A139983999DC086AE86274.-1337568576',
        Now: 'F',
        PayloadId: '10572971,10572972',
        Premiere: 'T',
        PrimaryVpid: 'p08h5ff0',
        SubGenre: 'Cozy',
      },
    },
    {
      type: 'episode',
      id: '24478',
      title: '15 Days S1 E2',
      contextualTitle: '2. Episode 2',
      shortDescription:
        "The family discover that their mother has left their inheritance to uncle Huw. Rhys goes searching for his mother's missing diaries, and Nia and Sara to clean out Owen's room.",
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/episode/15_Days_S1_E2_p07l24yj',
      watchPath: '/watch/15_Days_S1_E2_p07l24yj',
      scopes: ['24478', '24475'],
      releaseYear: 2019,
      episodeNumber: 2,
      episodeName: 'Episode 2',
      showId: '24474',
      showTitle: '15 Days',
      seasonId: '24475',
      seasonTitle: 'Season 1',
      genres: ['Mystery'],
      duration: 2648,
      customId: 'p07l24yj',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['24478'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='207515'&EntityType='Item'&EntityId='24478'&Width=3236&Height=1820&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'True',
        IngestionHash: 'B854F0893C61EF0AAB57B6D810E5392D.-1337568569',
        Now: 'F',
        PayloadId: '10371904,10371903',
        Premiere: 'F',
        PrimaryVpid: 'p07l255q',
        SubGenre: 'Suspense',
      },
    },
    {
      type: 'episode',
      id: '33826',
      title: 'Autumnwatch S2 E4',
      contextualTitle: '4. Episode 4',
      shortDescription: 'Autumnwatch is inspired by Halloween.',
      classification: {
        code: 'TVPG-TV-G',
        name: 'TV-G',
      },
      path: '/episode/Autumnwatch_S2_E4_m000nx3q',
      watchPath: '/watch/Autumnwatch_S2_E4_m000nx3q',
      scopes: ['33826', '33824'],
      releaseYear: 2020,
      episodeNumber: 4,
      episodeName: 'Episode 4',
      showId: '24617',
      showTitle: 'Autumnwatch',
      seasonId: '33824',
      seasonTitle: '2020',
      badge: 'New',
      genres: ['Factual'],
      duration: 3541,
      customId: 'm000nx3q',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['33826'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='268069'&EntityType='Item'&EntityId='33826'&Width=1248&Height=702&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'True',
        IngestionHash: '413A20B9FA7A640AB3E2034A087D7A20.2020',
        Now: 'F',
        PayloadId: '11341903,11341904,11385224,11385225',
        Premiere: 'F',
        PrimaryVpid: 'm000nx3n',
        SubGenre: 'Animals',
      },
    },
    {
      type: 'episode',
      id: '21667',
      title: 'The Royal S2 E1',
      contextualTitle: '1. All at Sea',
      shortDescription: 'Eve Peterson comes to the Royal requiring an emergency hysterectomy.',
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/episode/The_Royal_S2_E1_p06vwhgd',
      watchPath: '/watch/The_Royal_S2_E1_p06vwhgd',
      scopes: ['21667', '21661'],
      releaseYear: 2003,
      episodeNumber: 1,
      episodeName: 'All at Sea',
      showId: '21652',
      showTitle: 'The Royal',
      seasonId: '21661',
      seasonTitle: 'Season 2',
      genres: ['Drama'],
      duration: 2890,
      customId: 'p06vwhgd',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['21667'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193150'&EntityType='Item'&EntityId='21667'&Width=1920&Height=1080&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'False',
        IngestionHash: 'E8BB06C1FF3F82BFC69E38C0ED42B2D9.-1337568521',
        Now: 'F',
        PayloadId: '10375711,10375710',
        Premiere: 'F',
        PrimaryVpid: 'p06vwhjj',
        SubGenre: 'Period',
      },
    },
    {
      type: 'episode',
      id: '11611',
      title: 'Ballykissangel S1 E1',
      contextualTitle: '1. Trying To Connect You',
      shortDescription:
        'Father Clifford arrives in Ballykissangel and arouses much interest, especially as he left his old parish unexpectedly.',
      classification: {
        code: 'TVPG-TV-G',
        name: 'TV-G',
      },
      path: '/episode/Ballykissangel_S1_E1_p03mnxp3',
      watchPath: '/watch/Ballykissangel_S1_E1_p03mnxp3',
      scopes: ['11611', '11605'],
      releaseYear: 1996,
      episodeNumber: 1,
      episodeName: 'Trying To Connect You',
      showId: '11604',
      showTitle: 'Ballykissangel',
      seasonId: '11605',
      seasonTitle: 'Season 1',
      genres: ['Drama'],
      duration: 2859,
      customId: 'p03mnxp3',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['11611'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='226289'&EntityType='Item'&EntityId='11611'&Width=1920&Height=1080&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'False',
        IngestionHash: 'F745D1FA169C8136C14E63A3EA9703D7.61555951',
        Now: 'F',
        PayloadId: '10334295,10334296',
        Premiere: 'F',
        PrimaryVpid: 'p03mvgxw',
        SubGenre: 'Light Drama',
      },
    },
    {
      type: 'episode',
      id: '14129',
      title: 'Alfresco S1 E1',
      contextualTitle: '1. Episode 1',
      shortDescription: 'Meet Wally and the Strom theatre-dance dance-theatre from Strom.',
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/episode/Alfresco_S1_E1_p05771jl',
      watchPath: '/watch/Alfresco_S1_E1_p05771jl',
      scopes: ['14129', '14119'],
      releaseYear: 1983,
      episodeNumber: 1,
      episodeName: 'Episode 1',
      showId: '14118',
      showTitle: 'Alfresco',
      seasonId: '14119',
      seasonTitle: 'Season 1',
      genres: ['Comedy'],
      duration: 1475,
      customId: 'p05771jl',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['14129'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='226178'&EntityType='Item'&EntityId='14129'&Width=1920&Height=1080&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'False',
        IngestionHash: 'F36E461EF5ADA0F88970BC5159B50C4B.6786007',
        Now: 'F',
        PayloadId: '10372401,10372399',
        Premiere: 'F',
        PrimaryVpid: 'p057720j',
        SubGenre: 'Sketch',
      },
    },
    {
      type: 'episode',
      id: '7143',
      title: 'A History of Ancient Britain S1 E1',
      contextualTitle: '1. Age of Ice',
      shortDescription:
        'Neil Oliver begins the epic story of the evolution of Britain and its occupants, beginning with the struggle for survival in the brutal world of the last ice age.',
      classification: {
        code: 'TVPG-TV-G',
        name: 'TV-G',
      },
      path: '/episode/A_History_of_Ancient_Britain_S1_E1_b00yk27f',
      watchPath: '/watch/A_History_of_Ancient_Britain_S1_E1_b00yk27f',
      scopes: ['7143', '6386'],
      releaseYear: 2011,
      episodeNumber: 1,
      episodeName: 'Age of Ice',
      showId: '6385',
      showTitle: 'A History of Ancient Britain',
      seasonId: '6386',
      seasonTitle: 'Season 1',
      genres: ['Factual'],
      duration: 3523,
      customId: 'b00yk27f',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['7143'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='226023'&EntityType='Item'&EntityId='7143'&Width=1248&Height=702&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        'Duration:CA': '01:00:00',
        HDFlag: 'True',
        IngestionHash: '0A27F83029734771FBD3B94E1F6B6EB9.61283391',
        Now: 'F',
        PayloadId: 10340632,
        Premiere: 'F',
        PrimaryVpid: 'p02jt47y',
        SubGenre: 'History',
      },
    },
    {
      type: 'episode',
      id: '17374',
      title: 'Spitting Image S1 E2',
      contextualTitle: '2. 03/04/1984',
      shortDescription:
        'While Mary Whitehouse was overtly offended by the first episode, Mr. Jeremy’s neighborly advice for the Iron Lady should be more to her liking.',
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/episode/Spitting_Image_S1_E2_p05zxqpj',
      watchPath: '/watch/Spitting_Image_S1_E2_p05zxqpj',
      scopes: ['17374', '17372'],
      releaseYear: 1984,
      episodeNumber: 2,
      episodeName: '03/04/1984',
      showId: '17371',
      showTitle: 'Spitting Image',
      seasonId: '17372',
      seasonTitle: 'Season 1',
      genres: ['Comedy'],
      duration: 1396,
      customId: 'p05zxqpj',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['17374'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178559'&EntityType='Item'&EntityId='17374'&Width=1920&Height=1080&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'False',
        IngestionHash: '0F209AB0FF6D590D506779D042B44B6D.-1337568540',
        Now: 'F',
        PayloadId: '10375167,10375166',
        Premiere: 'F',
        PrimaryVpid: 'p05zxsw6',
        SubGenre: 'Sketch',
      },
    },
    {
      type: 'episode',
      id: '26119',
      title: 'A Confession S1 E2',
      contextualTitle: '2. Episode 2',
      shortDescription:
        "Fulcher is faced with the possibility that a senior officer who committed suicide could be the man responsible for Sian's disappearance.",
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/episode/A_Confession_S1_E2_p0891fp3',
      watchPath: '/watch/A_Confession_S1_E2_p0891fp3',
      scopes: ['26119', '26114'],
      releaseYear: 2019,
      episodeNumber: 2,
      episodeName: 'Episode 2',
      showId: '26113',
      showTitle: 'A Confession',
      seasonId: '26114',
      seasonTitle: 'Season 1',
      genres: ['Mystery'],
      duration: 2695,
      customId: 'p0891fp3',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['26119'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='213625'&EntityType='Item'&EntityId='26119'&Width=3086&Height=1735&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        custom5:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='252860'&EntityType='Item'&EntityId='26119'&Width=3086&Height=1735&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'True',
        IngestionHash: 'E2D0E32E4601BFCAF00CA65A9D2603F6.878047544',
        Now: 'F',
        PayloadId: 10885425,
        Premiere: 'F',
        PrimaryVpid: 'p0891fv2',
        'RegionalVpid:AU': 'p08p014t',
        SubGenre: 'Procedural',
      },
    },
    {
      type: 'episode',
      id: '7760',
      title: 'Red Dwarf S2 E1',
      contextualTitle: '1. Kryten',
      shortDescription:
        'The Dwarfers respond to a distress call from the American Space cruiser Nova 5 and come in contact with its only living survivor, Kryten.',
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/episode/Red_Dwarf_S2_E1_p00bp2g9',
      watchPath: '/watch/Red_Dwarf_S2_E1_p00bp2g9',
      scopes: ['7760', '6619'],
      releaseYear: 1988,
      episodeNumber: 1,
      episodeName: 'Kryten',
      showId: '6301',
      showTitle: 'Red Dwarf',
      seasonId: '6619',
      seasonTitle: 'Season II',
      genres: ['Comedy'],
      duration: 1800,
      customId: 'p00bp2g9',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['7760'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='230368'&EntityType='Item'&EntityId='7760'&Width=1920&Height=1080&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'False',
        IngestionHash: '0B31D20A6B30CFC91F4ACB1BA68B8748.62493496',
        Now: 'F',
        PayloadId: '10336264,10336265',
        Premiere: 'F',
        PrimaryVpid: 'p02ktss3',
        SubGenre: 'SciFi & Fantasy',
      },
    },
    {
      type: 'episode',
      id: '11646',
      title: 'Aristocrats S1 E4',
      contextualTitle: '4. Episode 4',
      shortDescription:
        'Sarah returns to London from Paris, where she developed an unwanted reputation.',
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/episode/Aristocrats_S1_E4_p031g4s5',
      watchPath: '/watch/Aristocrats_S1_E4_p031g4s5',
      scopes: ['11646', '11643'],
      releaseYear: 1999,
      episodeNumber: 4,
      episodeName: 'Episode 4',
      showId: '11642',
      showTitle: 'Aristocrats',
      seasonId: '11643',
      seasonTitle: 'Season 1',
      genres: ['Drama'],
      duration: 2860,
      customId: 'p031g4s5',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['11646'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223175'&EntityType='Item'&EntityId='11646'&Width=2480&Height=1395&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'False',
        IngestionHash: '4463752B0ED9288D80CBE11870126C62.-1337568533',
        Now: 'F',
        PayloadId: '10334363,10334364',
        Premiere: 'F',
        PrimaryVpid: 'p049bprd',
        SubGenre: 'Period',
      },
    },
    {
      type: 'episode',
      id: '25829',
      title: 'Father Brown S3 E4',
      contextualTitle: '4. The Sign of the Broken Sword',
      shortDescription:
        'A murder at the local army barracks leads Father Brown to investigate another death at Dunkirk 13 years ago.',
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/episode/Father_Brown_S3_E4_b04xthql',
      watchPath: '/watch/Father_Brown_S3_E4_b04xthql',
      scopes: ['25829', '25817'],
      releaseYear: 2015,
      episodeNumber: 4,
      episodeName: 'The Sign of the Broken Sword',
      showId: '22700',
      showTitle: 'Father Brown',
      seasonId: '25817',
      seasonTitle: 'Season 3',
      genres: ['Mystery'],
      duration: 2700,
      customId: 'b04xthql',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['25829'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='211917'&EntityType='Item'&EntityId='25829'&Width=1248&Height=702&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'True',
        IngestionHash: '9D2C13C3135CF5AF26812365C1A2DAC9.689522',
        Now: 'F',
        PayloadId: 10692172,
        Premiere: 'F',
        PrimaryVpid: 'p086b1gd',
        SubGenre: 'Cozy',
      },
    },
    {
      type: 'episode',
      id: '8089',
      title: 'A Bit of Fry and Laurie S1 E2',
      contextualTitle: '2. Episode 2',
      shortDescription:
        'A man with an unpronounceable name calls on his local constabulary and a weathly man has a disagreement with a begger over the quality of his harmonica playing.',
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/episode/A_Bit_of_Fry_and_Laurie_S1_E2_p00bzcw1',
      watchPath: '/watch/A_Bit_of_Fry_and_Laurie_S1_E2_p00bzcw1',
      scopes: ['8089', '8084'],
      releaseYear: 1989,
      episodeNumber: 2,
      episodeName: 'Episode 2',
      showId: '6393',
      showTitle: 'A Bit of Fry and Laurie',
      seasonId: '8084',
      seasonTitle: 'Season 1',
      genres: ['Comedy'],
      duration: 1774,
      customId: 'p00bzcw1',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['8089'],
        },
      ],
      images: {
        custom5:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='265756'&EntityType='Item'&EntityId='8089'&Width=2444&Height=1374&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='225837'&EntityType='Item'&EntityId='8089'&Width=2444&Height=1374&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        wide2x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='265786'&EntityType='Item'&EntityId='8089'&Width=2443&Height=1374&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='225846'&EntityType='Item'&EntityId='8089'&Width=2443&Height=1374&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'False',
        IngestionHash: '5B1166717DF404FD65989458529C560D.878147253',
        Now: 'F',
        PayloadId: 10690908,
        Premiere: 'F',
        PrimaryVpid: 'p02xmkdg',
        SubGenre: 'Sketch',
      },
    },
    {
      type: 'episode',
      id: '14430',
      title: 'Dead Good Job S1 E1',
      contextualTitle: '1. Episode 1',
      shortDescription:
        'A terminally ill mother of two chooses to plan and arrange her own funeral.',
      classification: {
        code: 'TVPG-TV-PG',
        name: 'TV-PG',
      },
      path: '/episode/Dead_Good_Job_S1_E1_b01mqvq0',
      watchPath: '/watch/Dead_Good_Job_S1_E1_b01mqvq0',
      scopes: ['14430', '14427'],
      releaseYear: 2012,
      episodeNumber: 1,
      episodeName: 'Episode 1',
      showId: '14426',
      showTitle: 'Dead Good Job',
      seasonId: '14427',
      seasonTitle: 'Season 1',
      genres: ['Factual'],
      duration: 3000,
      customId: 'b01mqvq0',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['14430'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='222940'&EntityType='Item'&EntityId='14430'&Width=1248&Height=702&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'True',
        IngestionHash: '6B37D6D367E39BBCD42E12E6401FC4FE.-1337568520',
        Now: 'F',
        PayloadId: '10339955,10339956',
        Premiere: 'F',
        PrimaryVpid: 'p0318rn5',
        SubGenre: 'Educational',
      },
    },
    {
      type: 'episode',
      id: '25132',
      title: 'Silent Witness S23 E1',
      contextualTitle: '1. Deadhead, Part 1',
      shortDescription:
        'The Lyell team investigate the fatal crash of a private jet carrying an American diplomat.',
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/episode/Silent_Witness_S23_E1_m000d2pj',
      watchPath: '/watch/Silent_Witness_S23_E1_m000d2pj',
      scopes: ['25132', '25128'],
      releaseYear: 2020,
      episodeNumber: 1,
      episodeName: 'Deadhead, Part 1',
      showId: '10367',
      showTitle: 'Silent Witness',
      seasonId: '25128',
      seasonTitle: 'Season 23',
      genres: ['Mystery'],
      duration: 3420,
      customId: 'm000d2pj',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['25132'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='209346'&EntityType='Item'&EntityId='25132'&Width=1248&Height=702&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'True',
        IngestionHash: 'EA617B81F04292AE502E58B5BA1C5CB7.-1337568576',
        Now: 'F',
        PayloadId: '10337272,10337273',
        Premiere: 'F',
        PrimaryVpid: 'm000d2ph',
        SubGenre: 'Procedural',
      },
    },
    {
      type: 'movie',
      id: '13694',
      title: 'Gentlemen, The Queen',
      contextualTitle: 'Gentlemen, The Queen',
      shortDescription:
        "This 1953 film documenting The Queen's life includes footage from the Coronation of King George VI, her first broadcast, the Royal engagement, and Britain at war.",
      classification: {
        code: 'TVPG-TV-G',
        name: 'TV-G',
      },
      path: '/movie/Gentlemen_The_Queen_p053wrjq',
      watchPath: '/watch/Gentlemen_The_Queen_p053wrjq',
      scopes: ['13694'],
      releaseYear: 1953,
      genres: ['Factual'],
      duration: 2777,
      customId: 'p053wrjq',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['13694'],
        },
      ],
      images: {
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='220567'&EntityType='Item'&EntityId='13694'&Width=3840&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        custom2:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='214419'&EntityType='Item'&EntityId='13694'&Width=1620&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        square:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='203349'&EntityType='Item'&EntityId='13694'&Width=2160&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='243164'&EntityType='Item'&EntityId='13694'&Width=3840&Height=1280&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='220576'&EntityType='Item'&EntityId='13694'&Width=3840&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        poster:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='203351'&EntityType='Item'&EntityId='13694'&Width=1440&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'False',
        IngestionHash: '07793E723D6BC9A6FB11863168C66FC8',
        Now: 'F',
        PayloadId: '10371844,10371845',
        PDD: 'F',
        Premiere: 'F',
        PrimaryVpid: 'p053ws2h',
        Scripted: 'F',
        SubGenre: 'Royalty',
      },
    },
    {
      type: 'episode',
      id: '9862',
      title: 'Blue Murder S1 E2',
      contextualTitle: '2. Cry Me a River: Part 2',
      shortDescription:
        'Conclusion of the police drama. The stakes are raised in the race against time to solve the case, as Janine is hit by mounting problems both on the case and at home.',
      classification: {
        code: 'TVPG-TV-MA',
        name: 'TV-MA',
      },
      path: '/episode/Blue_Murder_S1_E2_p04m2903',
      watchPath: '/watch/Blue_Murder_S1_E2_p04m2903',
      scopes: ['9862', '9853'],
      releaseYear: 2003,
      episodeNumber: 2,
      episodeName: 'Cry Me a River: Part 2',
      showId: '9840',
      showTitle: 'Blue Murder',
      seasonId: '9853',
      seasonTitle: 'Season 1',
      genres: ['Mystery'],
      duration: 4140,
      customId: 'p04m2903',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['9862'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='228355'&EntityType='Item'&EntityId='9862'&Width=2008&Height=1129&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'False',
        IngestionHash: '9A31D78CB9196DEA2E73B66FBB505E37.8256872',
        Now: 'F',
        PayloadId: '10372613,10372612',
        Premiere: 'F',
        PrimaryVpid: 'p04nh473',
        SubGenre: 'Procedural',
      },
    },
    {
      type: 'episode',
      id: '23839',
      title: '35 Days S1 E2',
      contextualTitle: "2. Episode 2: Days to Jan's Death 29, 28, 27, 26...",
      shortDescription:
        'Jan makes her first full appearance on the Close. HUW, the prison officer and reluctant..',
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/episode/35_Days_S1_E2_p07gnqrc',
      watchPath: '/watch/35_Days_S1_E2_p07gnqrc',
      scopes: ['23839', '23832'],
      releaseYear: 2014,
      episodeNumber: 2,
      episodeName: "Episode 2: Days to Jan's Death 29, 28, 27, 26...",
      showId: '23831',
      showTitle: '35 Days',
      seasonId: '23832',
      seasonTitle: 'Season 1',
      genres: ['Mystery'],
      duration: 2826,
      customId: 'p07gnqrc',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['23839'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='204439'&EntityType='Item'&EntityId='23839'&Width=1920&Height=1080&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'True',
        IngestionHash: 'C6E66F246CA779462AFCAEF68CC916E5.-1337568518',
        Now: 'F',
        PayloadId: '10372017,10372018',
        Premiere: 'F',
        PrimaryVpid: 'p07gnrmz',
        SubGenre: 'Suspense',
      },
    },
    {
      type: 'episode',
      id: '12725',
      title: 'Campion S2 E1',
      contextualTitle: '1. Sweet Danger - Part 1',
      shortDescription:
        'Averna, a tiny Dalmatian state, has attracted interest from the bold, bad baron of commerce Brett Savanake. But its rightful heirs are the Fitton family.',
      classification: {
        code: 'TVPG-TV-G',
        name: 'TV-G',
      },
      path: '/episode/Campion_S2_E1_p04jltgz',
      watchPath: '/watch/Campion_S2_E1_p04jltgz',
      scopes: ['12725', '12723'],
      releaseYear: 1990,
      episodeNumber: 1,
      episodeName: 'Sweet Danger - Part 1',
      showId: '12722',
      showTitle: 'Campion',
      seasonId: '12723',
      seasonTitle: 'Season 2',
      genres: ['Drama'],
      duration: 3249,
      customId: 'p04jltgz',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['12725'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='234217'&EntityType='Item'&EntityId='12725'&Width=2832&Height=1593&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'False',
        IngestionHash: '62549610BB214358C3959B4CA03A0CAB.-1337568542',
        Now: 'F',
        PayloadId: '10372988,10372989',
        Premiere: 'F',
        PrimaryVpid: 'p04jlw40',
        SubGenre: 'Action & Adventure',
      },
    },
    {
      type: 'movie',
      id: '26187',
      title: 'Henry VIII',
      contextualTitle: 'Henry VIII',
      shortDescription:
        'An account of the political machinations surrounding the divorce of Henry VIII from Katharine of Aragon, the subsequent Reformation, and wedding to Anne Bullen and the birth of the future Queen Elizabeth I.',
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/movie/Henry_VIII_p08b0w6l',
      watchPath: '/watch/Henry_VIII_p08b0w6l',
      scopes: ['26187'],
      releaseYear: 1979,
      genres: ['Drama'],
      duration: 9892,
      customId: 'p08b0w6l',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['26187'],
        },
      ],
      images: {
        brand:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223456'&EntityType='Item'&EntityId='26187'&Width=1610&Height=537&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        custom2:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223451'&EntityType='Item'&EntityId='26187'&Width=1920&Height=2560&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223900'&EntityType='Item'&EntityId='26187'&Width=3840&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223454'&EntityType='Item'&EntityId='26187'&Width=3840&Height=1280&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223447'&EntityType='Item'&EntityId='26187'&Width=3840&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        poster:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223449'&EntityType='Item'&EntityId='26187'&Width=1440&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'False',
        IngestionHash: '11DAC5DAABE5859B8E8B56F9148E325F',
        Now: 'F',
        PayloadId: 10371761,
        PDD: 'F',
        Premiere: 'F',
        PrimaryVpid: 'p08b0w99',
        Scripted: 'F',
        SubGenre: 'Classic',
      },
    },
    {
      type: 'movie',
      id: '26195',
      title: 'BBC Television Shakespeare: Othello',
      contextualTitle: 'Othello',
      shortDescription:
        'Jealous at the promotion of the Moorish general Othello, Iago plots to secure his downfall by provoking him into believing his wife Desdemona is being unfaithful.',
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/movie/BBC_Television_Shakespeare_Othello_p08b11zn',
      watchPath: '/watch/BBC_Television_Shakespeare_Othello_p08b11zn',
      scopes: ['26195'],
      releaseYear: 1981,
      genres: ['Drama'],
      duration: 12237,
      customId: 'p08b11zn',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['26195'],
        },
      ],
      images: {
        custom2:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223553'&EntityType='Item'&EntityId='26195'&Width=1920&Height=2560&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        brand:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223565'&EntityType='Item'&EntityId='26195'&Width=1610&Height=537&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223561'&EntityType='Item'&EntityId='26195'&Width=3840&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        poster:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223548'&EntityType='Item'&EntityId='26195'&Width=1440&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        tile:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223545'&EntityType='Item'&EntityId='26195'&Width=3840&Height=2160&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        hero3x1:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223563'&EntityType='Item'&EntityId='26195'&Width=3840&Height=1280&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'False',
        IngestionHash: '01D48C1FDCC3AB40549DD792BE348885',
        Now: 'F',
        PayloadId: 10371774,
        PDD: 'F',
        Premiere: 'F',
        PrimaryVpid: 'p08b120q',
        Scripted: 'F',
        SubGenre: 'Classic',
      },
    },
    {
      type: 'episode',
      id: '11572',
      title: "Agatha Christie's Poirot S2 E10",
      contextualTitle: '10. The Adventure Of The Western Star',
      shortDescription:
        'When a Belgian film star receives threatening letters, she visits her old friend Poirot.',
      classification: {
        code: 'TVPG-TV-G',
        name: 'TV-G',
      },
      path: '/episode/Agatha_Christies_Poirot_S2_E10_p04m8r0k',
      watchPath: '/watch/Agatha_Christies_Poirot_S2_E10_p04m8r0k',
      scopes: ['11572', '11570'],
      releaseYear: 1990,
      episodeNumber: 10,
      episodeName: 'The Adventure Of The Western Star',
      showId: '11569',
      showTitle: "Agatha Christie's Poirot",
      seasonId: '11570',
      seasonTitle: 'Season 2',
      genres: ['Mystery'],
      duration: 3024,
      customId: 'p04m8r0k',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['11572'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='224460'&EntityType='Item'&EntityId='11572'&Width=2400&Height=1350&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'True',
        IngestionHash: 'E0EA7DB9689E14122C08DCFFDEE1486A.8256168',
        Now: 'F',
        PayloadId: '10372287,10372288',
        Premiere: 'F',
        PrimaryVpid: 'p04nd0v7',
        SubGenre: 'Classic',
      },
    },
    {
      type: 'episode',
      id: '11740',
      title: 'Charles II: The Power and the Passion S1 E1',
      contextualTitle: '1. Episode 1',
      shortDescription:
        'In 1660 after years in exile, Charles II is restored to the throne of England but is abandoned by his friend, the Duke of Buckingham.',
      classification: {
        code: 'TVPG-TV-MA',
        name: 'TV-MA',
      },
      path: '/episode/Charles_II_The_Power_and_the_Passion_S1_E1_p0112knb',
      watchPath: '/watch/Charles_II_The_Power_and_the_Passion_S1_E1_p0112knb',
      scopes: ['11740', '11736'],
      releaseYear: 2003,
      episodeNumber: 1,
      episodeName: 'Episode 1',
      showId: '11735',
      showTitle: 'Charles II: The Power and the Passion',
      seasonId: '11736',
      seasonTitle: 'Season 1',
      genres: ['Drama'],
      duration: 3600,
      customId: 'p0112knb',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['11740'],
        },
      ],
      images: {
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='223114'&EntityType='Item'&EntityId='11740'&Width=1248&Height=702&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'True',
        HDFlag: 'False',
        IngestionHash: '718465D0EAEBED24C9E64F5A1B3ABC2F.61556103',
        Now: 'F',
        PayloadId: '10334776,10334777',
        Premiere: 'F',
        PrimaryVpid: 'p02pmvjj',
        SubGenre: 'Royalty',
      },
    },
    {
      type: 'episode',
      id: '11752',
      title: 'A Touch of Frost S1 E3',
      contextualTitle: '3. Conclusions',
      shortDescription:
        "Frost has plenty on his plate when an MP's son is involved in a hit-and-run accident.",
      classification: {
        code: 'TVPG-TV-14',
        name: 'TV-14',
      },
      path: '/episode/A_Touch_of_Frost_S1_E3_p04lq6dr',
      watchPath: '/watch/A_Touch_of_Frost_S1_E3_p04lq6dr',
      scopes: ['11752', '11749'],
      releaseYear: 1992,
      episodeNumber: 3,
      episodeName: 'Conclusions',
      showId: '10008',
      showTitle: 'A Touch of Frost',
      seasonId: '11749',
      seasonTitle: 'Season 1',
      genres: ['Mystery'],
      duration: 6120,
      customId: 'p04lq6dr',
      offers: [
        {
          deliveryType: 'Stream',
          resolution: 'HD-1080',
          ownership: 'Subscription',
          availability: 'Available',
          scopes: ['11752'],
        },
      ],
      images: {
        custom5:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='266101'&EntityType='Item'&EntityId='11752'&Width=3192&Height=1795&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
        wallpaper:
          "https://us.britbox.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='226037'&EntityType='Item'&EntityId='11752'&Width=3192&Height=1795&device=web_browser&subscriptions=Anonymous&segmentationTags=US",
      },
      customFields: {
        CCFlag: 'True',
        DLFlag: 'False',
        HDFlag: 'False',
        IngestionHash: '7A138ACCD517311C4CC6E8EB5B0D7364.878147335',
        Now: 'F',
        PayloadId: 10733488,
        Premiere: 'F',
        PrimaryVpid: 'p04lq6h4',
        SubGenre: 'Procedural',
      },
    },
  ],
  paging: {
    next:
      '/account/profile/continue-watching/list?page=2&use_custom_id=True&segments=US&page_size=25&lang=en&show_item_type=episode',
    page: 1,
    size: 25,
    total: 2,
    authorization: {
      type: 'UserProfile',
      scope: 'Catalog',
    },
    options: {
      pageSize: 25,
    },
  },
  listData: {
    ContinueWatching: {
      itemInclusions: {},
    },
  },
};

storiesOf('Actions', module)
  .addDecorator(Theme)
  .add('default', () => (
    <SafeAreaView>
      <Actions item={DATA.items[1]} {...{ watchedList }} />
    </SafeAreaView>
  ));
