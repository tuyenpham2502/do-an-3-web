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
  Readings: {
    GET_READINGS: `${API_PREFIX}/readings`,
  },
  SystemSetting: {
    GET_SYSTEM_SETTING: `${API_PREFIX}/system-config`,
    UPDATE_SYSTEM_SETTING: `${API_PREFIX}/system-config`,
    GET_REPLAY_SETTING: `${API_PREFIX}/system-config/relay-control`,
    UPDATE_REPLAY_SETTING: `${API_PREFIX}/system-config/relay-control`,
    GET_AUTO_WARNING_SETTING: `${API_PREFIX}/system-config/auto-warning-control`,
    UPDATE_AUTO_WARNING_SETTING: `${API_PREFIX}/system-config/auto-warning-control`,
  },
  Users: {
    GET_USERS: `${API_PREFIX}/users`,
    CREATE_USER: `${API_PREFIX}/users`,
    GET_USER_BY_ID: `${API_PREFIX}/users/:id`,
    UPDATE_USER: `${API_PREFIX}/users/:id`,
    DELETE_USER: `${API_PREFIX}/users/:id`,
  },
};
