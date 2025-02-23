/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-17 20:33:57
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-18 22:20:04
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from '@/router/routes.ts'

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: [...constantRoutes],
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
