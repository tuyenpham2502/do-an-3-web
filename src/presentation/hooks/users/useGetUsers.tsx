import { useRepository } from '@/di/RepositoriesProvider';
import { UseQueryOptions } from '@tanstack/react-query';

export const useGetUser = (
  queryParams: Record<string, any> = {},
  options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>
) => {
  const { userRepository } = useRepository(); // ✅ Lấy từ context
  const { ...rest } = userRepository.getUsers(queryParams, options);

  return {
    ...rest,
  };
};
