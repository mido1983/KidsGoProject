import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { InitOptions, Resource } from 'i18next';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import he from '../locales/he.json';

export type Language = 'en' | 'ru' | 'he';

export interface TranslationResource {
  translation: {
    app_name: string;
    onboarding: {
      welcome: string;
      select_language: string;
      sign_in_with_google: string;
      signing_in: string;
      continue: string;
      sign_in: string;
      sign_up: string;
    };
    main: {
      nearby: string;
      search: string;
      favorites: string;
      profile: string;
    };
    filters: {
      age: string;
      date: string;
      category: string;
      apply: string;
    };
    event: {
      price: string;
      location: string;
      share: string;
      save: string;
      book_now: string;
    };
    profile: {
      settings: string;
      language: string;
      notifications: string;
      history: string;
      business: string;
      logout: string;
    };
    errors: {
      auth_error: string;
      try_again_later: string;
    };
    tabs: {
      home: string;
      search: string;
      favorites: string;
      profile: string;
    };
    events: {
      nearby: string;
      no_events: string;
      age_filter: string;
      category_filter: string;
      date_filter: string;
      price: {
        free: string;
        paid: string;
        from: string;
      };
      distance: {
        km: string;
        nearby: string;
      };
    };
  };
}

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  he: { translation: he },
} as Resource;

const initOptions: InitOptions = {
  resources,
  lng: Localization.locale.split('-')[0], // Use device language as default
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

i18n.use(initReactI18next).init(initOptions);

export default i18n;
