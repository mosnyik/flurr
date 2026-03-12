/**
 * Flurr Design System - Colors, Typography, Spacing
 */

import { Platform, TextStyle } from 'react-native';

// Flurr Brand Colors
export const FlurrColors = {
  // Backgrounds
  cream: '#F5F2EE',
  white: '#FFFFFF',

  // Text
  black: '#1A1A1A',
  darkGray: '#333333',
  gray: '#666666',
  lightGray: '#999999',

  // Accent
  coral: '#E85A6B',

  // UI Elements
  cardBorder: '#E5E5E5',
  inputBorder: '#D9D9D9',
  chipBackground: '#F0F0F0',

  // States
  disabled: '#CCCCCC',
};

// Spacing scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
};

// Custom fonts (loaded in _layout.tsx)
export const CustomFonts = {
  benguiatBook: 'Benguiat-Book',
  benguiatBookItalic: 'Benguiat-BookItalic',
  benguiatMedium: 'Benguiat-Medium',
  benguiatMediumItalic: 'Benguiat-MediumItalic',
  benguiatBold: 'Benguiat-Bold',
  benguiatBoldItalic: 'Benguiat-BoldItalic',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Typography styles
export const Typography: Record<string, TextStyle> = {
  titleLarge: {
    fontFamily: CustomFonts.benguiatBoldItalic,
    fontSize: 28,
    lineHeight: 36,
    color: FlurrColors.black,
  },
  titleMedium: {
    fontFamily: CustomFonts.benguiatBoldItalic,
    fontSize: 24,
    lineHeight: 32,
    color: FlurrColors.black,
  },
  titleBold: {
    fontFamily: CustomFonts.benguiatBold,
    fontSize: 28,
    lineHeight: 36,
    color: FlurrColors.black,
  },
  bodyLarge: {
    fontFamily: Fonts?.sans,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 26,
    color: FlurrColors.black,
  },
  bodyMedium: {
    fontFamily: Fonts?.sans,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: FlurrColors.black,
  },
  bodySmall: {
    fontFamily: Fonts?.sans,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: FlurrColors.gray,
  },
  label: {
    fontFamily: Fonts?.sans,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: FlurrColors.gray,
  },
  button: {
    fontFamily: Fonts?.sans,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};

// Legacy Colors export for compatibility
export const Colors = {
  light: {
    text: FlurrColors.black,
    background: FlurrColors.cream,
    tint: FlurrColors.coral,
    icon: FlurrColors.gray,
    tabIconDefault: FlurrColors.lightGray,
    tabIconSelected: FlurrColors.black,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};
