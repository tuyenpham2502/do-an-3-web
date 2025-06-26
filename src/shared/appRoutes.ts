const Prefix = '';

export const AppRoutes = {
  ROOT: `${Prefix}/`,
  PERMISSION_DENIED: `${Prefix}/permission-denied`,
  FORBIDDEN_ACCESS: `${Prefix}/forbidden-access`,
  PUBLIC: {
    AUTH: {
      LOGIN: `${Prefix}/auth/login`,
      REGISTER: `${Prefix}/auth/register`,
      FORGOT_PASSWORD: `${Prefix}/auth/forgot-password`,
      RESET_PASSWORD: `${Prefix}/auth/reset-password`,
    },
  },
  PRIVATE: {
    DASHBOARD: `${Prefix}/dashboard`,
    USERS: `${Prefix}/users`,
    ACCOUNTS: `${Prefix}/accounts`,
    PROFILE: `${Prefix}/profile`,
    SETTING: `${Prefix}/setting`,
  },
};
