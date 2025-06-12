import { AuthRepository } from '@/application/repositories/AuthRepository';
import { LoginRequest, LoginResponse } from '@/domain/models/Auth';
import { usePostApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';

export const AuthRepositoryImpl = (): AuthRepository => ({
  login: () => usePostApi<LoginRequest, LoginResponse>({ endpoint: Endpoints.Auth.LOGIN }),
});
