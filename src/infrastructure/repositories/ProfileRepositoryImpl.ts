import { ProfileRepository } from '@/application/repositories/ProfileRepository';
import { UserResponse } from '@/domain/models/User';
import { useGetApi, usePostApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';

export const ProfileRepositoryImpl = (): ProfileRepository => ({
  getProfile: () => useGetApi<UserResponse>({ endpoint: Endpoints.Profile.GET_PROFILE }),
  updateProfile: () => usePostApi<any, any>({ endpoint: Endpoints.Profile.UPDATE_PROFILE }),
});
