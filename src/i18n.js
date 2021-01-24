import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translationEN.json";
import translationPT from "./locales/pt/translationPT.json";

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    debug: true,
    useSuspense: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
