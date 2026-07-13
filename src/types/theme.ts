export type Theme = {
  id: string;
  name: string;

  colors: {
    primary: string;
    onPrimary: string;

    secondary: string;
    onSecondary: string;

    accent: string;
    onAccent: string;
  };

  fonts: {
    header: string;
    body: string;
  };

  readerImage: string;
};
