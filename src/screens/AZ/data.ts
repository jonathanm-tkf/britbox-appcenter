import { fill } from 'lodash';

export const dataDummy = {
  entries: [
    {
      template: 'Continuous Scroll Automatic',
      list: {
        items: fill(new Array(15), {
          images: {
            poster: 'loading',
          },
        }),
      },
    },
  ],
};
