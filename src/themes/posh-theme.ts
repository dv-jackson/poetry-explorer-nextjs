import { Theme } from '@/src/types/theme';

export const poshTheme: Theme = {
  id: 'posh',
  name: 'Posh',

  colors: {
    primary: '#FDFBF7',
    onPrimary: '#1F1F2E',

    secondary: '#F1EEE4',
    onSecondary: '#1F1F2E',

    accent: '#1F1F2E',
    onAccent: '#FDFBF7',
  },

  fonts: {
    header: 'Medhurst',
    body: 'Playfair Display',
  },

  readerImage: '/textures/posh.png',
};
