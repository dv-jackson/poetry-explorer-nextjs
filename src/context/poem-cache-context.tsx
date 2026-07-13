'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Poem } from '@/src/services/PoetryService';

type PoemCacheContextType = {
  cachedPoems: Poem[];
  setCachedPoems: (poems: Poem[]) => void;
};

const PoemCacheContext = createContext<PoemCacheContextType | undefined>(
  undefined
);

export function PoemCacheProvider({ children }: { children: ReactNode }) {
  const [cachedPoems, setCachedPoems] = useState<Poem[]>([]);
  return (
    <PoemCacheContext.Provider value={{ cachedPoems, setCachedPoems }}>
      {children}
    </PoemCacheContext.Provider>
  );
}

export function usePoemCache() {
  const context = useContext(PoemCacheContext);
  if (!context) {
    throw new Error('usePoemCache must be used within a PoemCacheProvider');
  }
  return context;
}
