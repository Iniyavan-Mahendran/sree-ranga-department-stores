/**
 * i18n Configuration
 * This sets up multi-language support for our app
 * Currently supports English, Hindi, and Tamil
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import taTranslations from './locales/ta.json';

// Configure i18n
i18n
  .use(initReactI18next) // Connect to React
  .init({
    // Available languages
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      ta: { translation: taTranslations },
    },
    
    // Default language
    lng: 'en',
    
    // Fallback language if translation is missing
    fallbackLng: 'en',
    
    // Debugging (turn off in production)
    debug: false,
    
    // How to access nested translations
    keySeparator: '.',
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;