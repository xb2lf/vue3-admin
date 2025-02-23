/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-17 20:46:13
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 20:02:35
 * @Description:
 */

// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login', // 命名路由
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/Layout/index.vue'),
    meta: {
      title: '',
      hidden: false,
      icon: 'Avatar',
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () =>
      import(/* webpackChunkName: "screen" */ '@/views/Screen/index.vue'),
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]

// 异步路由
export const asyncRoutes = [
  {
    path: '/acl',
    name: 'Acl',
    redirect: '/acl/user',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/Layout/index.vue'),
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        name: 'User',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/Acl/User/index.vue'),
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        name: 'Role',
        component: () =>
          import(/* webpackChunkName: "role" */ '@/views/Acl/Role/index.vue'),
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () =>
          import(
            /* webpackChunkName: "permission" */ '@/views/Acl/Permission/index.vue'
          ),
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Menu',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'Product',
    redirect: '/product/trademark',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/Layout/index.vue'),
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () =>
          import(
            /* webpackChunkName: "trademark" */ '@/views/Product/Trademark/index.vue'
          ),
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () =>
          import(
            /* webpackChunkName: "attr" */ '@/views/Product/Attr/index.vue'
          ),
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () =>
          import(/* webpackChunkName: "spu" */ '@/views/Product/Spu/index.vue'),
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () =>
          import(/* webpackChunkName: "sku" */ '@/views/Product/Sku/index.vue'),
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Orange',
        },
      },
    ],
  },
]

// 任意路由
export const anyRoutes = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
  },
}
