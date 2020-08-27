import {
  Api as BritboxAccountApiInstance,
  RequestParams,
} from '@src/sdks/Britbox.API.Account.TS/api';

import { Api as BritboxContentApiInstance } from '@src/sdks/Britbox.API.Content.TS/api';

import { Api as BritboxSearchApiInstance } from '@src/sdks/Britbox.API.Search.TS/api';

import Constants from '@src/config/Constants';

const BritboxAccountApi = (baseApiParams?: RequestParams) => {
  const { v1 } = new BritboxAccountApiInstance({
    baseUrl: Constants.sdk_url,
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
    baseUrl: Constants.sdk_url,
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
    baseUrl: Constants.sdk_url,
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
