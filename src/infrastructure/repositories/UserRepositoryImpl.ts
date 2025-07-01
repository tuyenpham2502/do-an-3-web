import { UserRepository } from '@/application/repositories/UserRepository';
import { UserResponse } from '@/domain/models/User';
import { useGetApi, usePostApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';
import { UseQueryOptions } from '@tanstack/react-query';

export const UserRepositoryImpl = (): UserRepository => ({
  getUsers: (
    queryParams: Record<string, string | number | boolean | undefined>,
    options?: Omit<UseQueryOptions<any, any>, 'queryKey' | 'queryFn'>
  ) => useGetApi<UserResponse[]>({ endpoint: Endpoints.Users.GET_USERS, queryParams, options }),
  createUser: () => usePostApi<any, any>({ endpoint: Endpoints.Users.CREATE_USER }),
});
