import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    name: 'index',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: 'mainpage',
      component: () => import('@/views/mainpage/index'),
      meta: { title: '系统首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/form',
    component: Layout,
    name: 'User',
    meta: { title: '用户权限管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'form' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/role/index'),
        meta: { title: '角色管理' }

      }
    ]
  },
  // {
  //   path: '/settings',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'settings',
  //       component: () => import('@/views/seetings/index'),
  //       meta: { title: '系统设置' }
  //     }
  //   ]
  // },
  {
    path: '/management',
    component: Layout,
    name: 'management',
    meta: { title: '设备管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'robot',
        component: () => import('@/views/managment/robot/index'),
        name: 'robot',
        meta: { title: '设备管理' }
      }

    ]
  },

  {
    path: '/data',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'data',
        component: () => import('@/views/data/index'),
        meta: { title: '趋势曲线', icon: 'el-icon-s-data' }
      }
    ]
  },

  {
    path: '/history',
    component: Layout,
    name: 'history',
    meta: { title: '历史数据', icon: 'el-icon-date' },
    children: [
      {
        path: 'search',
        component: () => import('@/views/history/search/realtime'),
        name: 'search',
        meta: { title: '实时数据' }
      },
      {
        path: 'upload',
        component: () => import('@/views/history/search/temperature'),
        name: 'upload',
        meta: { title: '测温点数据' }
      },
      {
        path: 'photo',
        component: () => import('@/views/history/search/photo'),
        name: 'photo',
        meta: { title: '图片存储', icon: 'el-icon-picture' }
      }
    ]

  },

  {
    path: '/event',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'event',
        component: () => import('@/views/event/index'),
        meta: { title: '事件记录', icon: 'el-icon-folder' }
      }
    ]
  },

  {
    path: '/replay',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'replay',
        component: () => import('@/views/replay/index'),
        meta: { title: '录像回放', icon: 'el-icon-video-play' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
