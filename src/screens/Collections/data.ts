import { fill } from 'lodash';

export const dataDummy = {
  entries: [
    {
      template: 'Hero Slim (BBC)',
      list: {
        items: [{}],
      },
    },
    {
      template: 'P2',
      title: 'loading',
      list: {
        items: fill(new Array(5), {
          images: {
            poster: 'loading',
          },
        }),
      },
    },
    {
      template: '16:9 Tile (Reduced)',
      title: 'loading',
      list: {
        items: fill(new Array(5), {
          images: {
            tile: 'loading',
          },
        }),
      },
    },
  ],
};
