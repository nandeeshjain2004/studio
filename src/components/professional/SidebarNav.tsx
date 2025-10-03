'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/common/Logo';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Bot,
  FileSignature,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  { href: '/professional', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/professional/assistant', label: 'AI Assistant', icon: Bot },
  { href: '/professional/drafting', label: 'Auto-Drafting', icon: FileSignature },
  { href: '/professional/abuse-detection', label: 'Abuse Detection', icon: ShieldAlert },
  { href: '/professional/profiles', label: 'Profiles', icon: Users },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <Separator />
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
