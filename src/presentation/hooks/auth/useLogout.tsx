import { useRepository } from '@/di/RepositoriesProvider';
import { LogoutRequest } from '@/domain/models/auth/logout';
import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { Constants } from '@/shared/constants';
import { useNavigate } from 'react-router';

export const useLogout = () => {
    const navigate = useNavigate();
    const localStorageService = new LocalStorageServiceImpl();
    const { authRepository } = useRepository(); // ✅ Lấy từ context
    const { mutate: logOut, ...rest } = authRepository.logout();

    const handleLogout = () => {
        localStorageService.removeStorage(Constants.API_TOKEN_STORAGE);
        localStorageService.removeStorage(Constants.API_REFRESH_TOKEN_STORAGE);
        navigate('/login'); // Redirect sau khi logout
    };

    return {
        logOut: (credentials: LogoutRequest) => {
            logOut(credentials, {
                onSuccess: () => handleLogout(),
                onError: () => handleLogout(),
                onSettled: () => handleLogout(),
            });
        },
        ...rest,
    };
};
