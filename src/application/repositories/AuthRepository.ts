import { LoginRequest, LoginResponse } from '@/domain/models/auth/login';
import { LogoutRequest } from '@/domain/models/auth/logout';
import { usePostApi } from '@/infrastructure/hooks/useApi';

export interface AuthRepository {
  login: () => ReturnType<typeof usePostApi<LoginRequest, LoginResponse>>;
  logout: () => ReturnType<typeof usePostApi<LogoutRequest, null>>;
}
