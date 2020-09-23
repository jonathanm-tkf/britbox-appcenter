import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef: any = React.createRef();

export function navigate(name: any, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, ...args: any[]) {
  navigationRef.current?.dispatch(StackActions.push(name, ...args));
}

export function navigateByPath(item: any, autoPlay?: boolean) {
  switch (true) {
    // case /\/show\//.test(item?.path || ''):
    //   push('Detail', { item });
    //   break;
    case item?.path === '/programmes':
      navigate('AZ');
      break;
    case item?.path === '/account/watchlist':
      navigate('Watchlist');
      break;
    case item?.path === '/':
      navigate('Home');
      break;
    case /\/name\//.test(item?.path || ''):
      push('ActorDetail', { item });
      break;
    case /\/show\/|\/season\/|\/movie\/|\/episode\//.test(item?.path || ''):
      push('Detail', { item, autoPlay });
      break;
    default:
      push('Collections', { item, autoPlay });
      break;
  }
}
