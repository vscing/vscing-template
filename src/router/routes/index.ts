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
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/user/about/index.vue'),
    meta: {
      title: '需求合作',
    },
  },
  {
    path: '/job',
    name: 'Job',
    component: () => import('@/views/user/job/index.vue'),
    meta: {
      title: '任务清单',
    },
  },
  // {
  //   path: '/setup',
  //   name: 'Setup',
  //   component: () => import('@/views/user/setup/index.vue'),
  //   meta: {
  //     title: '设置',
  //   },
  // },
  // {
  //   path: '/distribut',
  //   name: 'Distribut',
  //   component: () => import('@/views/user/distribut/index.vue'),
  //   meta: {
  //     title: '分销中心',
  //   },
  // },
  // {
  //   path: '/myTearm',
  //   name: 'MyTearm',
  //   component: () => import('@/views/user/distribut/myTearm/index.vue'),
  //   meta: {
  //     title: '我的团队',
  //   },
  // },
  // {
  //   path: '/order',
  //   name: 'Order',
  //   component: () => import('@/views/user/distribut/order/index.vue'),
  //   meta: {
  //     title: '分销订单',
  //   },
  // },
  // {
  //   path: '/wechat',
  //   name: 'Wechat',
  //   component: () => import('@/views/user/distribut/wechat/index.vue'),
  //   meta: {
  //     title: '邀请码',
  //   },
  // },
  // {
  //   path: '/statics',
  //   name: 'statics',
  //   component: () => import('@/views/user/distribut/statics/index.vue'),
  //   meta: {
  //     title: '业绩统计',
  //   },
  // }
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
