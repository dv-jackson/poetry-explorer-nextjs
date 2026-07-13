'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/src/components/SearchBar';
import { fetchPoems, Poem } from '@/src/services/PoetryService';
import PoemCard from '@/src/components/PoemCard';
import { usePoemCache } from '@/src/context/poem-cache-context';
import StateDisplay from '@/src/components/ui/StateDisplay';

export default function DiscoverScreen() {
  const { cachedPoems, setCachedPoems } = usePoemCache();
  const [poems, setPoems] = useState<Poem[]>(cachedPoems);
  const [loading, setLoading] = useState(cachedPoems.length === 0);

  useEffect(() => {
    if (cachedPoems.length === 0) {
      setLoading(true);
      fetch('https://poetrydb.org/random/40')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then((data) => {
          setCachedPoems(data);
          setPoems(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [cachedPoems.length, setCachedPoems]);

  const handleSearch = async (query: string) => {
    if (!query) {
      setPoems(cachedPoems);
      return;
    }
    setLoading(true);
    const data = await fetchPoems(query);
    setPoems(data);
    setLoading(false);
  };

  return (
    <div className="bg-primary text-on-primary min-h-screen overflow-y-auto pt-36 pr-12 pb-10 pl-14">
      <header className="mb-11">
        <h1 className="font-header mb-7 text-8xl">Discover</h1>
        <div className="max-w-3xl">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <div className="flex w-full flex-wrap justify-start">
        {loading ? (
          <StateDisplay type="loading" message="Searching..." />
        ) : Array.isArray(poems) && poems.length > 0 ? (
          poems.map((poem, index) => (
            <PoemCard
              key={index}
              title={poem.title}
              author={poem.author}
              lineCount={poem.linecount}
            />
          ))
        ) : (
          <StateDisplay type="noResults" message="No Results Found" />
        )}
      </div>
    </div>
  );
}
