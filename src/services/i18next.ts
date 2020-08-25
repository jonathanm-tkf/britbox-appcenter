import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  lng: 'us',
  fallbackLng: 'us',
  resources: {
    us: {
      layout: require('../locales/us/layout.json'),
      detail: require('../locales/us/detail.json'),
      signin: require('../locales/us/signin.json'),
      signup: require('../locales/us/signup.json'),
      auth: require('../locales/us/auth.json'),
      tabs: require('../locales/us/tabs.json'),
      home: require('../locales/us/home.json'),
      az: require('../locales/us/az.json'),
      search: require('../locales/us/search.json'),
    },
  },
});

export default i18next;
