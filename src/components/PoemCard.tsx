import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  saveFavorite,
  getFavorites,
  removeFavorite,
} from '@/src/services/FavoritesStorage';
import { Like } from '@icon-park/react';

export default function PoemCard({
  title,
  author,
  lineCount,
}: {
  title: string;
  author: string;
  lineCount?: string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(
      favorites.some((p: any) => p.title === title && p.author === author)
    );
  }, [title, author]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite({ title, author });
    } else {
      saveFavorite({ title, author, lineCount: lineCount || '0' });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-accent text-on-accent font-body group mr-6 mb-4 flex h-54 w-52 flex-col justify-between rounded-4xl pt-9 pr-6 pb-7 pl-4 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="row flex w-full items-center justify-between">
        <span className="text-[15px]">{lineCount} lines</span>
        <button onClick={toggleFavorite}>
          <Like theme={isFavorite ? 'filled' : 'outline'} size="20" />
        </button>
      </div>

      <Link
        href={`/poem/${encodeURIComponent(title)}__${encodeURIComponent(author)}__${encodeURIComponent(lineCount || '0')}`}
        className="flex flex-1 flex-col justify-end"
      >
        <h2 className="mb-1 w-full truncate text-[20px]">{title}</h2>
        <h3 className="w-full truncate text-[13px]">{author}</h3>
      </Link>
    </div>
  );
}
