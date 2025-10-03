import { Gavel } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-lg font-semibold font-headline text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
        className
      )}
    >
      <Gavel className="h-6 w-6" />
      <span>NyayaAI</span>
    </Link>
  );
}
