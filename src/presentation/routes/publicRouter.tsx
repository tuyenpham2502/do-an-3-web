import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { Constants } from '@/shared/constants';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

export const PublicRoute = ({ children }: Props) => {
  const localStorageService = new LocalStorageServiceImpl();
  const token = localStorageService.readStorage(Constants.API_TOKEN_STORAGE);

  if (token) {
    return <Navigate to={'/'} />;
  }

  return children ? <>{children}</> : <Outlet />;
};
