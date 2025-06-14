import { useRepository } from '@/di/RepositoriesProvider';
import { LoginRequest } from '@/domain/models/auth/login';
import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { Constants } from '@/shared/constants';
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const navigate = useNavigate();
  const localStorageService = new LocalStorageServiceImpl();
  const { authRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: login, ...rest } = authRepository.login();

  return {
    login: (credentials: LoginRequest) => {
      login(credentials, {
        onSuccess: (data) => {
          localStorageService.setStorage(Constants.API_TOKEN_STORAGE, data.access_token);
          localStorageService.setStorage(Constants.API_REFRESH_TOKEN_STORAGE, data.refresh_token);
          navigate('/'); // Redirect sau khi login
        },
      });
    },
    ...rest,
  };
};
