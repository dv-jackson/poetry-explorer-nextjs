'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/src/context/theme-context';
import { Search, Like, Time, Down } from '@icon-park/react';

export default function Sidebar() {
  const pathname = usePathname();
  const { currentTheme, changeTheme, availableThemes } = useTheme();

  const navigationItems = [
    { name: 'Discover', path: '/discover', icon: Search },
    { name: 'Favorites', path: '/favorites', icon: Like },
    { name: 'History', path: '/history', icon: Time },
  ];

  return (
    <aside className="bg-secondary text-on-secondary flex h-screen w-88 flex-col justify-between pr-25 pb-20 pl-14">
      <div>
        <nav className="font-body text-[20px]">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`mb-9 flex -translate-x-3 translate-y-70 items-center justify-center gap-6 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-on-secondary'
                    : 'text-black opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-[18px] ${
                    isActive
                      ? 'bg-on-secondary text-secondary'
                      : 'bg-transparent'
                  }`}
                >
                  <Icon theme="outline" size="22" />
                </div>
                <span className="w-24 text-left">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="font-body">
        <div className="relative">
          <select
            id="theme-select"
            value={currentTheme.id}
            onChange={(e) => changeTheme(e.target.value)}
            className="bg-on-secondary text-secondary flex h-12 w-full appearance-none items-center justify-center rounded-2xl px-5 text-[16px] focus:outline-none"
          >
            {availableThemes.map((theme) => (
              <option
                key={theme.id}
                value={theme.id}
                className="bg-secondary text-onSecondary text-left"
              >
                {theme.name}
              </option>
            ))}
          </select>
          <div className="text-secondary pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <Down theme="outline" size="22" />
          </div>
        </div>
      </div>
    </aside>
  );
}
