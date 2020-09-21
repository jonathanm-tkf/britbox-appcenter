/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-plusplus */
import { decode as atob } from 'base-64';
import { BritboxAccountApi } from '@src/sdks';

export const getExpirationDate = (jwtToken?: string): number | null => {
  if (!jwtToken) {
    return null;
  }

  const jwt = JSON.parse(atob(jwtToken.split('.')[1]));
  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

export const isExpired = (exp?: number | null) => {
  if (!exp) {
    return false;
  }

  return Date.now() > exp;
};

export const refreshToken = async (token: string, refresh: string) => {
  if (!token) {
    return false;
  }

  if (isExpired(getExpirationDate(token))) {
    const { refreshTokenApp: getRefreshToken } = BritboxAccountApi();

    try {
      const response = await getRefreshToken({
        refreshToken: refresh,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  return false;
};

export const refreshTokenWithExpiresIn = async (expiresIn: string, refresh: string) => {
  if (!expiresIn) {
    return false;
  }

  if (isExpired(Number(expiresIn))) {
    const { refreshTokenApp: getRefreshToken } = BritboxAccountApi();

    try {
      const response = await getRefreshToken({
        refreshToken: refresh,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  return false;
};

export const randomString = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const string_length = 8;
  let randomstring = '';
  for (let i = 0; i < string_length; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
};
