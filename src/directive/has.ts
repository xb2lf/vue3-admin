/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-23 21:44:20
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 21:58:01
 * @Description:
 */
import pinia from '@/store'
import useUserStore from '@/store/modules/user'

// 获取用户相关仓库实例
const userStore = useUserStore(pinia)

export const isHasButton = (app: any) => {
  // 全局自定义指令：实现按钮的权限
  app.directive('has', {
    // 代表使用这个全局自定义指令的DOM/组件挂载完毕的时候会执行一次
    mounted(el: any, options: any) {
      // 自定义指令右侧的数值：如果用户信息bittons数组当中不存在，直接把使用此指令的DOM从DOM树中删除
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
