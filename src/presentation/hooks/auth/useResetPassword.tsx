import { ResetPasswordRequest } from '@/domain/models/auth/resetPassword';
import { usePostApi } from '@/infrastructure/hooks/useApi';
import { useToast } from '@/presentation/hooks/use-toast';
import { AppRoutes } from '@/shared/appRoutes';
import { Endpoints } from '@/shared/endpoints';
import { useNavigate } from 'react-router';

export const useResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: resetPassword, isPending } = usePostApi<ResetPasswordRequest, void>({
    endpoint: Endpoints.Auth.RESET_PASSWORD,
    options: {
      onSuccess: () => {
        toast({
          title: 'Password reset successful',
          description: 'You can now login with your new password',
        });
        navigate(AppRoutes.PUBLIC.AUTH.LOGIN);
      },
    },
  });

  const handleResetPassword = async (data: ResetPasswordRequest) => {
    try {
      await resetPassword(data);
    } catch {
      // Error is handled by onError callback
    }
  };

  return {
    resetPassword: handleResetPassword,
    isLoading: isPending,
  };
};
