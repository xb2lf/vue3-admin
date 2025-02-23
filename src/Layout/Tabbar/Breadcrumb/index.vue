<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 18:23:53
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-18 20:00:13
 * @Description: 
-->
<template>
  <div class="breadcrumb-container">
    <el-icon class="expand-icon" @click="handleToggleFold">
      <component :is="settingStore.isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <div class="breadcrumb-item-content">
          <el-icon class="route-item-icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </div>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting/index'

// 获取设置仓库实例
const settingStore = useLayoutSettingStore()

// 获取路由对象
const $route = useRoute()

// 切换图标
const handleToggleFold = () => settingStore.updateIsFold()
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  .expand-icon {
    margin-right: 10px;
  }
  .breadcrumb-item-content {
    display: flex;
    align-items: center;
    .route-item-icon {
      margin-right: 5px;
    }
  }
}
</style>
