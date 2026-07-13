'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { saveHistory } from '@/src/services/HistoryStorage';
import { saveFavorite, getFavorites } from '@/src/services/FavoritesStorage';
import { useTheme } from '@/src/context/theme-context';
import { Poem } from '@/src/services/PoetryService';
import { Like, Left } from '@icon-park/react';
import StateDisplay from '@/src/components/ui/StateDisplay';

export default function PoemReader() {
  const params = useParams();
  const router = useRouter();
  const id = (params.id as string) || '';
  const [title, author, lineCountParam] = id
    ? id.split('__').map(decodeURIComponent)
    : ['', '', '0'];
  const { currentTheme } = useTheme();

  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lineCount, setLineCount] = useState(lineCountParam);

  useEffect(() => {
    if (!title) return;

    const favorites = getFavorites();
    setIsFavorite(
      favorites.some((p: any) => p.title === title && p.author === author)
    );

    async function loadPoem() {
      setLoading(true);
      setPoem(null);
      const encodedTitle = encodeURIComponent(title.trim());
      const url = `https://poetrydb.org/title/${encodedTitle}/lines.json`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const poemData = Array.isArray(data)
          ? data.find((p) => (p.author || '').toLowerCase() === author.toLowerCase()) || data[0]
          : null;

        if (poemData) {
          setPoem(poemData);
          setLineCount(poemData.linecount || lineCountParam);
          saveHistory({ title, author, lineCount: poemData.linecount || lineCountParam });
        }
      } catch (error) {
        console.error('Failed to load poem:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPoem();
  }, [id, title, author, lineCountParam]);

  const toggleFavorite = () => {
    if (poem) {
      saveFavorite({ title, author, lineCount });
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="bg-secondary text-on-secondary relative flex w-1/2 flex-col overflow-hidden">
        <div className="bg-secondary z-20 pt-12 pb-10 pl-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-4 text-[18px] opacity-70 transition-all duration-200 hover:opacity-100"
          >
            <Left theme="outline" size="24" />
            Back
          </button>
        </div>

        <div className="bg-secondary z-10 flex grow items-end-safe pr-15 pb-10 pl-12">
          <h1 className="font-header max-w-200 align-baseline text-8xl">
            {title}
          </h1>
        </div>

        <div className="h-[55%]" />

        <div
          className="absolute bottom-0 left-0 h-full w-full"
          style={{
            backgroundImage: `url(${currentTheme.readerImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="font-body bg-primary text-on-primary flex w-5/8 flex-col items-center justify-center p-[44px_108px]">
        {loading ? (
          <StateDisplay type="loading" message="Loading..." />
        ) : poem ? (
          <div className="flex max-h-150 w-full max-w-xl translate-y-10 flex-col">
            <div className="custom-scrollbar grow overflow-y-auto pr-4">
              {poem.lines.map((line, i) => (
                <p key={i} className="text-center text-[26px]">
                  {line}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-20">
              <button onClick={toggleFavorite} className="text-on-primary">
                <Like theme={isFavorite ? 'filled' : 'outline'} size="24" />
              </button>
              <p className="text-on-primary text-right text-[20px] italic">
                - {author}
              </p>
            </div>
          </div>
        ) : (
          <StateDisplay type="noResults" message="Poem not found." />
        )}
      </div>
    </div>
  );
}
