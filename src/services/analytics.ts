/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-globals */
/* eslint-disable default-case */
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { decode as atob } from 'base-64';
import { getUniqueId } from 'react-native-device-info';

type PageView = {
  key: string;
  name: string;
  params?: {
    item: MassiveSDKModelItemSummary;
  };
};

type User = {
  uid?: string;
};

type UserInformation = {
  id?: string;
  platform: string;
  account_status: string;
  device_name: string;
  os_version: string;
  isFreeTrail?: boolean;
  app_version: string;
  segment: string;
  readonly clientId?: string;
};

type TrackPageResult = {
  user?: UserInformation;
  terms?: {
    name: string;
    page: string;
  };
};

declare let userId: string | undefined;

const parseJwt = (token: string): User => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const getUserId = (token?: string) => {
  if (token && token !== '') {
    const { uid } = parseJwt(token);
    userId = uid;
  }
  return typeof userId !== 'undefined' ? { user: userId } : {};
};

export const TrackPageView = (
  { name, params }: PageView,
  token: string,
  userInformation: UserInformation
) => {
  const result: TrackPageResult = {};

  const { user } = getUserId(token);

  const {
    platform,
    account_status: accountStatus,
    device_name: deviceName,
    os_version: osVersion,
    app_version: appVersion,
    segment,
  } = userInformation;

  const clientId = getUniqueId();

  result.user = {
    id: user || '',
    platform,
    account_status: accountStatus,
    device_name: deviceName,
    os_version: osVersion,
    app_version: appVersion,
    segment,
    clientId,
  };

  if (name !== 'MyAccount' && name !== 'AccountSubscription' && params) {
    const pathArray = (params.item?.path || '').slice(1, (params.item?.path || '')?.length);
    const pathName = (pathArray || '')
      .replace('/', '.')
      .split('.')
      .reduceRight((item) => item);
    result.terms = {
      name: isNaN(Number(pathName)) ? pathName : params?.item?.title || '',
      page: `${(pathArray || '').replace('/', '.')}.page`,
    };
  } else {
    let pathName = '';
    let pageName = '';
    switch (name) {
      case 'Auth':
        pathName = '/paywall';
        pageName = 'paywall';
        break;
      case 'Login':
        pathName = '/signin';
        pageName = 'sign_in';
        break;
      case 'SignUp':
        pathName = '/signup';
        pageName = 'account.register';
        break;
      case 'SignUpSubscription':
        pathName = '/selectplan';
        pageName = 'account.add_card';
        break;
      case 'AccountSubscription':
        pathName = '/selectplan';
        pageName = 'account.add_card';
        break;
      case 'Home':
        pathName = '/';
        pageName = 'home';
        break;
      case 'Search':
        pathName = '/search';
        pageName = 'search';
        break;
      case 'Explore':
        pathName = '/explore';
        pageName = 'explore';
        break;
      case 'More':
        pathName = '/more';
        pageName = 'more';
        break;
      case 'ParentalControls':
        pathName = '/account/userprofile';
        pageName = 'account.parental_control';
        break;
      case 'PrivacyPolicy':
        pathName = '/privacy';
        pageName = 'information.privacy';
        break;
      case 'Terms':
        pathName = '/terms-and-conditions';
        pageName = 'terms_and_conditions';
        break;
      case 'MyAccount':
        pathName = '/account/userprofile';
        pageName = 'account.details';
        break;
      case 'MyAccount.Password':
        pathName = '/account/userprofile';
        pageName = 'account.password';
        break;
      case 'MyAccount.Subscription':
        pathName = '/account/userprofile';
        pageName = 'account.subscription';
        break;
      case 'MyAccount.Newsletter':
        pathName = '/account/userprofile';
        pageName = 'account.newsletter';
        break;
      case 'AZ':
        pathName = '/programmes';
        pageName = 'programmes';
        break;
      case 'Watchlist':
        pathName = '/account/watchlist';
        pageName = 'account.watchlist';
        break;
    }
    if (pathName && pageName) {
      result.terms = {
        name: pathName,
        page: `${pageName}.page`,
      };
    }
  }

  return result;
};

export const TrackEvent = () => {};
