import { ROUTE_PATH } from './endpoints';

export const Constants = {
  API_TOKEN_STORAGE: 'API_APP_AT',
  API_REFRESH_TOKEN_STORAGE: 'API_APP_RT',
  APP_NAME: 'Vite React App',
  API_TOKEN_KEY: 'API_APP_AT',
  API_ROLE: 'API_APP_ROLE',

  ROLES: {
    ADMIN: {
      name: 'Admin',
      value: 'admin',
    },
    USER: {
      name: 'User',
      value: 'user',
    },
  },

  SIDE_BAR_ITEMS: [
    {
      name: 'Dashboard',
      icon: null,
      href: ROUTE_PATH.DASHBOARD,
    },
    {
      name: 'Emissions Tracking',
      icon: null,
      href: ROUTE_PATH.EMISSIONS_TRACKING,
    },
    {
      name: 'Emissions Factor',
      icon: null,
      href: ROUTE_PATH.EMISSIONS_FACTOR,
    },
    {
      name: 'User Management',
      icon: null,
      href: ROUTE_PATH.USER_MANAGEMENT,
    },
    {
      name: 'Blog Management',
      icon: null,
      children: [
        {
          name: 'Category',
          href: '/blog-management/category',
        },
        {
          name: 'Blogs',
          href: '/blog-management/blogs',
        },
      ],
    },
    {
      name: 'Company Management',
      icon: null,
      href: ROUTE_PATH.COMPANY_MANAGEMENT,
    },
    {
      name: 'Reporting',
      icon: null,
      href: ROUTE_PATH.REPORTING,
    },
  ],

  DateTime: {
    DateTimeFormat: 'yyyy-MM-DD HH:mm:ss.SSSS',
    DateFormat: 'yyyy-MM-DD',
  },
};
