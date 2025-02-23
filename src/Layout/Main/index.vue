<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 17:05:23
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-18 20:19:10
 * @Description: 
-->
<template>
  <!-- 二级路由组件出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="isReload" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting/index'

// 控制当前组件是否销毁重建
const isReload = ref(true)

// 获取设置相关的仓库实例
const settingStore = useLayoutSettingStore()

// 销毁再重建路由组件
const reloadComponent = () => {
  // 销毁路由组件
  isReload.value = false
  // 重建路由组件
  nextTick(() => {
    isReload.value = true
  })
}

// 监听仓库状态是否发生变化，来判断用户是否点击了刷新操作
watch(
  () => settingStore.isRefresh,
  () => reloadComponent(),
)
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
