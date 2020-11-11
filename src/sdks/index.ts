import {
  Api as BritboxAccountApiInstance,
  RequestParams,
} from '@src/sdks/Britbox.API.Account.TS/api';

import { Api as BritboxContentApiInstance } from '@src/sdks/Britbox.API.Content.TS/api';

import { Api as BritboxSearchApiInstance } from '@src/sdks/Britbox.API.Search.TS/api';

import { Config } from '@src/utils/config';

const BritboxAccountApi = (baseApiParams?: RequestParams) => {
  const { v1 } = new BritboxAccountApiInstance({
    baseUrl: Config.SDK_URL,
    baseApiParams: baseApiParams || {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return v1;
};

const BritboxContentApi = (baseApiParams?: RequestParams) => {
  const { v1 } = new BritboxContentApiInstance({
    baseUrl: Config.SDK_URL,
    baseApiParams: baseApiParams || {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return v1;
};

const BritboxSearchApi = (baseApiParams?: RequestParams) => {
  const { v1 } = new BritboxSearchApiInstance({
    baseUrl: Config.SDK_URL,
    baseApiParams: baseApiParams || {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return v1;
};

export { BritboxAccountApi, BritboxContentApi, BritboxSearchApi };
