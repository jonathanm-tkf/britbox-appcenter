/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';

/// const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMonitor = false ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

if (__DEV__) {
  /// const createFlipperMiddleware = require('rn-redux-middleware-flipper').default;
  /// middlewares.push(createFlipperMiddleware());
}

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
