import React from 'react';
import CodePush from 'react-native-code-push';
import { enableScreens } from 'react-native-screens';
import { I18nextProvider } from 'react-i18next';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';
import { DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { lightTheme, base } from './store/modules/theme/theme';
import { LogBox } from 'react-native';
import { persistor, store } from './store';
import App from './App';
import i18n from './services/i18next';

enableScreens();

LogBox.ignoreLogs([
  'CheckBox has been extracted from react-native core',
  'No info about this app',
  'rn-fetch-blob',
]);

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
interface Font {
  default: {
    regular: {
      fontFamily: string;
      fontWeight: FontWeight;
    };
    medium: {
      fontFamily: string;
      fontWeight: FontWeight;
    };
    light: {
      fontFamily: string;
      fontWeight: FontWeight;
    };
    thin: {
      fontFamily: string;
      fontWeight: FontWeight;
    };
  };
}

const fontConfig: Font = {
  default: {
    regular: {
      fontFamily: base.PRIMARY_FONT_FAMILY,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: base.PRIMARY_FONT_FAMILY_MEDIUM,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: base.PRIMARY_FONT_FAMILY_LIGHT,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: base.PRIMARY_FONT_FAMILY,
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    error: lightTheme.ERROR_COLOR,
    // primary: lightTheme.PRIMARY_TEXT_COLOR_OPAQUE,
    // placeholder: lightTheme.PRIMARY_TEXT_COLOR_OPAQUE,
  },
  fonts: configureFonts(fontConfig),
};

const Index = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
