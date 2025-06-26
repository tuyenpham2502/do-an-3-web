import { sensorAtom } from '@/application/stores/atoms/global/sensor';
import { settingAtom } from '@/application/stores/atoms/global/setting';
import { Sensor } from '@/domain/models/sensor/Sensor';
import { Setting } from '@/domain/models/system-setting/system-setting';
import { useWebSocket } from '@/infrastructure/hooks/useWebSocket';
import { LanguageSwitcher } from '@/presentation/components/commons/language-switcher';
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
  const setting = useSetAtom(settingAtom); // Assuming you want to set the same atom for settings

  useEffect(() => {
    const socket = useWebSocket({});

    socket.on('sensorData', (data: Sensor) => {
      setSensor(data); // Update the sensor atom with the received data
    });

    socket.on('settingData', (data: Setting) => {
      setting(data); // Update the setting atom with the received data
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
          <div className='ml-auto flex items-center gap-2'>
            <LanguageSwitcher />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
