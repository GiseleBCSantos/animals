import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import pt from "../locales/pt.json";
import es from "../locales/es.json";
import de from "../locales/de.json";
import fr from "../locales/fr.json";
import ja from "../locales/ja.json";
import zh from "../locales/zh.json";
import it from "../locales/it.json";

const LANGUAGE_KEY = "i18n_language";
function getInitialLanguage() {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved) return saved;
    // Optionally, use browser language as fallback
    const browserLang = navigator.language?.split("-")[0];
    if (["en", "pt", "es", "de", "fr", "ja", "zh", "it"].includes(browserLang))
      return browserLang;
  }
  return "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
    de: { translation: de },
    fr: { translation: fr },
    ja: { translation: ja },
    zh: { translation: zh },
    it: { translation: it },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Sempre que o idioma mudar, salva no localStorage
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LANGUAGE_KEY, lng);
  }
});

export default i18n;
