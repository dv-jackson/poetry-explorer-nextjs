import React from 'react';

interface StateDisplayProps {
  type: 'empty' | 'noResults' | 'loading';
  message: string;
}

export default function StateDisplay({ type, message }: StateDisplayProps) {
  return (
    <div className="flex h-full w-full items-center justify-center py-20">
      <p
        className={`font-body text-[24px] ${type === 'loading' ? 'animate-pulse' : ''}`}
      >
        {message}
      </p>
    </div>
  );
}
