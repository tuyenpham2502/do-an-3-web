import { useRepository } from '@/di/RepositoriesProvider';
import { UseQueryOptions } from '@tanstack/react-query';

export const useGetReadings = (
  options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>
) => {
  const { readingsRepository } = useRepository(); // ✅ Lấy từ context
  // Ensure options is never undefined to satisfy type requirements
  const result = readingsRepository.getReading(options);

  return {
    ...result,
  };
};
