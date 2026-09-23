/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      /** CTA / accents — ThemeWagon danger/orange */
      primary: '#F17228',
      /** Hero / brand yellow — ThemeWagon primary */
      'primary-light': '#FFB30E',
      'text-dark': '#212121',
      'text-gray': '#9E9E9E',
      'bg-cream': '#FFF8ED',
      'bg-muted': '#F5F5F5',
      'gray-100': '#F3F4F6',
      success: '#79B93C',
      'success-bg': '#E8F6D9',
      warning: '#F17228',
      'warning-bg': '#FFE8D8',
      'footer-dark': '#212121',
      'star-gold': '#FFB30E',
    },
    fontFamily: {
      heading: ['Poppins', 'sans-serif'],
      body: ['Nunito', 'sans-serif'],
    },
    boxShadow: {
      card: '0 8px 24px rgba(33, 33, 33, 0.08)',
      'card-hover': '0 14px 32px rgba(33, 33, 33, 0.12)',
      soft: '0 4px 16px rgba(33, 33, 33, 0.06)',
      cta: '0 8px 18px rgba(241, 114, 40, 0.28)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
  plugins: [],
}
