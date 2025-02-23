/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-17 22:18:21
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 21:41:08
 * @Description:
 */
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import cloneDeep from 'lodash/cloneDeep'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
import type {
  LoginForm,
  LoginResponseData,
  UserInfoResponseData,
  LogoutReponseData,
} from '@/api/user/type'
import type { UserState } from './type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入常量路由
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routes'
// 引入路由
import router from '@/router'

// 定义动态过滤的路由
let dynamicRoutes: RouteRecordRaw[] = []

// 过滤当前用户需要展示的异步路由
const filterAsyncRoute = (
  userAsyncRoutes: RouteRecordRaw[],
  routes: string[],
) => {
  const currAsyncRoutes = cloneDeep(userAsyncRoutes)
  const newAsyncRoute = currAsyncRoutes.filter((item: RouteRecordRaw) => {
    if (routes.includes(item.name as string)) {
      if (item?.children?.length) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
  return newAsyncRoute
}

// 创建用户相关仓库
const useUserStore = defineStore('UserStore', {
  // 状态数据
  state: (): UserState => {
    return {
      token: GET_TOKEN() || '',
      menuRoutes: constantRoutes,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  // 异步/改变状态
  actions: {
    // 用户登录
    async userLogin(data: LoginForm) {
      const res: LoginResponseData = await reqLogin(data)
      if (res.code === 200) {
        this.token = res.data as string
        // 本地持久化
        SET_TOKEN(res.data as string)
        return Promise.resolve(res.data as string)
      } else {
        return Promise.reject(new Error(res.data as string))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const res: UserInfoResponseData = await reqUserInfo()
      if (res.code === 200) {
        this.username = res?.data?.name || ''
        this.avatar = res?.data?.avatar || ''
        this.buttons = res?.data.buttons || []
        // 动态过滤异步路由
        const userAsyncRoutes = filterAsyncRoute(asyncRoutes, res?.data?.routes)
        this.menuRoutes = [...constantRoutes, ...userAsyncRoutes, anyRoutes]
        // 目前路由器管理的只有常量路由，用户计算完毕后仍需动态追加异步路由、任意路由
        dynamicRoutes = [...userAsyncRoutes, anyRoutes]
        dynamicRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
        return Promise.resolve('获取用户信息成功')
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 清除登录及个人信息
    clearUserInfo() {
      this.token = ''
      this.menuRoutes = constantRoutes
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
      // 移除动态追加的异步路由
      dynamicRoutes.forEach(
        (route: RouteRecordRaw) =>
          !!route.name && router.removeRoute(route.name),
      )
    },
    // 退出登录
    async userLogout() {
      const res: LogoutReponseData = await reqLogout()
      if (res.code === 200) {
        this.clearUserInfo()
        return Promise.resolve('退出登录成功')
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
})

export default useUserStore
