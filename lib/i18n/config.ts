export const defaultLocale = "en" as const
export const locales = ["en", "hi", "bn", "ta", "te", "mr"] as const

export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिंदी",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  mr: "मराठी",
}

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  hi: "🇮🇳",
  bn: "🇧🇩",
  ta: "🇮🇳",
  te: "🇮🇳",
  mr: "🇮🇳",
}
