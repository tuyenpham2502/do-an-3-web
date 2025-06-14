import { ROUTE_PATH } from '@/shared/endpoints';
import { lazy } from 'react';
import { Navigate } from 'react-router';
import MainLayout from '../layouts/main-layout';
import AuthLayout from '../layouts/auth-layout/auth-layout';

// Lazy load pages
const PermissionDeniedPage = lazy(() => import('@/presentation/pages/403'));
const NotFoundPage = lazy(() => import('@/presentation/pages/404'));
const DashBoardPage = lazy(() => import('@/presentation/pages/dashboard'));
const ProfilePage = lazy(() => import('@/presentation/pages/profile'));
const LoginPage = lazy(() => import('@/presentation/pages/auth/login'));

/// Redirect component for root path
const NavigateRoot = () => <Navigate to='/dashboard' replace />;

export const routes = [
  // Redirect from root
  {
    path: '/',
    title: 'Dashboard',
    component: NavigateRoot,
    isProtected: false, // Không cần Protected vì chỉ redirect
    layout: null, // Không dùng layout
  },

  // Public routes (no layout)
  {
    path: ROUTE_PATH.LOGIN,
    title: 'Dashboard',
    component: LoginPage,
    isProtected: false,
    layout: AuthLayout,
  },

  // Private routes (with MainLayout)
  {
    path: ROUTE_PATH.DASHBOARD,
    title: 'Dashboard',
    component: DashBoardPage,
    isProtected: true,
    layout: MainLayout,
  },
  {
    path: ROUTE_PATH.PROFILE,
    title: 'Profile',
    component: ProfilePage,
    isProtected: true,
    layout: MainLayout,
  },

  // Special routes
  {
    path: ROUTE_PATH.PERMISSION_DENIED,
    title: 'Permission Denied',
    component: PermissionDeniedPage,
    isProtected: false,
    layout: null,
  },
  {
    path: '*', // Not Found
    title: 'Not Found',
    component: NotFoundPage,
    isProtected: false,
    layout: null,
  },
];
