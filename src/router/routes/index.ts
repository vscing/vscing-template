import type { AppRouteRecordRaw } from '@/router/types';

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    title: '首页',
  },
};

export const MainRoute: AppRouteRecordRaw[] = [
  {
    path: '/goods',
    name: 'goods',
    component: () => import('@/views/goods/list/index.vue'),
    meta: {
      title: '市场',
    },
  },
  {
    path: '/goods/detail',
    name: 'detail',
    component: () => import('@/views/goods/detail/index.vue'),
    meta: {
      title: '产品详情',
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '我的',
    },
  }
]

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/user/login/index.vue'),
  meta: {
    title: "登录",
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...MainRoute
];
