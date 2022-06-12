import type { AppRouteRecordRaw } from '@/router/types';

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    title: '首页',
    // keepAlive: true,
  },
};

export const MainRoute: AppRouteRecordRaw[] = [
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('@/views/user/ranking/index.vue'),
    meta: {
      title: '排行榜',
    },
  },
  {
    path: '/webview',
    name: 'WebView',
    component: () => import('@/views/webview/index.vue'),
    meta: {
      title: '食艺术公告',
    },
  },
  {
    path: '/one',
    name: 'One',
    component: () => import('@/views/home/one/index.vue'),
    meta: {
      title: '一元盲盒限时抢购',
    },
  },
  {
    path: '/one/agree',
    name: 'OneAgree',
    component: () => import('@/views/home/one/agree.vue'),
    meta: {
      title: '购买协议',
    },
  },
  {
    path: '/one/order',
    name: 'OneOrder',
    component: () => import('@/views/home/one/order.vue'),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/one/pay',
    name: 'OnePay',
    component: () => import('@/views/home/one/pay.vue'),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/lottery',
    name: 'Lottery',
    component: () => import('@/views/lottery/index.vue'),
    meta: {
      title: '抽奖',
    },
  },
  {
    path: '/blind',
    name: 'Blind',
    component: () => import('@/views/user/blind/index.vue'),
    meta: {
      title: '盲盒列表',
    },
  },
  {
    path: '/blind/detail',
    name: 'BlindDetail',
    component: () => import('@/views/user/blind/Detail.vue'),
    meta: {
      title: '盲盒详情',
    },
  },
  {
    path: '/blind/agree',
    name: 'BlindAgree',
    component: () => import('@/views/user/blind/agree.vue'),
    meta: {
      title: '盲盒发布协议',
    },
  },
  {
    path: '/blind/sendSku',
    name: 'BlindSendSku',
    component: () => import('@/views/user/blind/sendSku.vue'),
    meta: {
      title: '盲盒发布',
    },
  },
  {
    path: '/sell/list',
    name: 'SellList',
    component: () => import('@/views/sell/list/index.vue'),
    meta: {
      title: '往期发售',
    },
  },
  {
    path: '/sell/detail',
    name: 'SellDetail',
    component: () => import('@/views/sell/detail/index.vue'),
    meta: {
      title: '产品详情',
    },
  },
  {
    path: '/sell/agree',
    name: 'SellAgree',
    component: () => import('@/views/sell/agree/index.vue'),
    meta: {
      title: '购买协议',
    },
  },
  {
    path: '/sell/order',
    name: 'SellOrder',
    component: () => import('@/views/sell/order/index.vue'),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/blindBox',
    name: 'BlindBox',
    component: () => import('@/views/blindBox/list/index.vue'),
    meta: {
      title: '盲盒市场',
      keepAlive: true,
    },
  },
  {
    path: '/blindBox/detail',
    name: 'BlindBoxDetail',
    component: () => import('@/views/blindBox/detail/index.vue'),
    meta: {
      title: '盲盒详情',
    },
  },
  {
    path: '/blindBox/agree',
    name: 'BlindBoxAgree',
    component: () => import('@/views/blindBox/agree/index.vue'),
    meta: {
      title: '购买协议',
    },
  },
  {
    path: '/blindBox/order',
    name: 'BlindBoxOrder',
    component: () => import('@/views/blindBox/order/index.vue'),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/blindBox/pay',
    name: 'BlindBoxPay',
    component: () => import('@/views/blindBox/pay/index.vue'),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('@/views/goods/list/index.vue'),
    meta: {
      title: '藏品市场',
      keepAlive: true,
    },
  },
  {
    path: '/goods/detail',
    name: 'GoodsList',
    component: () => import('@/views/goods/detail/index.vue'),
    meta: {
      title: '产品详情',
    },
  },
  {
    path: '/goods/agree',
    name: 'GoodsAgree',
    component: () => import('@/views/goods/agree/index.vue'),
    meta: {
      title: '购买协议',
    },
  },
  {
    path: '/goods/order',
    name: 'GoodsOrder',
    component: () => import('@/views/goods/order/index.vue'),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/goods/pay',
    name: 'GoodsPay',
    component: () => import('@/views/goods/pay/index.vue'),
    meta: {
      title: '订单详情',
    },
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '我的',
      // keepAlive: true,
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
    path: '/group',
    name: 'Group',
    component: () => import('@/views/user/group/index.vue'),
    meta: {
      title: '加入社群',
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
    path: '/paymented',
    name: 'Payment',
    component: () => import('@/views/user/payment/index.vue'),
    meta: {
      title: '支付管理',
    },
  },
  {
    path: '/canteen',
    name: 'Canteen',
    component: () => import('@/views/canteen/index.vue'),
    meta: {
      title: '餐饮合作',
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
    path: '/alipay',
    name: 'Alipay',
    component: () => import('@/views/user/payment/alipay/index.vue'),
    meta: {
      title: '第三方支付',
    },
  },
  {
    path: '/bankCard',
    name: 'BankCard',
    component: () => import('@/views/user/payment/bankCard/List.vue'),
    meta: {
      title: '银行卡列表',
    },
  },
  {
    path: '/bankCard/add',
    name: 'AddBankCard',
    component: () => import('@/views/user/payment/bankCard/index.vue'),
    meta: {
      title: '银行卡绑定',
    },
  },
  {
    path: '/pay/fail',
    name: 'PayFail',
    component: () => import('@/views/user/payment/fail/index.vue'),
    meta: {
      title: '支付失败',
    },
  },
  {
    path: '/pay/success',
    name: 'PaySuccess',
    component: () => import('@/views/user/payment/success/index.vue'),
    meta: {
      title: '支付成功',
    },
  },
  {
    path: '/distribute',
    name: 'Distribute',
    component: () => import('@/views/user/distribute/index.vue'),
    meta: {
      title: '邀请新人',
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
      title: '我的藏品',
    },
  },
  {
    path: '/locked/list',
    name: 'LockedList',
    component: () => import('@/views/user/locked/List.vue'),
    meta: {
      title: '我的藏品',
    },
  },
  {
    path: '/locked/detail',
    name: 'LockedDetail',
    component: () => import('@/views/user/locked/detail.vue'),
    meta: {
      title: '藏品详情',
    },
  },
  {
    path: '/locked/agree',
    name: 'LockedAgree',
    component: () => import('@/views/user/locked/agree.vue'),
    meta: {
      title: '藏品发布协议',
    },
  },
  {
    path: '/locked/sendSku',
    name: 'LockedSendSku',
    component: () => import('@/views/user/locked/sendSku.vue'),
    meta: {
      title: '藏品发布',
    },
  },
  {
    path: '/merchant',
    name: 'Merchant',
    component: () => import('@/views/user/locked/merchant.vue'),
    meta: {
      title: '入网设置',
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
    path: '/order/blindBuy',
    name: 'BlindBuy',
    component: () => import('@/views/user/order/blindBuy/index.vue'),
    meta: {
      title: '我买到的',
    },
  },
  {
    path: '/order/market',
    name: 'Market',
    component: () => import('@/views/user/order/market/index.vue'),
    meta: {
      title: '市场交易',
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
    path: '/order/blindPublish',
    name: 'BlindPublish',
    component: () => import('@/views/user/order/blindPublish/index.vue'),
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
    path: '/order/blindSale',
    name: 'BlindSale',
    component: () => import('@/views/user/order/blindSale/index.vue'),
    meta: {
      title: '我卖出的',
    },
  },
  {
    path: '/prize',
    name: 'Prize',
    component: () => import('@/views/user/prize/index.vue'),
    meta: {
      title: '我的抽签',
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
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/auth/index.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/register/index.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('@/views/user/forgot/index.vue'),
    meta: {
      title: '找回密码',
    },
  },
  {
    path: '/agree',
    name: 'Agree',
    component: () => import('@/views/user/agree/index.vue'),
    meta: {
      title: '协议',
    },
  },
  {
    path: '/news/list',
    name: 'NewsList',
    component: () => import('@/views/news/list/index.vue'),
    meta: {
      title: '食艺热点',
    },
  },
  {
    path: '/news/detail',
    name: 'NewsDetail',
    component: () => import('@/views/news/detail/index.vue'),
    meta: {
      title: '详情',
    },
  },
  {
    path: '/distribute/child',
    name: 'DistributeChild',
    component: () => import('@/views/user/distribute/child/index.vue'),
    meta: {
      title: '邀请列表',
    },
  },
  {
    path: '/distribute/wechat',
    name: 'DistributeWechat',
    component: () => import('@/views/user/distribute/wechat/index.vue'),
    meta: {
      title: '邀请码',
    },
  },
  {
    path: '/coupon/list',
    name: 'CouponList',
    component: () => import('@/views/user/coupon/List.vue'),
    meta: {
      title: '优惠券列表',
    },
  },
  {
    path: '/coupon/detail',
    name: 'CouponDetail',
    component: () => import('@/views/user/coupon/detail.vue'),
    meta: {
      title: '优惠券详情',
    },
  },
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
