import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Color utilities
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
} as const

// Animation utilities
export const animations = {
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
  pulse: 'animate-pulse-slow',
  bounce: 'animate-bounce-slow',
  spin: 'animate-spin-slow',
} as const

// Layout utilities
export const layouts = {
  container: 'container-premium',
  section: 'section-spacing',
  card: 'card-premium',
} as const

// Component utilities
export const components = {
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  },
  input: 'input-premium',
  tab: 'tab-premium',
} as const

// Text utilities
export const text = {
  gradient: 'text-gradient',
  accent: 'text-accent',
  muted: 'text-muted',
} as const

// Effect utilities
export const effects = {
  glass: 'glass',
  glassDark: 'glass-dark',
  hoverLift: 'hover-lift',
  hoverGlow: 'hover-glow',
  focusRing: 'focus-ring',
  focusRingDark: 'focus-ring-dark',
} as const

// Responsive utilities
export const responsive = {
  mobile: {
    padding: 'mobile-padding',
    text: 'mobile-text',
  }
} as const

// Theme utilities
export const theme = {
  dark: {
    textShadow: 'text-shadow',
    borderGlow: 'border-glow',
  }
} as const

// Utility function to combine classes
export function combineClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Utility function to create responsive classes
export function responsiveClasses(base: string, mobile?: string): string {
  return mobile ? `${base} ${mobile}` : base
}

// Utility function to create conditional classes
export function conditionalClasses(condition: boolean, trueClass: string, falseClass?: string): string {
  return condition ? trueClass : (falseClass || '')
}

// Utility function to create hover classes
export function hoverClasses(base: string, hover: string): string {
  return `${base} hover:${hover}`
}

// Utility function to create focus classes
export function focusClasses(base: string, focus: string): string {
  return `${base} focus:${focus}`
}

// Utility function to create active classes
export function activeClasses(base: string, active: string): string {
  return `${base} active:${active}`
}

// Utility function to create disabled classes
export function disabledClasses(base: string, disabled: string): string {
  return `${base} disabled:${disabled}`
}
