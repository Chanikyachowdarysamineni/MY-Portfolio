/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        heading: 'var(--color-heading)',
        body: 'var(--color-body)',
        muted: 'var(--color-muted)',
        /* Semantic Palette Names */
        ink: 'var(--color-ink)',
        charcoal: 'var(--color-charcoal)',
        bone: 'var(--color-bone)',
        coral: 'var(--color-coral)',
        violet: 'var(--color-violet)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0B0B0C 0%, #26215C 55%, #7F77DD 100%)',
        'gradient-primary': 'linear-gradient(90deg, #D85A30 0%, #F0997B 100%)',
        'gradient-cta': 'linear-gradient(90deg, #D85A30 0%, #F0997B 100%)',
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(216, 90, 48, 0.25)', /* Coral glow */
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 40px -5px rgba(0, 0, 0, 0.08)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [],
}
