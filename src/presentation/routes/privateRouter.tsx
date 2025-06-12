import { redirectPathAtom } from '@/application/stores/atoms/global/redirectPath';
import LocalStorageServiceImpl from '@/infrastructure/services/LocalStorageServiceImpl';
import { AppRoutes } from '@/shared/appRoutes';
import { Constants } from '@/shared/constants';
import { useSetAtom } from 'jotai';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface Props {
  path?: string;
  roles?: Array<any>;
  children?: React.ReactNode;
}

export const PrivateRoute = ({ roles = [], children }: Props) => {
  const location = useLocation();
  const setRedirectPath = useSetAtom(redirectPathAtom);
  const localStorageService = new LocalStorageServiceImpl();
  const token = localStorageService.readStorage(Constants.API_TOKEN_STORAGE);
  if (!token) {
    setRedirectPath(location.pathname);
    return <Navigate to={AppRoutes.PUBLIC.AUTH.LOGIN} />;
  }

  // Role checking is currently disabled
  const roleOfUser: string[] = [];
  if (roles?.length) {
    roles.forEach((it: any) => {
      roleOfUser?.some((itC: any) => itC === it);
    });
  }

  return children ? <>{children}</> : <Outlet />; // Render children nếu có
};
