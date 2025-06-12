/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Acumin Pro',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			h1: [
  				'96px',
  				{
  					lineHeight: '144px',
  					fontWeight: '700'
  				}
  			],
  			h2: [
  				'60px',
  				{
  					lineHeight: '90px',
  					fontWeight: '700'
  				}
  			],
  			h3: [
  				'48px',
  				{
  					lineHeight: '72px',
  					fontWeight: '700'
  				}
  			],
  			h4: [
  				'32px',
  				{
  					lineHeight: '48px',
  					fontWeight: '700'
  				}
  			],
  			h5: [
  				'24px',
  				{
  					lineHeight: '36px',
  					fontWeight: '400'
  				}
  			],
  			h6: [
  				'20px',
  				{
  					lineHeight: '30px',
  					fontWeight: '400'
  				}
  			],
  			subtitle1: [
  				'16px',
  				{
  					lineHeight: '24px',
  					fontWeight: '700'
  				}
  			],
  			subtitle2: [
  				'14px',
  				{
  					lineHeight: '24px',
  					fontWeight: '700'
  				}
  			],
  			body1: [
  				'16px',
  				{
  					lineHeight: '24px',
  					fontWeight: '400'
  				}
  			],
  			body2: [
  				'14px',
  				{
  					lineHeight: '21px',
  					fontWeight: '400'
  				}
  			],
  			button1: [
  				'16px',
  				{
  					lineHeight: '26px',
  					fontWeight: '400'
  				}
  			],
  			button2: [
  				'14px',
  				{
  					lineHeight: '21px',
  					fontWeight: '400'
  				}
  			],
  			caption: [
  				'12px',
  				{
  					lineHeight: '18px',
  					fontWeight: '400'
  				}
  			],
  			overline: [
  				'10px',
  				{
  					lineHeight: '16px',
  					fontWeight: '400',
  					letterSpacing: '0.1em',
  					textTransform: 'uppercase'
  				}
  			]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};
