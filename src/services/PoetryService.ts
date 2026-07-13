const API_BASE_URL = 'https://poetrydb.org';

export type Poem = {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
};

export async function fetchPoems(query: string): Promise<Poem[]> {
  try {
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());

      const [titleRes, authorRes] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/title/${encodedQuery}`),
        fetch(`${API_BASE_URL}/author/${encodedQuery}`),
      ]);

      let results: Poem[] = [];

      if (titleRes.status === 'fulfilled' && titleRes.value.ok) {
        const data = await titleRes.value.json();
        if (Array.isArray(data)) results = [...results, ...data];
      }
      if (authorRes.status === 'fulfilled' && authorRes.value.ok) {
        const data = await authorRes.value.json();
        if (Array.isArray(data)) results = [...results, ...data];
      }

      return results.filter(
        (poem, index, self) =>
          index ===
          self.findIndex(
            (p) => p.title === poem.title && p.author === poem.author
          )
      );
    }

    const response = await fetch(`${API_BASE_URL}/random/40`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch poems:', error);
    return [];
  }
}

export async function fetchPoem(
  title: string,
  author: string
): Promise<Poem | null> {
  try {
    const encodedTitle = encodeURIComponent(title);
    const encodedAuthor = encodeURIComponent(author);

    const url = `${API_BASE_URL}/title/${encodedTitle}/author/${encodedAuthor}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Request failed:', response.status);
      return null;
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch poem:', error);
    return null;
  }
}
