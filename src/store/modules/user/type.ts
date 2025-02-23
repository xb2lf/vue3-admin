/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-17 23:29:24
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 19:44:51
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'

// 定义用户仓库ts类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}
