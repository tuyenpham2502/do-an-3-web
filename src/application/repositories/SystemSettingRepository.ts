import { useGetApi, usePutApi } from '@/infrastructure/hooks/useApi';
import { UseQueryOptions } from '@tanstack/react-query';

export interface SystemSettingRepository {
  getSystemSetting: (
    options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>
  ) => ReturnType<typeof useGetApi<any>>;
  updateSystemSetting: () => ReturnType<typeof usePutApi<any, any>>;
}
