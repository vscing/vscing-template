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
  {
    path: '/job/add',
    name: 'JobForm',
    component: () => import('@/views/user/job/form/index.vue'),
    meta: {
      title: '新增任务清单',
    },
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/user/payment/index.vue'),
    meta: {
      title: '支付管理',
    },
  },
  {
    path: '/fillmount',
    name: 'Fillmount',
    component: () => import('@/views/user/payment/fillmount/index.vue'),
    meta: {
      title: '账单',
    },
  },
  {
    path: '/bankCard',
    name: 'BankCard',
    component: () => import('@/views/user/payment/bankCard/index.vue'),
    meta: {
      title: '银行卡绑定',
    },
  },
  {
    path: '/distribut',
    name: 'Distribut',
    component: () => import('@/views/user/distribut/index.vue'),
    meta: {
      title: '分销中心',
    },
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('@/views/user/collect/index.vue'),
    meta: {
      title: '我的收藏',
    },
  },
  {
    path: '/locked',
    name: 'Locked',
    component: () => import('@/views/user/locked/index.vue'),
    meta: {
      title: '锁藏品',
    },
  },
  {
    path: '/compound',
    name: 'Compound',
    component: () => import('@/views/user/compound/index.vue'),
    meta: {
      title: '产品合成',
    },
  },
  {
    path: '/grant',
    name: 'Grant',
    component: () => import('@/views/user/grant/index.vue'),
    meta: {
      title: '赠予管理',
    },
  },
  {
    path: '/order/buy',
    name: 'Buy',
    component: () => import('@/views/user/order/buy/index.vue'),
    meta: {
      title: '我买到的',
    },
  },
  {
    path: '/order/publish',
    name: 'Publish',
    component: () => import('@/views/user/order/publish/index.vue'),
    meta: {
      title: '我发布的',
    },
  },
  {
    path: '/order/sale',
    name: 'Sale',
    component: () => import('@/views/user/order/sale/index.vue'),
    meta: {
      title: '我卖出的',
    },
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import('@/views/user/setup/index.vue'),
    meta: {
      title: '设置',
    },
  },
  {
    path: '/editMessage',
    name: 'EditMessage',
    component: () => import('@/views/user/setup/editMessage/index.vue'),
    meta: {
      title: '编辑资料',
    },
  },
  {
    path: '/editBrief',
    name: 'EditBrief',
    component: () => import('@/views/user/setup/editBrief/index.vue'),
    meta: {
      title: '编辑简介',
    },
  },
  {
    path: '/realName',
    name: 'RealName',
    component: () => import('@/views/user/setup/realName/index.vue'),
    meta: {
      title: '实名认证',
    }
  },
  {
    path: '/setPayPassword',
    name: 'SetPayPassword',
    component: () => import('@/views/user/setup/setPayPassword/index.vue'),
    meta: {
      title: '设置支付密码',
    }
  },
  {
      path: '/phoneNumber',
      name: 'PhoneNumber',
      component: () => import('@/views/user/setup/phoneNumber/index.vue'),
      meta: {
        title: '手机号',
      },
  }
  
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
