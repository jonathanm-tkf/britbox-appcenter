import ContentApi from './content-sdk/src/index';
import SearchApi from './search-sdk/src/index';
import AccountApi from './account-sdk/src/index';
import { cookieValuesToObject, getCookie } from '../global';

import constants from '../constants';

ContentApi.ApiClient.instance.basePath = constants[constants.environment].apiContent;
SearchApi.ApiClient.instance.basePath = constants[constants.environment].apiContent;
AccountApi.ApiClient.instance.basePath = constants[constants.environment].apiContent;

let JWToken = AccountApi.ApiClient.instance.authentications['JWToken'];

JWToken.apiKey = `Bearer ${getCookie('authkey')}`;

export const BritboxContentApi = {
  PageApi: ContentApi.PageApi,
  ItemsApi: ContentApi.ItemsApi,
  ListsApi: ContentApi.ListsApi
};

export const BritboxSearchApi = {
  SearchApi: SearchApi.SearchApi
};

export const BritboxAccountApi = {
  CustomerApi: AccountApi.CustomerApi,
  MediaApi: AccountApi.MediaFileApi,
  ProfileApi: AccountApi.ProfileApi,
  BritboxAPIAccountModelsAuthorizationRefreshTokenRequest:
    AccountApi.BritboxAPIAccountModelsAuthorizationRefreshTokenRequest
};

export const refreshToken = () => {
  JWToken.apiKey = `Bearer ${getCookie('authkey')}`;
};
