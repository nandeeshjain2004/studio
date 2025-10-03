'use client';
import { Logo } from './Logo';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
    </header>
  );
}
