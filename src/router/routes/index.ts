import type { AppRouteRecordRaw } from '@/router/types';

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: '首页',
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: "登录",
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute
];