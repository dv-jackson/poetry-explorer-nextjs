'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '@/src/types/theme';
import { themes, defaultTheme } from '@/src/themes/themes';

type ThemeContextType = {
  currentTheme: Theme;
  changeTheme: (themeId: string) => void;
  availableThemes: Theme[];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedThemeId = localStorage.getItem('poetry-app-theme');
      if (savedThemeId) {
        const matched = themes.find((t) => t.id === savedThemeId);
        if (matched) return matched;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--theme-primary', currentTheme.colors.primary);
    root.style.setProperty('--theme-on-primary', currentTheme.colors.onPrimary);
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--theme-on-secondary', currentTheme.colors.onSecondary);
    root.style.setProperty('--theme-accent', currentTheme.colors.accent);
    root.style.setProperty('--theme-on-accent', currentTheme.colors.onAccent);

    root.style.setProperty(
      '--theme-font-header',
      `"${currentTheme.fonts.header}", serif`
    );
    root.style.setProperty(
      '--theme-font-body',
      `"${currentTheme.fonts.body}", sans-serif`
    );

    localStorage.setItem('poetry-app-theme', currentTheme.id);
  }, [currentTheme]);

  const changeTheme = (themeId: string) => {
    const selected = themes.find((t) => t.id === themeId);
    if (selected) setCurrentTheme(selected);
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, changeTheme, availableThemes: themes }}
    >
      <div
        style={{ fontFamily: 'var(--theme-font-body)' }}
        className="min-h-screen"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
