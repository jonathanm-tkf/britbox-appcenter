import { fill } from 'lodash';

export const dataDummy = {
  items: fill(new Array(15), {
    images: {
      poster: 'loading',
    },
  }),
  paging: {
    next:
      '/lists/a-z?order_by=a-z&use_custom_id=True&device=phone_iOS&segments=US&order=asc&page_size=24&sub=Subscriber&page=2&lang=en&c=unknown&v=0.0.0',
    page: 1,
    size: 24,
    total: 28,
    options: {
      order: 'asc',
      orderBy: 'a-z',
      pageSize: 24,
    },
  },
};
