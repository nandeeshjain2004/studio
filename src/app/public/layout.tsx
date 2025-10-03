import { Logo } from "@/components/common/Logo";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-20 items-center border-b px-4 md:px-8">
        <Logo />
      </header>
      <main className="p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
