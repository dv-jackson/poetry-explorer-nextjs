export const saveFavorite = (poem: {
  title: string;
  author: string;
  lineCount: string;
}) => {
  try {
    console.log('Saving favorite with lineCount:', poem.lineCount);
    const favorites = JSON.parse(
      localStorage.getItem('poetry-app-favorites') || '[]'
    );
    if (
      !favorites.find(
        (p: any) => p.title === poem.title && p.author === poem.author
      )
    ) {
      localStorage.setItem(
        'poetry-app-favorites',
        JSON.stringify([...favorites, poem])
      );
    }
  } catch (e) {
    console.error('Failed to save favorite:', e);
  }
};

export const removeFavorite = (poem: { title: string; author: string }) => {
  try {
    const favorites = JSON.parse(
      localStorage.getItem('poetry-app-favorites') || '[]'
    );
    const updatedFavorites = favorites.filter(
      (p: any) => !(p.title === poem.title && p.author === poem.author)
    );
    localStorage.setItem(
      'poetry-app-favorites',
      JSON.stringify(updatedFavorites)
    );
  } catch (e) {
    console.error('Failed to remove favorite:', e);
  }
};

export const getFavorites = () => {
    try {
        const favorites = JSON.parse(localStorage.getItem('poetry-app-favorites') || '[]');
        return favorites.map((p: any) => ({
            ...p,
            lineCount: p.lineCount || '0'
        }));
    } catch (e) {
        console.error("Failed to get favorites:", e);
        return [];
    }
};
