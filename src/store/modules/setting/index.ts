// 页面交互及设置相关仓库
import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      isFold: false, // 页面左侧导航菜单是否折叠
      isRefresh: false, // 页面点击刷新按钮状态记录
    }
  },
  actions: {
    updateIsFold() {
      this.isFold = !this.isFold
    },
    updateIsRefresh() {
      this.isRefresh = !this.isRefresh
    },
  },
  getters: {},
})

export default useLayoutSettingStore
