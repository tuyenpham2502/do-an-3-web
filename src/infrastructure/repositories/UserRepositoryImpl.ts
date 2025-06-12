import { UserRepository } from '@/application/repositories/UserRepository';
import { UserResponse } from '@/domain/models/User';
import { useGetApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';

export const UserRepositoryImpl = (): UserRepository => ({
  getUsers: () => useGetApi<UserResponse[]>({ endpoint: Endpoints.Users.GET_USERS }),
});
