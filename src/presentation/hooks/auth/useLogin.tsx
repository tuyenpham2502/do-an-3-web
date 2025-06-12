import { useRepository } from '@/di/RepositoriesProvider';
import { LoginRequest } from '@/domain/models/Auth';
import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { Constants } from '@/shared/constants';

export const useLogin = () => {
  const localStorageService = new LocalStorageServiceImpl();
  const { authRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: login, ...rest } = authRepository.login();

  return {
    login: (credentials: LoginRequest) => {
      login(credentials, {
        onSuccess: (data) => {
          localStorageService.setStorage(Constants.API_TOKEN_STORAGE, data.accessToken);

          // navigate('/'); // Redirect sau khi login
        },
      });
    },
    ...rest,
  };
};
