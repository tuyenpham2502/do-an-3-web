import { UserResponse } from '@/domain/models/User';
import { useGetApi, usePostApi } from '@/infrastructure/hooks/useApi';

export interface ProfileRepository {
  getProfile: () => ReturnType<typeof useGetApi<UserResponse>>;
  updateProfile: (data: Partial<UserResponse>) => ReturnType<typeof usePostApi<UserResponse>>;
}
