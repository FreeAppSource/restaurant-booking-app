import React, { createContext, useContext, useState } from 'react';

export const colors = {
  primary: '#32B768',         // Foodmedia emerald brand green
  primaryDark: '#269151',
  primaryLight: '#4CD984',
  primarySoft: '#EAF7EE',
  primaryMuted: '#D4F2DE',
  accentOrange: '#FF7B2C',
  accentYellow: '#FFC107',
  accentRed: '#EB5757',
  dark: '#1F2937',
  darkText: '#111827',
  gray800: '#1F2937',
  gray600: '#4B5563',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const palettes = {
  light: {
    bg: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceSubtle: '#F9FAFB',
    card: '#FFFFFF',
    cardBorder: '#F0F0F0',
    text: '#1F2937',
    subText: '#6B7280',
    inputBg: '#F3F4F6',
    divider: '#E5E7EB',
    chipBg: '#F3F4F6',
    chipActiveBg: '#32B768',
    chipActiveText: '#FFFFFF',
  },
  dark: {
    bg: '#111827',
    surface: '#1F2937',
    surfaceSubtle: '#374151',
    card: '#1F2937',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#F9FAFB',
    subText: '#9CA3AF',
    inputBg: '#374151',
    divider: 'rgba(255, 255, 255, 0.12)',
    chipBg: '#374151',
    chipActiveBg: '#32B768',
    chipActiveText: '#FFFFFF',
  },
};

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: palettes.light,
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? palettes.dark : palettes.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
