import { Theme } from '@/src/types/theme';

export const modernTheme: Theme = {
  id: 'modern',
  name: 'Modern',

  colors: {
    primary: '#000000',
    onPrimary: '#FFFFFF',

    secondary: '#FFFFFF',
    onSecondary: '#000000',

    accent: '#E4A47E',
    onAccent: '#000000',
  },

  fonts: {
    header: 'North Carossela',
    body: 'Glacial Indifference',
  },

  readerImage: '/textures/modern.png',
};
