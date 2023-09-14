import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import yaml from "js-yaml";

const namespaces: readonly string[] = ["correspondence", "landing", "common"];

export function initI18N() {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "ru",
      ns: namespaces,
      load: "languageOnly",
      /*debug: process.env.MODE === "development",*/
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.yaml",
        parse: (data: string) => yaml.load(data) as Record<string, any>,
      },
      interpolation: {
        escapeValue: false,
      },
    });
}
