/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-14 09:44:39
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 21:46:25
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/index'
// 引入模板的全局样式
import '@/styles/index.scss'
// 引入element-plus的样式
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'dayjs/locale/zh-cn'
// 引入store
import pinia from '@/store/index'
// 引入路由
import router from '@/router/index'
// 引入自定义指令文件
import { isHasButton } from '@/directive/has'

// 获取应用实例对象
const app = createApp(App)

// 安装自定义插件
app.use(globalComponent)
// 安装store
app.use(pinia)
// 安装路由
app.use(router)
// 引入路由鉴权文件
import '@/permisstion'
// 调用自定义指令文件中函数，传入app
isHasButton(app)
// 将应用挂载到挂载点上
app.mount('#app')
