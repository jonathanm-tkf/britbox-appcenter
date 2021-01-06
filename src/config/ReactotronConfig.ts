/* eslint-disable no-console */
/// import Reactotron from 'reactotron-react-native';
/// import { reactotronRedux } from 'reactotron-redux';
/// import reactotronSaga from 'reactotron-redux-saga';
/// import ReactotronFlipper from 'reactotron-react-native/dist/flipper';

import { NativeModules } from 'react-native';

if (__DEV__) {
  // grabs the ip address
  /// const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /// const tron: any = Reactotron.configure({
  ///   host,
  ///   createSocket: (path) => new ReactotronFlipper(path),
  /// })
  ///   .useReactNative({})
  ///   .use(
  ///    reactotronRedux({
  ///       except: [
  ///         '@layout/LAYOUT_LOADING_CAST_ON',
  ///         '@layout/LAYOUT_LOADING_CAST_OFF',
  ///         '@core/CASTING_OFF',
  ///       ],
  ///     })
  ///   )
  ///   .use(reactotronSaga({}))
  ///   .connect();

  /// tron.clear();

  /// console.tron = tron;
}
