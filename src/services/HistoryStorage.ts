export const saveHistory = (poem: {
  title: string;
  author: string;
  lineCount: string;
}) => {
  try {
    console.log('Saving history with lineCount:', poem.lineCount);
    const history = JSON.parse(
      localStorage.getItem('poetry-app-history') || '[]'
    );

    const filtered = history.filter(
      (p: any) => !(p.title === poem.title && p.author === poem.author)
    );
    localStorage.setItem(
      'poetry-app-history',
      JSON.stringify([poem, ...filtered].slice(0, 50))
    );
  } catch (e) {
    console.error('Failed to save history:', e);
  }
};

export const getHistory = () => {
  try {
    const history = JSON.parse(localStorage.getItem('poetry-app-history') || '[]');
    return history.map((p: any) => ({
        ...p,
        lineCount: p.lineCount || '0'
    }));
  } catch (e) {
    console.error('Failed to get history:', e);
    return [];
  }
};
