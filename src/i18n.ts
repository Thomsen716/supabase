import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // browser language detection
  .use(initReactI18next)
  .init({
    fallbackLng: "den", // hvis browser-sproget ikke findes, brug dansk
    interpolation: { escapeValue: false },
    resources: {
      da: {
        translation: {
          add_note: "Tilføj note",
          first_name: "Fornavn",
          last_name: "Efternavn",
          password: "Adgangskode",
          confirm_password: "Bekræft adgangskode",
          frontpage: "Forside",
          login: "Log ind",
          logout: "Log ud",
          signup: "Tilmeld",
          email: "Email",
          hi: "Hej",
          you_are_logged_in: "Du er logget ind",
          you_are_not_logged_in: "Du er ikke logget ind",
          preferred_language: "Foretrukket sprog",
          choose_language: "Vælg sprog",
          language_saved: "Sprog gemt",
          save_changes: "Gem ændringer",
        },
      },
      en: {
        translation: {
          add_note: "Add note",
          first_name: "First Name",
          last_name: "Last Name",
          password: "Password",
          confirm_password: "Confirm Password",
          frontpage: "Frontpage",
          login: "Log In",
          logout: "Log Out",
          signup: "Sign Up",
          email: "Email",
          hi: "Hi",
          you_are_logged_in: "You are logged in",
          you_are_not_logged_in: "You are not logged in",
          preferred_language: "Preferred Language",
          choose_language: "Choose Language",
          language_saved: "Language saved",
          save_changes: "Save Changes",
        },
      },
    },
  });

export default i18n;
