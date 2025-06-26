import { UserResponse } from '@/domain/models/User';
import { useGetApi } from '@/infrastructure/hooks/useApi';

export interface ProfileRepository {
  getProfile: () => ReturnType<typeof useGetApi<UserResponse>>;
}
