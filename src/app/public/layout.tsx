import { Header } from '@/components/common/Header';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="min-h-[calc(100svh-4rem)] p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
