import { PublicHeader } from '@/components/common/PublicHeader';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="p-4 sm:p-6 lg:p-8">{children}</main>
    </>
  );
}
