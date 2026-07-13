'use client';

import { useEffect, useState } from 'react';
import { getFavorites } from '@/src/services/FavoritesStorage';
import PoemCard from '@/src/components/PoemCard';
import StateDisplay from '@/src/components/ui/StateDisplay';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<
    { title: string; author: string; lineCount: string }[]
  >([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="bg-primary text-on-primary min-h-screen pt-36 pr-10 pb-10 pl-16">
      <h1 className="font-header mb-11 text-8xl">Favorites</h1>
      <div className="flex w-full flex-wrap justify-start">
        {favorites.length > 0 ? (
          favorites.map((p, i) => (
            <PoemCard
              key={i}
              title={p.title}
              author={p.author}
              lineCount={p.lineCount}
            />
          ))
        ) : (
          <StateDisplay type="empty" message="No Favorites" />
        )}
      </div>
    </div>
  );
}
