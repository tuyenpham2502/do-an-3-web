import { useGetApi, usePostApi } from '@/infrastructure/hooks/useApi';
import { UseQueryOptions } from '@tanstack/react-query';

export interface UserRepository {
  getUsers: (
    queryParams: Record<string, string | number | boolean | undefined>,
    options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>
  ) => ReturnType<typeof useGetApi<any>>;
  createUser: () => ReturnType<typeof usePostApi<any, any>>;
}
