import { ForgotPasswordRequest } from '@/domain/models/auth/forgotPassword';
import { LoginRequest, LoginResponse } from '@/domain/models/auth/login';
import { LogoutRequest } from '@/domain/models/auth/logout';
import { ResetPasswordRequest } from '@/domain/models/auth/resetPassword';
import { usePostApi } from '@/infrastructure/hooks/useApi';

export interface AuthRepository {
  login: () => ReturnType<typeof usePostApi<LoginRequest, LoginResponse>>;
  logout: () => ReturnType<typeof usePostApi<LogoutRequest, any>>;
  forgotPassword: () => ReturnType<typeof usePostApi<ForgotPasswordRequest, any>>;
  resetPassword: () => ReturnType<typeof usePostApi<ResetPasswordRequest, any>>;
}
