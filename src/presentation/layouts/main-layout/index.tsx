import { sensorAtom } from '@/application/stores/atoms/global/sensor';
import { Sensor } from '@/domain/models/sensor/Sensor';
import { useWebSocket } from '@/infrastructure/hooks/useWebSocket';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/presentation/components/ui/breadcrumb';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/presentation/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { AppSidebar } from './sidebar/app-sidebar';
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const setSensor = useSetAtom(sensorAtom);

  useEffect(() => {
    const socket = useWebSocket({});

    socket.on('sensorData', (data: Sensor) => {
      setSensor(data); // Update the sensor atom with the received data
    });
    return () => {
      socket.close();
    };
  }, []);

  const { children } = props;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='#'>Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
