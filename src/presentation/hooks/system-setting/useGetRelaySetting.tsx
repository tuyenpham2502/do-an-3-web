import { useRepository } from '@/di/RepositoriesProvider';
import { UseQueryOptions } from '@tanstack/react-query';

export const useGetRelaySetting = (
  options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>
) => {
  const { systemSettingRepository } = useRepository(); // ✅ Lấy từ context
  const { ...rest } = systemSettingRepository.getReplaySetting(options);

  return {
    ...rest,
  };
};
