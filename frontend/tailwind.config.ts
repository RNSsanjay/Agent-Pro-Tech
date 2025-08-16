import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-primary': '#0a0a0a',
                'dark-secondary': '#1a1a1a',
                'blue-primary': '#3b82f6',
                'blue-secondary': '#1d4ed8',
            },
            backgroundImage: {
                'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 75%, #1e3a8a 100%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            transitionProperty: {
                'width': 'width',
                'height': 'height',
            }
        },
    },
    plugins: [],
} satisfies Config