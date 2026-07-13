'use client';

import React, { useState } from 'react';
import { Search } from '@icon-park/react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="font-body w-full">
      <div className="bg-secondary flex h-15 max-w-225 items-center rounded-[26px]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search By Author or Title"
          className="flex-1 bg-transparent px-6 py-3 text-base text-black placeholder-black/50 focus:outline-none"
        />

        <button
          type="submit"
          className="bg-accent text-on-accent flex h-15 w-15 items-center justify-center rounded-3xl transition-all active:scale-99"
        >
          <Search theme="outline" size="24" />
        </button>
      </div>
    </form>
  );
}
