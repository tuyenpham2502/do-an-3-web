import { useRepository } from '@/di/RepositoriesProvider';
import { LoginRequest } from '@/domain/models/auth/login';
import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { Constants } from '@/shared/constants';
import { useNavigate } from 'react-router';
import { useToast } from '../use-toast';

export const useLogin = () => {
  const { toast } = useToast(); // ✅ Lấy từ context
  const navigate = useNavigate();
  const localStorageService = new LocalStorageServiceImpl();
  const { authRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: login, ...rest } = authRepository.login();

  return {
    login: (credentials: LoginRequest) => {
      login(credentials, {
        onSuccess: (data) => {
          toast({
            title: 'Login successful',
            description: 'You have successfully logged in.',
          });
          localStorageService.setStorage(Constants.API_TOKEN_STORAGE, data.access_token);
          localStorageService.setStorage(Constants.API_REFRESH_TOKEN_STORAGE, data.refresh_token);
          navigate('/'); // Redirect sau khi login
        },
      });
    },
    ...rest,
  };
};
