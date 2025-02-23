/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-14 14:43:11
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-18 15:24:49
 * @Description:
 */
import type { App } from 'vue'
import * as components from './components'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const install = function (app: App) {
  // 注册项目中全部的组件为全局组件
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value)
  })
  // 将element-plus提供图标全部注册为全局组件
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default install
export * from './components'
