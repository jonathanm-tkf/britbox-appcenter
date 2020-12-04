/* eslint-disable no-console */
import { createStore, compose, applyMiddleware, Middleware, Reducer } from 'redux';
import { enableES5 } from 'immer';

enableES5();
declare global {
  interface Console {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tron: any;
  }
}

export default (reducers: Reducer, middlewares: Middleware[]) => {
  const enhancer = __DEV__
    ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
