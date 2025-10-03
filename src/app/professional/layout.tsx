'use client';

import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/professional/SidebarNav';
import { Header } from '@/components/common/Header';
import { UserProvider } from '@/context/UserContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SidebarProvider>
        <Sidebar collapsible="icon" className="border-r">
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="min-h-[calc(100svh-4rem)] p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
