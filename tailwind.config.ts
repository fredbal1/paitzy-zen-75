import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Semantic color tokens using CSS variables
				bg: 'var(--bg)',
				surface: {
					DEFAULT: 'var(--surface)',
					2: 'var(--surface-2)',
					3: 'var(--surface-3)'
				},
				text: {
					DEFAULT: 'var(--text)',
					muted: 'var(--text-muted)',
					soft: 'var(--text-soft)'
				},
				brand: {
					DEFAULT: 'var(--brand)',
					600: 'var(--brand-600)',
					700: 'var(--brand-700)',
					soft: 'var(--brand-soft)'
				},
				accent: {
					DEFAULT: 'var(--accent)',
					soft: 'var(--accent-soft)'
				},
				success: {
					DEFAULT: 'var(--success)',
					soft: 'var(--success-soft)'
				},
				warning: {
					DEFAULT: 'var(--warning)',
					soft: 'var(--warning-soft)'
				},
				danger: {
					DEFAULT: 'var(--danger)',
					soft: 'var(--danger-soft)'
				},
				// Keep existing shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// Custom radius using design tokens
				'neumo-sm': 'var(--radius-sm)',
				'neumo-md': 'var(--radius-md)',
				'neumo-lg': 'var(--radius-lg)',
				'neumo-xl': 'var(--radius-xl)',
				'neumo-2xl': 'var(--radius-2xl)',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui'],
			},
			fontSize: {
				'xs': 'var(--text-xs)',
				'sm': 'var(--text-sm)',
				'base': 'var(--text-base)',
				'lg': 'var(--text-lg)',
				'xl': 'var(--text-xl)',
				'2xl': 'var(--text-2xl)',
				'3xl': 'var(--text-3xl)',
				'4xl': 'var(--text-4xl)',
			},
			lineHeight: {
				'tight': 'var(--leading-tight)',
				'snug': 'var(--leading-snug)',
				'normal': 'var(--leading-normal)',
				'relaxed': 'var(--leading-relaxed)',
			},
			fontWeight: {
				'medium': 'var(--font-medium)',
				'semibold': 'var(--font-semibold)',
				'bold': 'var(--font-bold)',
			},
			boxShadow: {
				'neumo-soft': 'var(--shadow-soft)',
				'neumo': 'var(--shadow)',
				'neumo-lg': 'var(--shadow-lg)',
				'neumo-inset': 'var(--inset-1)',
				'neumo-inset-2': 'var(--inset-2)',
				'neumo-inset-deep': 'var(--inset-deep)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(8px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(16px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'pulse-soft': {
					'0%, 100%': {
						opacity: '0.5'
					},
					'50%': {
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
