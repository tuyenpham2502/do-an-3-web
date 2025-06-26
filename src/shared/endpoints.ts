const API_PREFIX = '/v1';

export const Endpoints = {
  Auth: {
    LOGIN: `${API_PREFIX}/auth/login`,
    LOGOUT: `${API_PREFIX}/auth/logout`,
    REGISTER: `${API_PREFIX}/auth/register`,
    FORGOT_PASSWORD: `${API_PREFIX}/auth/forgot-password`,
    RESET_PASSWORD: `${API_PREFIX}/auth/reset-password`,
  },
  Profile: {
    GET_PROFILE: `${API_PREFIX}/auth/profile`,
    UPDATE_PROFILE: `${API_PREFIX}/profile`,
  },
  SystemSetting: {
    GET_SYSTEM_SETTING: `${API_PREFIX}/system-config`,
    UPDATE_SYSTEM_SETTING: `${API_PREFIX}/system-config`,
  },
  Users: {
    GET_USERS: `${API_PREFIX}/users`,
    GET_USER_BY_ID: `${API_PREFIX}/users/:id`,
    UPDATE_USER: `${API_PREFIX}/users/:id`,
    DELETE_USER: `${API_PREFIX}/users/:id`,
  },
};
