import { UserResponse } from '@/domain/models/User';
import { useGetApi } from '@/infrastructure/hooks/useApi';

export interface UserRepository {
  getUsers: () => ReturnType<typeof useGetApi<UserResponse[]>>;
}
