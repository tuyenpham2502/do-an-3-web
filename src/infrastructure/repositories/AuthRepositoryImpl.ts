import { AuthRepository } from '@/application/repositories/AuthRepository';
import { LoginRequest, LoginResponse } from '@/domain/models/auth/login';
import { LogoutRequest } from '@/domain/models/auth/logout';
import { usePostApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';

export const AuthRepositoryImpl = (): AuthRepository => ({
  login: () => usePostApi<LoginRequest, LoginResponse>({ endpoint: Endpoints.Auth.LOGIN }),
  logout: () => usePostApi<LogoutRequest, null>({ endpoint: Endpoints.Auth.LOGOUT }),
});
