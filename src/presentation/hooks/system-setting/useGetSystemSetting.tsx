import { useRepository } from '@/di/RepositoriesProvider';
import { UseQueryOptions } from '@tanstack/react-query';

export const useGetSystemSetting = (
  options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>
) => {
  const { systemSettingRepository } = useRepository(); // ✅ Lấy từ context
  const { ...rest } = systemSettingRepository.getSystemSetting(options);

  return {
    ...rest,
  };
};
