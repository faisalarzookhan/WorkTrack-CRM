"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en, es, fr, type Translation } from "./translations"

// Available languages
export const languages = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
}

export type LanguageCode = keyof typeof languages

// Get translations for a specific language
export const getTranslations = (lang: LanguageCode): Translation => {
  switch (lang) {
    case "es":
      return es
    case "fr":
      return fr
    default:
      return en
  }
}

// Create the context
type I18nContextType = {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: Translation
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Provider component
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>("en")
  const [translations, setTranslations] = useState<Translation>(en)

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("worktrack_language") as LanguageCode | null
    if (savedLanguage && languages[savedLanguage]) {
      setLanguageState(savedLanguage)
      setTranslations(getTranslations(savedLanguage))
    }
  }, [])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    setTranslations(getTranslations(lang))
    localStorage.setItem("worktrack_language", lang)
  }

  return <I18nContext.Provider value={{ language, setLanguage, t: translations }}>{children}</I18nContext.Provider>
}

// Hook to use the i18n context
export const useI18n = () => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

