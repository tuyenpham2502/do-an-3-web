import { useRepository } from '@/di/RepositoriesProvider';
import { LogoutRequest } from '@/domain/models/auth/logout';
import { logOutHandle } from '@/shared/utils';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const navigate = useNavigate();
  const { authRepository } = useRepository(); // ✅ Lấy từ context
  const { mutate: logOut, ...rest } = authRepository.logout();

  return {
    logOut: (credentials: LogoutRequest) => {
      logOut(credentials, {
        onSuccess: () => logOutHandle(navigate),
        onError: () => logOutHandle(navigate),
        onSettled: () => logOutHandle(navigate),
      });
    },
    ...rest,
  };
};
