"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, defaultLocale } from "./config"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [translations, setTranslations] = useState<Record<string, string>>({})

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("kaladwar-locale", newLocale)
  }

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[key] || key

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, value)
      })
    }

    return translation
  }

  useEffect(() => {
    const savedLocale = localStorage.getItem("kaladwar-locale") as Locale
    if (savedLocale) {
      setLocaleState(savedLocale)
    }
  }, [])

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await import(`./translations/${locale}.json`)
        setTranslations(response.default)
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error)
        if (locale !== defaultLocale) {
          const fallback = await import(`./translations/${defaultLocale}.json`)
          setTranslations(fallback.default)
        }
      }
    }

    loadTranslations()
  }, [locale])

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
