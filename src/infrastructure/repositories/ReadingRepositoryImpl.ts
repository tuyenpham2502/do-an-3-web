import { ReadingRepository } from '@/application/repositories/ReadingRepository';
import { UserResponse } from '@/domain/models/User';
import { useGetApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';
import { UseQueryOptions } from '@tanstack/react-query';

export const ReadingRepositoryImpl = (): ReadingRepository => ({
  getReading: (options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>) =>
    useGetApi<UserResponse>({
      endpoint: Endpoints.Readings.GET_READINGS,
      options,
    }),
});
