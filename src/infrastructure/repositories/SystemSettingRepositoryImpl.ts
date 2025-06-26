import { SystemSettingRepository } from '@/application/repositories/SystemSettingRepository';
import { UserResponse } from '@/domain/models/User';
import { useGetApi, usePutApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';
import { UseQueryOptions } from '@tanstack/react-query';

export const SystemSettingRepositoryImpl = (): SystemSettingRepository => ({
  getSystemSetting: (options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>) =>
    useGetApi<any>({ endpoint: Endpoints.SystemSetting.GET_SYSTEM_SETTING, options }),
  updateSystemSetting: () =>
    usePutApi<UserResponse>({ endpoint: Endpoints.SystemSetting.UPDATE_SYSTEM_SETTING }),
});
