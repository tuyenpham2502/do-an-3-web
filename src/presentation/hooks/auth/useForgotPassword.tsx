import { useRepository } from '@/di/RepositoriesProvider';
import { ForgotPasswordRequest } from '@/domain/models/auth/forgotPassword';
import { useToast } from '../use-toast';

export const useForgotPassword = () => {
  const { toast } = useToast(); // ✅ Lấy từ context
  const { authRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: forgotPassword, ...rest } = authRepository.forgotPassword();

  return {
    forgotPassword: (credentials: ForgotPasswordRequest) => {
      return new Promise<void>((resolve) => {
        forgotPassword(credentials, {
          onSuccess: () => {
            toast({
              title: 'Success',
              description: 'Password reset link sent to your email.',
            });
            resolve();
          },
        });
      });
    },
    ...rest,
  };
};
