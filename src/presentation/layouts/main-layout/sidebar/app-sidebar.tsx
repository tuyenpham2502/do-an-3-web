import { Home, LineChart, Settings2 } from 'lucide-react';
import * as React from 'react';

import { profileAtom } from '@/application/stores/atoms/global/profile';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/presentation/components/ui/sidebar';
import { Skeleton } from '@/presentation/components/ui/skeleton';
import { NavMain } from '@/presentation/layouts/main-layout/sidebar/nav-main';
import { NavUser } from '@/presentation/layouts/main-layout/sidebar/nav-user';
import { useAtomValue } from 'jotai';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: LineChart,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const profile = useAtomValue(profileAtom);

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {profile.isLoading ? (
          <div className='flex items-center gap-2 p-2'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-3 w-32' />
            </div>
          </div>
        ) : (
          profile.data && <NavUser user={profile.data} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
