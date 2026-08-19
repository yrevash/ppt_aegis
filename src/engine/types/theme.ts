export interface ThemeTokens {
  colors: {
    brand: string
    brandHover: string
    accent: string
    accentHover: string
    surface: string
    surfaceAlt: string
    surfaceRaised: string
    textPrimary: string
    textSecondary: string
    textTertiary: string
    border: string
    borderHover: string
    success: string
    warning: string
    error: string
    info: string
  }
  fonts: {
    sans: string
    mono: string
  }
  radii: {
    slide: string
    card: string
    sm: string
  }
  shadows: {
    card: string
    cardHover: string
    slide: string
  }
}

export const LightCleanTheme: ThemeTokens = {
  colors: {
    brand: '#2563EB',
    brandHover: '#1D4ED8',
    accent: '#7C3AED',
    accentHover: '#6D28D9',
    surface: '#FFFFFF',
    surfaceAlt: '#FAFAFA',
    surfaceRaised: '#F4F4F5',
    textPrimary: '#18181B',
    textSecondary: '#52525B',
    textTertiary: '#A1A1AA',
    border: '#E4E4E7',
    borderHover: '#D4D4D8',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    info: '#0891B2',
  },
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  radii: {
    slide: '16px',
    card: '12px',
    sm: '6px',
  },
  shadows: {
    card: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    cardHover: '0 4px 16px rgba(0, 0, 0, 0.08)',
    slide: '0 4px 32px rgba(0, 0, 0, 0.06)',
  },
}