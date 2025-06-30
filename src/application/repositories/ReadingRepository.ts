import { useGetApi } from '@/infrastructure/hooks/useApi';
import { UseQueryOptions } from '@tanstack/react-query';

export interface ReadingRepository {
  getReading: (
    options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>
  ) => ReturnType<typeof useGetApi<any>>;
}
