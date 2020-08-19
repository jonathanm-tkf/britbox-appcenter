/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { Dimensions } from 'react-native';

import Grid from '@components/Grid';
import Theme from './Theme';

const { width } = Dimensions.get('window');

const DATA: any = {
  id: 'Related-22878',
  title: 'Related',
  path: '',
  size: 18,
  items: [
    {
      type: 'show',
      id: '9314',
      title: 'Sherlock Holmes',
      contextualTitle: 'Sherlock Holmes',
      shortDescription:
        'Jeremy Brett, in a peerless portrayal of the classic character, stars in this faithful adaptation. From a blackmailed monarch to an abandoned Christmas goose, Holmes uses his acute perception and powers of observation to solve riddles and catch criminals.',
      path: '/show/Sherlock_Holmes_p04lq9tn',
      scopes: ['9314'],
      availableSeasonCount: 4,
      genres: ['mystery'],
      customId: 'p04lq9tn',
      offers: [],
      images: {
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='198803'&EntityType='Item'&EntityId='9314'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='198809'&EntityType='Item'&EntityId='9314'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='198805'&EntityType='Item'&EntityId='9314'&Width=2721&Height=1530&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='198811'&EntityType='Item'&EntityId='9314'&Width=2249&Height=1686&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='198807'&EntityType='Item'&EntityId='9314'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: '00C21833702BFD32A399E7F754968E4A',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Classic',
        NumberOfEpisodes: 41,
        YearRange: '1984 - 1994',
      },
    },
    {
      type: 'show',
      id: '9344',
      title: 'Rosemary and Thyme',
      contextualTitle: 'Rosemary and Thyme',
      shortDescription:
        'Rosemary Boxer and Laura Thyme are horticulturalists but murder and mayhem turn up wherever they go. Luckily, these two budding sleuths have a gift for unearthing clues and weeding out culprits.',
      path: '/show/Rosemary_and_Thyme_p04lq3s2',
      scopes: ['9344'],
      availableSeasonCount: 3,
      genres: ['mystery'],
      customId: 'p04lq3s2',
      offers: [],
      images: {
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193689'&EntityType='Item'&EntityId='9344'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193666'&EntityType='Item'&EntityId='9344'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193675'&EntityType='Item'&EntityId='9344'&Width=1024&Height=576&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193701'&EntityType='Item'&EntityId='9344'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193711'&EntityType='Item'&EntityId='9344'&Width=2880&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: '44281579D594B9A62F6B64E0DC1B0FC9',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Cozy',
        NumberOfEpisodes: 24,
        YearRange: '2003 - 2008',
      },
    },
    {
      type: 'show',
      id: '8934',
      title: 'The Moonstone',
      contextualTitle: 'The Moonstone',
      shortDescription:
        'Described by TS Eliot as "the first and greatest of English detective novels", the Moonstone follows a man\'s quest to find a stolen diamond and win the heart of his beloved.',
      path: '/show/The_Moonstone_FS_b0824cbr',
      scopes: ['8934'],
      availableSeasonCount: 1,
      genres: ['mystery'],
      customId: 'FS_b0824cbr',
      offers: [],
      images: {
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='189423'&EntityType='Item'&EntityId='8934'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182960'&EntityType='Item'&EntityId='8934'&Width=2400&Height=1350&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182962'&EntityType='Item'&EntityId='8934'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182964'&EntityType='Item'&EntityId='8934'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='189425'&EntityType='Item'&EntityId='8934'&Width=2560&Height=1920&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: '0FE184FFC1004F20E424DD474F1AA267',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Period',
        NumberOfEpisodes: 5,
        YearRange: 2016,
      },
    },
    {
      type: 'show',
      id: '6633',
      title: 'Jonathan Creek',
      contextualTitle: 'Jonathan Creek',
      shortDescription:
        'Jonathan Creek is Houdini-meets-whodunit: a quick-witted magician who devises feats of the impossible and unravels unsolvable crimes.',
      path: '/show/Jonathan_Creek_b008jg9q',
      scopes: ['6633'],
      availableSeasonCount: 7,
      genres: ['mystery'],
      customId: 'b008jg9q',
      offers: [],
      images: {
        hero3x1:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182155'&EntityType='Item'&EntityId='6633'&Width=3840&Height=1280&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='187286'&EntityType='Item'&EntityId='6633'&Width=2880&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182153'&EntityType='Item'&EntityId='6633'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182147'&EntityType='Item'&EntityId='6633'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182149'&EntityType='Item'&EntityId='6633'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182151'&EntityType='Item'&EntityId='6633'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        brand:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='182157'&EntityType='Item'&EntityId='6633'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: '23B4FEB561DF7ACBCC3D740EC430DF04',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Cozy',
        NumberOfEpisodes: 32,
        YearRange: '1997 - 2016',
      },
    },
    {
      type: 'show',
      id: '9389',
      title: 'The Sally Lockhart Mysteries',
      contextualTitle: 'The Sally Lockhart Mysteries',
      shortDescription:
        'Heroine Sally Lockhart (Billie Piper) is recently orphaned and on the quest for the truth.  Matt Smith (Doctor Who) co-stars, in his first professional role.',
      path: '/show/The_Sally_Lockhart_Mysteries_FS_b03qkcn7',
      scopes: ['9389'],
      availableSeasonCount: 1,
      genres: ['mystery'],
      customId: 'FS_b03qkcn7',
      offers: [],
      images: {
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='190377'&EntityType='Item'&EntityId='9389'&Width=1920&Height=1080&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='190375'&EntityType='Item'&EntityId='9389'&Width=2048&Height=1152&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='190381'&EntityType='Item'&EntityId='9389'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='190379'&EntityType='Item'&EntityId='9389'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='190383'&EntityType='Item'&EntityId='9389'&Width=2880&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: '3C0C15566B43D633FB817512E6D1DD74',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Period',
        NumberOfEpisodes: 2,
        YearRange: '2006 - 2007',
      },
    },
    {
      type: 'show',
      id: '8213',
      title: 'Scott & Bailey',
      contextualTitle: 'Scott & Bailey',
      shortDescription:
        'A police crime drama exploring the personal and professional lives of Detective Constable Rachel Bailey and Detective Constable Janet Scott. Despite obvious differences between them, they have developed a robust friendship.',
      path: '/show/Scott_and_Bailey_p046k2z1',
      scopes: ['8213'],
      availableSeasonCount: 5,
      genres: ['mystery'],
      customId: 'p046k2z1',
      offers: [],
      images: {
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193664'&EntityType='Item'&EntityId='8213'&Width=4096&Height=2304&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193679'&EntityType='Item'&EntityId='8213'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193693'&EntityType='Item'&EntityId='8213'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193704'&EntityType='Item'&EntityId='8213'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='193718'&EntityType='Item'&EntityId='8213'&Width=3840&Height=2880&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: 'B988FF7F43114C6F3C926C5B4544A7B5',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Procedural',
        NumberOfEpisodes: 33,
        YearRange: '2011 - 2016',
      },
    },
    {
      type: 'show',
      id: '8926',
      title: 'New Blood',
      contextualTitle: 'New Blood',
      shortDescription:
        'From Anthony Horowitz, this investigative mystery follows an unlikely pair of junior investigators forced to team up against a new breed of criminal: uber-rich and powerful corporations, individuals, and governments who hide behind legitimate facades.',
      path: '/show/New_Blood_FS_p03vfqsq',
      scopes: ['8926'],
      availableSeasonCount: 1,
      genres: ['mystery'],
      customId: 'FS_p03vfqsq',
      offers: [],
      images: {
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178100'&EntityType='Item'&EntityId='8926'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178084'&EntityType='Item'&EntityId='8926'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178106'&EntityType='Item'&EntityId='8926'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178113'&EntityType='Item'&EntityId='8926'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='178116'&EntityType='Item'&EntityId='8926'&Width=1600&Height=1200&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: '2D74AD81D09A70C9904DBBBEAE948D00',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Suspense',
        NumberOfEpisodes: 7,
        YearRange: 2016,
      },
    },
    {
      type: 'show',
      id: '12218',
      title: 'Miss Marple',
      contextualTitle: 'Miss Marple',
      shortDescription:
        "Gloriously remastered from the 16mm film, this detective drama features Agatha Christie's unassuming amateur sleuth solving a series of murders.",
      path: '/show/Miss_Marple_p05013b4',
      scopes: ['12218'],
      availableSeasonCount: 3,
      genres: ['mystery'],
      customId: 'p05013b4',
      offers: [],
      images: {
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='196171'&EntityType='Item'&EntityId='12218'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='196173'&EntityType='Item'&EntityId='12218'&Width=2285&Height=1285&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='196175'&EntityType='Item'&EntityId='12218'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='196177'&EntityType='Item'&EntityId='12218'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        brand:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='196179'&EntityType='Item'&EntityId='12218'&Width=1610&Height=537&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='196181'&EntityType='Item'&EntityId='12218'&Width=2560&Height=1920&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: 'E7336853BB6AB243A55CCA1A671B0BD6',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Classic',
        NumberOfEpisodes: 21,
        YearRange: '1984 - 1992',
      },
    },
    {
      type: 'show',
      id: '9124',
      title: 'The Ice House',
      contextualTitle: 'The Ice House',
      shortDescription:
        "Daniel Craig stars as investigator probing the mystery of a long-missing man found dead in a small village community, which seems determined to see the deceased's wife tried for his murder.",
      path: '/show/The_Ice_House_FS_p00tr2t0',
      scopes: ['9124'],
      availableSeasonCount: 1,
      genres: ['mystery'],
      customId: 'FS_p00tr2t0',
      offers: [],
      images: {
        square:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='188138'&EntityType='Item'&EntityId='9124'&Width=2160&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        poster:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='187760'&EntityType='Item'&EntityId='9124'&Width=1440&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        tile:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='187762'&EntityType='Item'&EntityId='9124'&Width=3840&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        block:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='187764'&EntityType='Item'&EntityId='9124'&Width=2880&Height=2160&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
        wallpaper:
          "https://stag.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format='jpg'&Quality=85&ImageId='187756'&EntityType='Item'&EntityId='9124'&Width=4096&Height=2304&device=phone_iOS&subscriptions=Subscriber&segmentationTags=US",
      },
      customFields: {
        IngestionHash: 'EEF509BDC2007FADE25E36D4C20FCDB5',
        Now: 'F',
        Premiere: 'F',
        Scripted: 'F',
        SubGenre: 'Procedural',
        NumberOfEpisodes: 2,
        YearRange: 1997,
      },
    },
  ],
  paging: {
    page: 1,
    size: 18,
    total: 1,
    options: {
      pageSize: 18,
    },
  },
};

storiesOf('Grid', module)
  .addDecorator(Theme)
  .add('default', () => (
    <Grid
      data={DATA.items}
      element={{ width: width - 40, marginBottom: 20 }}
      onPress={action('tapped-item')}
    />
  ))
  .add('title', () => (
    <Grid
      data={DATA.items}
      element={{ width: 100, height: 125 }}
      onPress={action('tapped-item')}
      title="Title Section"
    />
  ));
