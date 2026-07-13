'use client';

import { useEffect, useState } from 'react';
import { getHistory } from '@/src/services/HistoryStorage';
import PoemCard from '@/src/components/PoemCard';
import StateDisplay from '@/src/components/ui/StateDisplay';

export default function HistoryPage() {
  const [history, setHistory] = useState<
    { title: string; author: string; lineCount: string }[]
  >([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className="bg-primary text-on-primary min-h-screen pt-36 pr-10 pb-10 pl-16">
      <h1 className="font-header mb-11 text-8xl">History</h1>
      <div className="flex w-full flex-wrap justify-start">
        {history.length > 0 ? (
          history.map((p, i) => (
            <PoemCard
              key={i}
              title={p.title}
              author={p.author}
              lineCount={p.lineCount}
            />
          ))
        ) : (
          <StateDisplay type="empty" message="No History" />
        )}
      </div>
    </div>
  );
}
