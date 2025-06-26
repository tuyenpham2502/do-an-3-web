import { ProfileRepository } from '@/application/repositories/ProfileRepository';
import { UserResponse } from '@/domain/models/User';
import { useGetApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';

export const ProfileRepositoryImpl = (): ProfileRepository => ({
  getProfile: () => useGetApi<UserResponse>({ endpoint: Endpoints.Profile.GET_PROFILE }),
});
