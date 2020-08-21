import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef: any = React.createRef();

export function navigate(name: any, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, ...args: any[]) {
  navigationRef.current?.dispatch(StackActions.push(name, ...args));
}

export function navigateByPath(item: any) {
  switch (true) {
    // case /\/show\//.test(item?.path || ''):
    //   push('Detail', { item });
    //   break;
    case item?.path === '/programmes':
      navigate('AZ');
      break;
    case item?.path === '/account/watchlist':
      break;
    case item?.path === '/':
      navigate('Home');
      break;
    case /\/show\/|\/movie\/|\/episode\//.test(item?.path || ''):
      push('Detail', { item });
      break;
    default:
      push('Collections', { item });
      break;
  }
}
