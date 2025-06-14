import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { type ClassValue, clsx } from 'clsx';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { AppRoutes } from './appRoutes';
import { Constants } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logOutHandle(navigate: ReturnType<typeof useNavigate>) {
  const localStorageService = new LocalStorageServiceImpl();
  localStorageService.removeStorage(Constants.API_TOKEN_STORAGE);
  localStorageService.removeStorage(Constants.API_REFRESH_TOKEN_STORAGE);
  navigate(AppRoutes.PUBLIC.AUTH.LOGIN, {
    replace: true,
  }); // Redirect after logout
}
