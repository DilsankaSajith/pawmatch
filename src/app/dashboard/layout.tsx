'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth, UserButton } from '@clerk/nextjs';
import {
  Cat,
  Gem,
  Home,
  Key,
  LucideIcon,
  Map,
  Menu,
  Settings,
  X,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren, useState, Suspense } from 'react';
import { Drawer } from 'vaul';

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: 'Overview',
    items: [
      { href: '/dashboard', icon: Home, text: 'Dashboard' },
      { href: '/hotspot', icon: Map, text: 'Hotspot Map' },
      { href: '/applications', icon: Cat, text: 'Applications' },
    ],
  },
  {
    category: 'Account',
    items: [{ href: '/dashboard/upgrade', icon: Gem, text: 'Upgrade' }],
  },
  {
    category: 'Settings',
    items: [
      { href: '/dashboard/api-key', icon: Key, text: 'API Key' },
      {
        href: '/dashboard/documentation',
        icon: BookOpen,
        text: 'Documentation',
      },
    ],
  },
];

import { FilterSidebar } from '../../components/filter-sidebar';
import { useQuery } from '@tanstack/react-query';
import { getApplications } from '../pet/[petId]/actions';

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const { data: applications = [], isPending } = useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
  });

  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      {/* navigation items */}
      <div className="flex-grow overflow-y-auto pr-2 scrollbar-hide">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="text-xs font-medium leading-6 text-zinc-500">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 hover:bg-gray-50 transition',
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-4 text-zinc-500 group-hover:text-zinc-700" />
                    {item.text}

                    {!isPending && item.text === 'Applications' && (
                      <span className="ml-auto shadow-md flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs font-medium text-white">
                        {applications.length}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {/* Filter Sidebar (only visible on /dashboard) */}
        <Suspense>
          <FilterSidebar />
        </Suspense>
      </div>

      <div className="flex flex-col">
        <hr className="my-4 md:my-6 w-full h-px bg-gray-100" />

        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: 'flex-row',
            },
          }}
        />
      </div>
    </div>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* sidebar for desktop */}
      <div className="hidden md:block w-64 lg:w-80 border-r border-gray-100 p-6 h-full text-brand-900 relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <p className="text-lg/7 font-semibold text-brand-900">
            Paw<span className="text-brand-700">Match</span>
          </p>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="size-6" />
          </button>
        </div>

        {/* main content area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 shadow-md p-4 md:p-6 relative z-10">
          <div className="relative min-h-full flex flex-col">
            <div className="h-full flex flex-col flex-1 space-y-4">
              {children}
            </div>
          </div>
        </div>

        <Drawer.Root
          direction="right"
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
            <Drawer.Content className="fixed right-0 top-0 bottom-0 w-[280px] bg-white z-50 p-6 flex flex-col shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg/7 font-semibold text-brand-900">
                  Paw<span className="text-brand-700">Match</span>
                </p>
                <button
                  aria-label="Close menu"
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="size-6" />
                </button>
              </div>

              <Sidebar onClose={() => setIsDrawerOpen(false)} />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
};

export default Layout;
