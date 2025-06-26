import { AppRoutes } from '@/shared/appRoutes';
import { lazy } from 'react';
import { Navigate } from 'react-router';
import AuthLayout from '../layouts/auth-layout/auth-layout';
import MainLayout from '../layouts/main-layout';

// Lazy load pages
const PermissionDeniedPage = lazy(() => import('@/presentation/pages/403'));
const NotFoundPage = lazy(() => import('@/presentation/pages/404'));
const DashBoardPage = lazy(() => import('@/presentation/pages/dashboard'));
const ProfilePage = lazy(() => import('@/presentation/pages/profile'));
const LoginPage = lazy(() => import('@/presentation/pages/auth/login'));
const ForgotPasswordPage = lazy(() => import('@/presentation/pages/auth/forgot-password'));
const ResetPasswordPage = lazy(() => import('@/presentation/pages/auth/reset-password'));
const SettingPage = lazy(() => import('@/presentation/pages/setting'));

/// Redirect component for root path
const NavigateRoot = () => <Navigate to='/dashboard' replace />;

export const routes = [
  // Redirect from root
  {
    path: AppRoutes.ROOT,
    title: 'Dashboard',
    component: NavigateRoot,
    isProtected: false, // Không cần Protected vì chỉ redirect
    layout: null, // Không dùng layout
  },

  // Public routes (no layout)
  {
    path: AppRoutes.PUBLIC.AUTH.LOGIN,
    title: 'Login',
    component: LoginPage,
    isProtected: false,
    layout: AuthLayout,
  },

  {
    path: AppRoutes.PUBLIC.AUTH.FORGOT_PASSWORD,
    title: 'Forgot Password',
    component: ForgotPasswordPage,
    isProtected: false,
    layout: AuthLayout,
  },

  {
    path: AppRoutes.PUBLIC.AUTH.RESET_PASSWORD,
    title: 'Forgot Password',
    component: ResetPasswordPage,
    isProtected: false,
    layout: AuthLayout,
  },

  // Private routes (with MainLayout)
  {
    path: AppRoutes.PRIVATE.DASHBOARD,
    title: 'Dashboard',
    component: DashBoardPage,
    isProtected: true,
    layout: MainLayout,
  },
  {
    path: AppRoutes.PRIVATE.PROFILE,
    title: 'Profile',
    component: ProfilePage,
    isProtected: true,
    layout: MainLayout,
  },
  {
    path: AppRoutes.PRIVATE.SETTING,
    title: 'Setting',
    component: SettingPage,
    isProtected: true,
    layout: MainLayout,
  },
  // Special routes
  {
    path: AppRoutes.PERMISSION_DENIED,
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
