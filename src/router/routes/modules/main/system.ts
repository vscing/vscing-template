import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.main.system.moduleName'),
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.main.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/main/system/account/index.vue'),
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: t('routes.main.system.account_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: () => import('/@/views/main/system/account/AccountDetail.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.main.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/main/system/role/index.vue'),
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.main.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/main/system/menu/index.vue'),
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: t('routes.main.system.dept'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/main/system/dept/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: t('routes.main.system.password'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/main/system/password/index.vue'),
    },
  ],
};

export default system;
