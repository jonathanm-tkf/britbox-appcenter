import * as React from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';

export const navigationRef: any = React.createRef();

export function navigate(name: any, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function push(name: string, ...args: any[]) {
  navigationRef.current?.dispatch(StackActions.push(name, ...args));
}

export function pop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export function navigateByPath(item: any, autoPlay?: boolean) {
  const route = navigationRef.current.getCurrentRoute();
  switch (true) {
    case item?.path === '/programmes':
      navigate('AZ');
      break;
    case item?.path === '/account/watchlist': {
      navigate(`${route.name}Watchlist`, { routeName: route.name });
      break;
    }
    case item?.path === '/':
      navigate('Home');
      break;
    case /\/name\//.test(item?.path || ''):
      push('ActorDetail', { item });
      break;
    case /\/show\/|\/season\/|\/movie\/|\/program\/|\/episode\//.test(item?.path || ''):
      push('Detail', { item, autoPlay });
      break;
    default: {
      push(`${route.name}Collections`, { item, routeName: route.name });
      break;
    }
  }
}

export function navigationGoBack() {
  navigationRef.current.dispatch(CommonActions.goBack());
}
