import { BasicLayout } from '@/layouts';

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/404',
    name: '404',
    meta: { title: '404异常页' },
    component: () => import('@/views/exception/404')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '后台管理' },
    component: () => import('@/views/login/index')
  },
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'admin',
    component: () => import('@/layouts/BasicLayout'),
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'main',
        component: () => import('@/views/main/index'),
        meta: { title: '网站概况', keepAlive: true, icon: 'el-icon-monitor', permission: [ 'main' ] },
      },
      {
        path: '/product',
        name: 'product',
        component: RouteView,
        redirect: '/product/index',
        meta: { title: '产品管理', keepAlive: false, icon: 'el-icon-shopping-bag-2', permission: [] },
        children: [
          {
            path: '/product/index',
            name: 'productIndex',
            component: RouteView,
            redirect: '/product/list',
            meta: { title: '产品列表', keepAlive: false, permission: [] },
            children: [
              {
                path: '/product/list',
                name: 'productList',
                component: () => import('@/views/product/List'),
                meta: { title: '产品首页', keepAlive: false, menu:'productIndex', permission: [ 'product.list' ] },
              },
              {
                path: '/product/add',
                name: 'productAdd',
                component: () => import('@/views/product/Add'),
                meta: { title: '添加产品', keepAlive: false, menu:'productIndex', permission: [ 'product.add' ] },
              },
            ]
          },
          {
            path: '/productCategory/index',
            name: 'productCategoryIndex',
            component: RouteView,
            redirect: '/productCategory/list',
            meta: { title: '分类管理', keepAlive: false, permission: [] },
            children: [
              {
                path: '/productCategory/list',
                name: 'productCategoryList',
                component: () => import('@/views/product/type/List'),
                meta: { title: '分类首页', keepAlive: false, menu:'productCategoryIndex', permission: [ 'product.list' ] },
              },
              {
                path: '/productCategory/add',
                name: 'productCategoryAdd',
                component: () => import('@/views/product/type/Add'),
                meta: { title: '添加分类', keepAlive: false, menu:'productCategoryIndex', permission: [ 'product.add' ] },
              },
            ]
          },
          {
            path: '/product/attr',
            name: 'productAttr',
            component: () => import('@/views/product/attr/List'),
            meta: { title: '产品属性', keepAlive: false, permission: [ 'product.attr' ] }
          }
        ]
      },
      {
        path: '/content',
        name: 'content',
        component: () => import('@/views/content/index'),
        redirect: '/news/list',
        meta: { title: '内容管理', keepAlive: false, icon: 'el-icon-news', permission: [] },
        children: [
          {
            path: '/news/list',
            name: 'newsList',
            component: () => import('@/views/content/news/List'),
            meta: { title: '新闻资讯', keepAlive: false, permission: [ 'news.list' ] },
          },
          {
            path: '/introduce/list',
            name: 'introduceList',
            component: () => import('@/views/content/introduce/List'),
            meta: { title: '介绍内容', keepAlive: false, permission: [ 'introduce.list' ] },
          },
          {
            path: '/atlas/list',
            name: 'atlasList',
            component: () => import('@/views/content/atlas/List'),
            meta: { title: '企业图册', keepAlive: false, permission: [ 'atlas.list' ] },
          },
          {
            path: '/problem/list',
            name: 'problemList',
            component: () => import('@/views/content/problem/List'),
            meta: { title: '常见问题', keepAlive: false, permission: [ 'problem.list' ] },
          },
        ]
      },
      {
        path: '/pages',
        name: 'pages',
        component: () => import('@/views/pages/index'),
        redirect: '/banner/list',
        meta: { title: '页面管理', keepAlive: false, icon: 'el-icon-document', permission: [] },
        children: [
          {
            path: '/banner/list',
            name: 'bannerList',
            component: () => import('@/views/pages/banner/List'),
            meta: { title: 'Banner管理', keepAlive: false, permission: [ 'banner.list' ] }
          },
          {
            path: '/nav/list',
            name: 'navList',
            component: () => import('@/views/pages/nav/List'),
            meta: { title: '导航管理', keepAlive: false, permission: [ 'nav.list' ] }
          },
          {
            path: '/filter/list',
            name: 'filterList',
            component: () => import('@/views/pages/filter/List'),
            meta: { title: '导航管理', keepAlive: false, permission: [ 'filter.list' ] }
          },
          {
            path: '/customize/list',
            name: 'customizeList',
            component: () => import('@/views/pages/customize/List'),
            meta: { title: '自定义内容页', keepAlive: false, permission: [ 'customize.list' ] }
          },
        ]
      },
      {
        path: '/resource',
        name: 'resource',
        component: RouteView,
        redirect: '/image',
        meta: { title: '资源管理', keepAlive: false, icon: 'el-icon-coin', permission: [] },
        children: [
          {
            path: '/image',
            name: 'image',
            component: RouteView,
            redirect: '/image/list',
            meta: { title: '图片库', keepAlive: false, permission: [] },
            children: [
              {
                path: '/image/list',
                name: 'imageList',
                component: () => import('@/views/resource/image/List'),
                meta: { title: '图片库首页', keepAlive: false, menu:'image', permission: [ 'image.list' ] },
              },
            ]
          },
          {
            path: '/video',
            name: 'video',
            component: RouteView,
            redirect: '/video/list',
            meta: { title: '视频库', keepAlive: false, permission: [ ] },
            children: [
              {
                path: '/video/list',
                name: 'videoList',
                component: () => import('@/views/resource/video/List'),
                meta: { title: '视频库首页', keepAlive: false, menu:'video', permission: [ 'video.list' ] },
              },
            ]
          },
          {
            path: '/audio',
            name: 'audio',
            component: RouteView,
            redirect: '/audio/list',
            meta: { title: '音频库', keepAlive: false, permission: [ ] },
            children: [
              {
                path: '/audio/list',
                name: 'audioList',
                component: () => import('@/views/resource/audio/List'),
                meta: { title: '音频库首页', keepAlive: false, menu:'audio', permission: [ 'audio.list' ] },
              },
            ]
          },
          {
            path: '/files',
            name: 'files',
            component: RouteView,
            redirect: '/files/list',
            meta: { title: '文件库', keepAlive: false, permission: [ ] },
            children: [
              {
                path: '/files/list',
                name: 'filesList',
                component: () => import('@/views/resource/files/List'),
                meta: { title: '文件库首页', keepAlive: false, menu:'files', permission: [ 'files.list' ] },
              },
            ]
          },
        ]
      },
      {
        path: '/intention',
        name: 'intention',
        component: () => import('@/views/intention/index'),
        redirect: '/clue/list',
        meta: { title: '意向管理', keepAlive: false, icon: 'el-icon-star-off', permission: [] },
        children: [
          {
            path: '/clue/list',
            name: 'clueList',
            component: () => import('@/views/intention/clue/List'),
            meta: { title: '线索管理', keepAlive: false, permission: [ 'clue.list' ] }
          },
          {
            path: '/remind/list',
            name: 'remindList',
            component: () => import('@/views/intention/remind/List'),
            meta: { title: '提醒管理', keepAlive: false, permission: [ 'remind.list' ] }
          },
          {
            path: '/info/list',
            name: 'infoList',
            component: () => import('@/views/intention/info/List'),
            meta: { title: '意向信息', keepAlive: false, permission: [ 'info.list' ] }
          },
          {
            path: '/interactive/list',
            name: 'interactiveList',
            component: () => import('@/views/intention/interactive/List'),
            meta: { title: '互动表单', keepAlive: false, permission: [ 'interactive.list' ] }
          },
          {
            path: '/universal/list',
            name: 'universalList',
            component: () => import('@/views/intention/universal/List'),
            meta: { title: '万能表单', keepAlive: false, permission: [ 'universal.list' ] }
          },
        ]
      },
      {
        path: '/client',
        name: 'client',
        component: () => import('@/views/client/index'),
        redirect: '/client/list',
        meta: { title: '客户管理', keepAlive: false, icon: 'el-icon-user', permission: [] },
        children: [
          {
            path: '/client/list',
            name: 'clientList',
            component: () => import('@/views/client/List'),
            meta: { title: '客户列表', keepAlive: false, permission: [ 'client.list' ] }
          },
        ]
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting/index'),
        redirect: '/setting/list',
        meta: { title: '网站设置', keepAlive: false, icon: 'el-icon-setting', permission: [] },
        children: [
          {
            path: '/setting/list',
            name: 'settingList',
            component: () => import('@/views/setting/List'),
            meta: { title: '基本设置', keepAlive: false, permission: [ 'client.list' ] }
          },
        ]
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'index',
  //   component: BasicLayout,
  //   meta: { title: 'menu.home' },
  //   redirect: '/dashboard/workplace',
  //   children: [
  //     // dashboard
  //     {
  //       path: '/dashboard',
  //       name: 'dashboard',
  //       redirect: '/dashboard/workplace',
  //       component: RouteView,
  //       meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
  //       children: [
  //         {
  //           path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
  //           name: 'Analysis',
  //           component: () => import('@/views/dashboard/Analysis'),
  //           meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: [ 'dashboard' ] }
  //         },
  //         // 外部链接
  //         {
  //           path: 'https://www.baidu.com/',
  //           name: 'Monitor',
  //           meta: { title: 'menu.dashboard.monitor', target: '_blank' }
  //         },
  //         {
  //           path: '/dashboard/workplace',
  //           name: 'Workplace',
  //           component: () => import('@/views/dashboard/Workplace'),
  //           meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: [ 'dashboard' ] }
  //         }
  //       ]
  //     },
  //
  //     // forms
  //     {
  //       path: '/form',
  //       redirect: '/form/base-form',
  //       component: RouteView,
  //       meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
  //       children: [
  //         {
  //           path: '/form/base-form',
  //           name: 'BaseForm',
  //           component: () => import('@/views/form/basicForm'),
  //           meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
  //         },
  //         {
  //           path: '/form/step-form',
  //           name: 'StepForm',
  //           component: () => import('@/views/form/stepForm/StepForm'),
  //           meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
  //         },
  //         {
  //           path: '/form/advanced-form',
  //           name: 'AdvanceForm',
  //           component: () => import('@/views/form/advancedForm/AdvancedForm'),
  //           meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
  //         }
  //       ]
  //     },
  //
  //     // list
  //     {
  //       path: '/list',
  //       name: 'list',
  //       component: RouteView,
  //       redirect: '/list/table-list',
  //       meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
  //       children: [
  //         {
  //           path: '/list/table-list/:pageNo([1-9]\\d*)?',
  //           name: 'TableListWrapper',
  //           hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
  //           component: () => import('@/views/list/TableList'),
  //           meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
  //         },
  //         {
  //           path: '/list/basic-list',
  //           name: 'BasicList',
  //           component: () => import('@/views/list/BasicList'),
  //           meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
  //         },
  //         {
  //           path: '/list/card',
  //           name: 'CardList',
  //           component: () => import('@/views/list/CardList'),
  //           meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
  //         },
  //         {
  //           path: '/list/search',
  //           name: 'SearchList',
  //           component: () => import('@/views/list/search/SearchLayout'),
  //           redirect: '/list/search/article',
  //           meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
  //           children: [
  //             {
  //               path: '/list/search/article',
  //               name: 'SearchArticles',
  //               component: () => import('../views/list/search/Article'),
  //               meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
  //             },
  //             {
  //               path: '/list/search/project',
  //               name: 'SearchProjects',
  //               component: () => import('../views/list/search/Projects'),
  //               meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
  //             },
  //             {
  //               path: '/list/search/application',
  //               name: 'SearchApplications',
  //               component: () => import('../views/list/search/Applications'),
  //               meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //
  //     // profile
  //     {
  //       path: '/profile',
  //       name: 'profile',
  //       component: RouteView,
  //       redirect: '/profile/basic',
  //       meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
  //       children: [
  //         {
  //           path: '/profile/basic',
  //           name: 'ProfileBasic',
  //           component: () => import('@/views/profile/basic'),
  //           meta: { title: '基础详情页', permission: [ 'profile' ] }
  //         },
  //         {
  //           path: '/profile/advanced',
  //           name: 'ProfileAdvanced',
  //           component: () => import('@/views/profile/advanced/Advanced'),
  //           meta: { title: '高级详情页', permission: [ 'profile' ] }
  //         }
  //       ]
  //     },
  //
  //     // result
  //     {
  //       path: '/result',
  //       name: 'result',
  //       component: RouteView,
  //       redirect: '/result/success',
  //       meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
  //       children: [
  //         {
  //           path: '/result/success',
  //           name: 'ResultSuccess',
  //           component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
  //           meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
  //         },
  //         {
  //           path: '/result/fail',
  //           name: 'ResultFail',
  //           component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
  //           meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
  //         }
  //       ]
  //     },
  //
  //     // Exception
  //     {
  //       path: '/exception',
  //       name: 'exception',
  //       component: RouteView,
  //       redirect: '/exception/403',
  //       meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
  //       children: [
  //         {
  //           path: '/exception/403',
  //           name: 'Exception403',
  //           component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
  //           meta: { title: '403', permission: [ 'exception' ] }
  //         },
  //         {
  //           path: '/exception/404',
  //           name: 'Exception404',
  //           component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  //           meta: { title: '404', permission: [ 'exception' ] }
  //         },
  //         {
  //           path: '/exception/500',
  //           name: 'Exception500',
  //           component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
  //           meta: { title: '500', permission: [ 'exception' ] }
  //         }
  //       ]
  //     },
  //
  //     // account
  //     {
  //       path: '/account',
  //       component: RouteView,
  //       redirect: '/account/center',
  //       name: 'account',
  //       meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
  //       children: [
  //         {
  //           path: '/account/center',
  //           name: 'center',
  //           component: () => import('@/views/account/center'),
  //           meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
  //         },
  //         {
  //           path: '/account/settings',
  //           name: 'settings',
  //           component: () => import('@/views/account/settings/Index'),
  //           meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
  //           redirect: '/account/settings/base',
  //           hideChildrenInMenu: true,
  //           children: [
  //             {
  //               path: '/account/settings/base',
  //               name: 'BaseSettings',
  //               component: () => import('@/views/account/settings/BaseSetting'),
  //               meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
  //             },
  //             {
  //               path: '/account/settings/security',
  //               name: 'SecuritySettings',
  //               component: () => import('@/views/account/settings/Security'),
  //               meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
  //             },
  //             {
  //               path: '/account/settings/custom',
  //               name: 'CustomSettings',
  //               component: () => import('@/views/account/settings/Custom'),
  //               meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
  //             },
  //             {
  //               path: '/account/settings/binding',
  //               name: 'BindingSettings',
  //               component: () => import('@/views/account/settings/Binding'),
  //               meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
  //             },
  //             {
  //               path: '/account/settings/notification',
  //               name: 'NotificationSettings',
  //               component: () => import('@/views/account/settings/Notification'),
  //               meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //
  //     // other
  //     /*
  //     {
  //       path: '/other',
  //       name: 'otherPage',
  //       component: PageView,
  //       meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
  //       redirect: '/other/icon-selector',
  //       children: [
  //         {
  //           path: '/other/icon-selector',
  //           name: 'TestIconSelect',
  //           component: () => import('@/views/other/IconSelectorView'),
  //           meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
  //         },
  //         {
  //           path: '/other/list',
  //           component: RouteView,
  //           meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
  //           redirect: '/other/list/tree-list',
  //           children: [
  //             {
  //               path: '/other/list/tree-list',
  //               name: 'TreeList',
  //               component: () => import('@/views/other/TreeList'),
  //               meta: { title: '树目录表格', keepAlive: true }
  //             },
  //             {
  //               path: '/other/list/edit-table',
  //               name: 'EditList',
  //               component: () => import('@/views/other/TableInnerEditList'),
  //               meta: { title: '内联编辑表格', keepAlive: true }
  //             },
  //             {
  //               path: '/other/list/user-list',
  //               name: 'UserList',
  //               component: () => import('@/views/other/UserList'),
  //               meta: { title: '用户列表', keepAlive: true }
  //             },
  //             {
  //               path: '/other/list/role-list',
  //               name: 'RoleList',
  //               component: () => import('@/views/other/RoleList'),
  //               meta: { title: '角色列表', keepAlive: true }
  //             },
  //             {
  //               path: '/other/list/system-role',
  //               name: 'SystemRole',
  //               component: () => import('@/views/role/RoleList'),
  //               meta: { title: '角色列表2', keepAlive: true }
  //             },
  //             {
  //               path: '/other/list/permission-list',
  //               name: 'PermissionList',
  //               component: () => import('@/views/other/PermissionList'),
  //               meta: { title: '权限列表', keepAlive: true }
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //     */
  //   ]
  // },
  {
    path: '*', redirect: '/404', hidden: true
  }
]
