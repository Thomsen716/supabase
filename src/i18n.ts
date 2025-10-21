import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "da",
    interpolation: { escapeValue: false },
    resources: {
      da: { translation: { add_note: "Tilføj note" } },
      en: { translation: { add_note: "Add note" } },
    },
  });

export default i18n;
