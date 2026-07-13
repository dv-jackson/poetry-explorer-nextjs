'use client';

import Sidebar from '@/src/components/Sidebar';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="z-10 shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
