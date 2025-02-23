<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 12:14:44
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-18 23:42:18
 * @Description: 
-->
<template>
  <div class="logo-container" v-if="setting.isShowLogo">
    <img :src="setting.logoPng" alt="Logo" class="logo-img" />
    <h1 class="web-title" v-show="!settingStore.isFold">{{ setting.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting/index'

// 获取设置仓库实例
const settingStore = useLayoutSettingStore()
</script>

<style lang="scss" scoped>
.logo-container {
  width: 100%;
  height: $base-menu-logo-height;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .logo-img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 10px;
  }
  .web-title {
    font-size: $base-logo-title-fontSize;
    color: #fff;
    margin: 0;
    padding: 0;
    transition: all 0.3s;
  }
}
</style>
