/* eslint-disable max-len */
interface Element {
  id: string;
  template: 'hero' | 'new' | 'carousel' | 'episodes' | 'user-watching';
  title?: string;
  item?: any;
  items?: any[];
}

export const items: Element[] = [
  // {
  //   id: 'hero',
  //   template: 'hero',
  //   item: {
  //     id: '1',
  //     url: '',
  //   },
  // },
  // {
  //   id: 'user-watching',
  //   template: 'user-watching',
  // },
  // {
  //   id: 'new',
  //   template: 'new',
  //   items: [
  //     {
  //       title: 'Beautiful and dramatic Antelope Canyon',
  //       illustration: 'https://i.imgur.com/UYiroysl.jpg',
  //     },
  //     {
  //       title: 'Earlier this morning, NYC',
  //       illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  //     },
  //     {
  //       title: 'White Pocket Sunset',
  //       illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  //     },
  //     {
  //       title: 'Acrocorinth, Greece',
  //       illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  //     },
  //     {
  //       title: 'The lone tree, majestic landscape of New Zealand',
  //       illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  //     },
  //     {
  //       title: 'Middle Earth, Germany',
  //       illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  //     },
  //   ],
  // },
  // {
  //   id: 'carousel',
  //   template: 'carousel',
  //   title: 'Popular',
  //   items: [
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //   ],
  // },
  {
    id: 'episodes',
    template: 'episodes',
    title: 'New episodes',
    items: [
      {
        url:
          'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',

        data: {
          title: 'Casually 1900s: London Hospital more text extensive',
          description: 'E68 - 56min',
        },
      },
      {
        url:
          'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
        data: {
          title: 'Coronation Street',
          description: 'E6 - 30min',
        },
      },
      {
        url:
          'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
        data: {
          title: 'Emmeralde',
          description: 'E74 - 30min',
        },
      },
      {
        url:
          'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
        data: {
          title: 'Coronation Street',
          description: 'E6 - 30min',
        },
      },
      {
        url:
          'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
        data: {
          title: 'Coronation Street',
          description: 'E6 - 30min',
        },
      },
      {
        url:
          'https://test.bbc-massive.com/isl/api/v1/dataservice/ResizeImage/$value?Format=%27jpg%27&Quality=85&ImageId=%27233178%27&EntityType=%27Item%27&EntityId=%277553%27&Width=1248&Height=702&device=web_browser&subscriptions=Subscriber&segmentationTags=us',
        data: {
          title: 'Coronation Street',
          description: 'E6 - 30min',
        },
      },
    ],
  },
  // {
  //   id: 'carousel2',
  //   template: 'carousel',
  //   title: 'Take your mind off with...',
  //   items: [
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //   ],
  // },
  // {
  //   id: 'carousel3',
  //   template: 'carousel',
  //   title: 'Beach Bodies',
  //   items: [
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //   ],
  // },
  // {
  //   id: 'carousel4',
  //   template: 'carousel',
  //   title: 'Feature in our newsletter',
  //   items: [
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //     {
  //       url:
  //         'https://img.reelgood.com/content/show/d77f6ae5-f4cc-4c4d-8e84-8e9725e64758/poster-780.jpg',
  //     },
  //   ],
  // },
];
