/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.ts",
    "./resources/**/*.tsx",
    "./resources/**/*.vue",
  ],
  theme: {
  extend: {
    colors: {
      'navbar-bg': '#1a535c',
      'hero-bg': '#4ecdc4',
      'section-bg': '#f7fff7',
      'button-accent': '#ff6b6b',
      'highlight': '#ffe66d',
      'footer-bg': '#144b52',
      'text-base': '#00363a',
      'text-light': '#e0f2f1',
      'card-bg': '#e6f9f8',
      'button-hover': '#ff8787',
      'divider': '#a5d8d6',
     border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Custom App Color System
        "app-background": {
          DEFAULT: "var(--app-background)",
          secondary: "var(--app-background-secondary)",
          accent: "var(--app-background-accent)",
        },
        "app-primary": {
          DEFAULT: "var(--app-primary)",
          light: "var(--app-primary-light)",
          dark: "var(--app-primary-dark)",
          foreground: "var(--app-primary-foreground)",
        },
        "app-secondary": {
          DEFAULT: "var(--app-secondary)",
          light: "var(--app-secondary-light)",
          dark: "var(--app-secondary-dark)",
          foreground: "var(--app-secondary-foreground)",
        },
        "app-accent": {
          DEFAULT: "var(--app-accent)",
          light: "var(--app-accent-light)",
          dark: "var(--app-accent-dark)",
          foreground: "var(--app-accent-foreground)",
        },
        "app-success": {
          DEFAULT: "var(--app-success)",
          light: "var(--app-success-light)",
          foreground: "var(--app-success-foreground)",
        },
        "app-warning": {
          DEFAULT: "var(--app-warning)",
          light: "var(--app-warning-light)",
          foreground: "var(--app-warning-foreground)",
        },
        "app-error": {
          DEFAULT: "var(--app-error)",
          light: "var(--app-error-light)",
          foreground: "var(--app-error-foreground)",
        },
        "app-text": {
          DEFAULT: "var(--app-text)",
          secondary: "var(--app-text-secondary)",
          muted: "var(--app-text-muted)",
          inverse: "var(--app-text-inverse)",
        },
        "app-border": {
          DEFAULT: "var(--app-border)",
          light: "var(--app-border-light)",
          focus: "var(--app-border-focus)",
        },
        "app-button": {
          primary: "var(--app-button-primary)",
          "primary-hover": "var(--app-button-primary-hover)",
          "primary-text": "var(--app-button-primary-text)",
          secondary: "var(--app-button-secondary)",
          "secondary-hover": "var(--app-button-secondary-hover)",
          "secondary-text": "var(--app-button-secondary-text)",
          gradient: "var(--app-button-gradient)",
          "gradient-hover": "var(--app-button-gradient-hover)",
        },
        "app-input": {
          background: "var(--app-input-background)",
          border: "var(--app-input-border)",
          "border-focus": "var(--app-input-border-focus)",
          text: "var(--app-input-text)",
          placeholder: "var(--app-input-placeholder)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      }
  }
},

plugins: [],
}

