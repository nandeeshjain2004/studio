import type { Metadata } from 'next';
import { PublicHeader } from '@/components/common/PublicHeader';

export const metadata: Metadata = {
  title: 'Public Access | NyayaAI',
  description: 'Public portal for case tracking and information.',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PublicHeader />
      <main className="min-h-[calc(100svh-4rem)] p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
