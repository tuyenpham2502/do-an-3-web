import { AuthRepository } from '@/application/repositories/AuthRepository';
import { ForgotPasswordRequest } from '@/domain/models/auth/forgotPassword';
import { LoginRequest, LoginResponse } from '@/domain/models/auth/login';
import { LogoutRequest } from '@/domain/models/auth/logout';
import { ResetPasswordRequest } from '@/domain/models/auth/resetPassword';
import { usePostApi } from '@/infrastructure/hooks/useApi';
import { Endpoints } from '@/shared/endpoints';

export const AuthRepositoryImpl = (): AuthRepository => ({
  login: () => usePostApi<LoginRequest, LoginResponse>({ endpoint: Endpoints.Auth.LOGIN }),
  logout: () => usePostApi<LogoutRequest, any>({ endpoint: Endpoints.Auth.LOGOUT }),
  forgotPassword: () =>
    usePostApi<ForgotPasswordRequest, any>({ endpoint: Endpoints.Auth.FORGOT_PASSWORD }),
  resetPassword: () =>
    usePostApi<ResetPasswordRequest, any>({ endpoint: Endpoints.Auth.RESET_PASSWORD }),
});
