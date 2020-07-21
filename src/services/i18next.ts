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
      auth: require('../locales/us/auth.json'),
    },
  },
});

export default i18next;
