import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: require('./strings/en-US.json')
      },
      pt: {
        translations: require('./strings/pt-BR.json')
      }
    },
    fallbackLng: 'en',
    debug: true
  })

export default i18n
