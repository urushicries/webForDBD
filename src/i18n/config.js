import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from './en.json';
import ruJSON from './ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enJSON },
    ru: { translation: ruJSON },
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
