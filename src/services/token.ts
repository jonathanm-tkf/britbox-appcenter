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
