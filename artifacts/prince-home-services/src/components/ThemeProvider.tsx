import { createContext, useContext, useEffect, useState } from 'react';
import { defaultLanguage, type Language } from '@/lib/translations';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  languageStorageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
  language: defaultLanguage,
  setLanguage: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function getStoredTheme(storageKey: string, defaultTheme: Theme): Theme {
  if (typeof window === 'undefined') return defaultTheme;

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored;
    }
  } catch {
    // ignore storage access issues in browser privacy mode
  }

  return defaultTheme;
}

function getStoredLanguage(languageStorageKey: string, defaultLang: Language): Language {
  if (typeof window === 'undefined') return defaultLang;

  try {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (stored === 'en' || stored === 'hi') {
      return stored;
    }
  } catch {
    // ignore storage access issues in browser privacy mode
  }

  return defaultLang;
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  languageStorageKey = 'phs-language',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme(storageKey, defaultTheme));
  const [language, setLanguage] = useState<Language>(() => getStoredLanguage(languageStorageKey, defaultLanguage));

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    theme,
    setTheme: (nextTheme: Theme) => {
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch {
        // ignore storage failures
      }
      setTheme(nextTheme);
    },
    language,
    setLanguage: (nextLanguage: Language) => {
      try {
        window.localStorage.setItem(languageStorageKey, nextLanguage);
      } catch {
        // ignore storage failures
      }
      setLanguage(nextLanguage);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const useLanguage = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) throw new Error('useLanguage must be used within a ThemeProvider');
  return context;
};
