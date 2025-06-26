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
  getReplaySetting: (options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>) =>
    useGetApi<any>({ endpoint: Endpoints.SystemSetting.GET_REPLAY_SETTING, options }),
  updateReplaySetting: () =>
    usePutApi<any>({ endpoint: Endpoints.SystemSetting.UPDATE_REPLAY_SETTING }),
  getAutoWarningSetting: (options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>) =>
    useGetApi<any>({ endpoint: Endpoints.SystemSetting.GET_AUTO_WARNING_SETTING, options }),
  updateAutoWarningSetting: () =>
    usePutApi<any>({ endpoint: Endpoints.SystemSetting.UPDATE_AUTO_WARNING_SETTING }),
});
