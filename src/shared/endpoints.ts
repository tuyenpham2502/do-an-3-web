const API_PREFIX = '/api/v1/';

export const Endpoints = {
  Auth: {
    LOGIN: `${API_PREFIX}sign-in`,
    REGISTER: `${API_PREFIX}auth/register`,
    FORGOT_PASSWORD: `${API_PREFIX}auth/forgot-password`,
    RESET_PASSWORD: `${API_PREFIX}auth/reset-password`,
  },
  Profile: {
    GET_PROFILE: `${API_PREFIX}profile`,
    UPDATE_PROFILE: `${API_PREFIX}profile`,
  },
  Sensor: {
    GET_SENSOR_DATA: `${API_PREFIX}sensors/data`,
  },
  Users: {
    GET_USERS: `${API_PREFIX}users`,
    GET_USER_BY_ID: `${API_PREFIX}users/:id`,
    UPDATE_USER: `${API_PREFIX}users/:id`,
    DELETE_USER: `${API_PREFIX}users/:id`,
  },
};

export const ROUTE_PATH = {
  // Auth
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  HOME: '/home',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  PROFILE: '/profile',

  // Emissions Tracking
  EMISSIONS_TRACKING: '/emissions-tracking',

  //Blog Management
  BLOG_MANAGEMENT: '/blog-management/blogs',
  CATEGORY_MANAGEMENT: '/blog-management/category',

  //Emissions Factor
  EMISSIONS_FACTOR: '/emissions-factor',

  //User Management
  USER_MANAGEMENT: '/user-management',

  //Company
  COMPANY_MANAGEMENT: '/company-management',

  //Reporting
  REPORTING: '/reporting',

  PERMISSION_DENIED: '/permission-denied',
  NOT_FOUND: '*',
};
