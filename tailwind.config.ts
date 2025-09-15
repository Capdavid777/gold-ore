import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';


const config: Config = {
darkMode: ['class'],
content: ['./src/**/*.{ts,tsx}'],
theme: {
container: { center: true, padding: { DEFAULT: '1rem', lg: '2rem', xl: '2.5rem' } },
extend: {
fontFamily: {
display: ['var(--font-cinzel)'],
sans: ['var(--font-manrope)', 'system-ui', 'sans-serif']
},
colors: {
brand: {
gold: {
50: 'hsl(var(--gold-50))', 100: 'hsl(var(--gold-100))', 200: 'hsl(var(--gold-200))',
300: 'hsl(var(--gold-300))', 400: 'hsl(var(--gold-400))', 500: 'hsl(var(--gold-500))',
600: 'hsl(var(--gold-600))', 700: 'hsl(var(--gold-700))', 800: 'hsl(var(--gold-800))', 900: 'hsl(var(--gold-900))'
},
obsidian: 'hsl(var(--obsidian))',
steel: 'hsl(var(--steel))'
},
surface: {
DEFAULT: 'hsl(var(--surface))',
alt: 'hsl(var(--surface-alt))',
elevated: 'hsl(var(--surface-elevated))'
},
text: {
DEFAULT: 'hsl(var(--text))',
muted: 'hsl(var(--text-muted))',
onDark: 'hsl(var(--text-on-dark))',
onImage: 'hsl(var(--text-on-image))'
},
ring: { DEFAULT: 'hsl(var(--ring))' },
border: { DEFAULT: 'hsl(var(--border))', subtle: 'hsl(var(--border-subtle))' }
},
boxShadow: {
soft: '0 8px 24px rgba(0,0,0,.25)',
hard: '0 12px 48px rgba(0,0,0,.45)'
},
borderRadius: { xl: '1rem', '2xl': '1.25rem' }
}
},
plugins: [
require('@tailwindcss/typography'),
require('@tailwindcss/forms'),
require('@tailwindcss/container-queries'),
plugin(({ addUtilities, theme }) => {
addUtilities({
'.on-image': { color: theme('colors.text.onImage'), textShadow: '0 2px 12px rgba(0,0,0,.55)' },
'.on-dark': { color: theme('colors.text.onDark'), textShadow: '0 1px 2px rgba(0,0,0,.35)' },
'.focus-ring': { outline: '2px solid transparent', outlineOffset: '2px', boxShadow: `0 0 0 3px ${'#caa132'}` }
});
})
]
};
export default config;