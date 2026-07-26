import type { Config } from 'tailwindcss'

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Playfair Display"', '"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
                sans: ['"Inter"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                cream: 'hsl(40 21% 93%)',
                'cream-deep': 'hsl(38 42% 90%)',
                ink: 'hsl(0 12% 21%)',
                brown: 'hsl(0 10% 35%)',
                'brown-soft': 'hsl(0 8% 55%)',
                gold: 'hsl(46 75% 59%)',
                'gold-soft': 'hsl(45 73% 68%)',
                terracotta: 'hsl(12 37% 57%)',
                forest: 'hsl(164 35% 25%)',
            },
            borderRadius: {
                DEFAULT: 'var(--radius, 0.875rem)',
            },
            boxShadow: {
                elegant: '0 30px 60px -30px rgba(62, 39, 35, 0.35)',
                card: '0 12px 32px -12px rgba(62, 39, 35, 0.18)',
            },
            animation: {
                'fade-up': 'fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
                'shimmer-line': 'shimmerLine 900ms 200ms ease-out both',
            },
            keyframes: {
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                shimmerLine: {
                    '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
                    '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config
