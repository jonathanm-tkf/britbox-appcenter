import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { decode as atob } from 'base-64';

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

const getUserId = (token?: string) => {
  if (token && token !== '') {
    const { uid } = parseJwt(token);
    userId = uid;
  }
  return typeof userId !== 'undefined' ? { user: userId } : {};
};

export const TrackPageView = (
  { params }: PageView,
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
  } = userInformation;

  if (user) {
    result.user = {
      id: user,
      platform,
      account_status: accountStatus,
      device_name: deviceName,
      os_version: osVersion,
    };
  }

  if (params) {
    const pathArray = (params.item?.path || '').slice(1, (params.item?.path || '')?.length);
    result.terms = {
      name: (pathArray || '')
        .replace('/', '.')
        .split('.')
        .reduceRight((item) => item),
      page: `${(pathArray || '').replace('/', '.')}.page`,
    };
  }

  return result;
};

export const TrackEvent = () => {};
