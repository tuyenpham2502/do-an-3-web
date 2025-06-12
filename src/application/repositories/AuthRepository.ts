import { LoginRequest, LoginResponse } from '@/domain/models/Auth';
import { usePostApi } from '@/infrastructure/hooks/useApi';

export interface AuthRepository {
  login: () => ReturnType<typeof usePostApi<LoginRequest, LoginResponse>>;
}
