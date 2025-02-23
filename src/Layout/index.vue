<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div
      class="layout-slider"
      :class="{ 'fold-layout-slider': settingStore.isFold }"
    >
      <!-- Logo -->
      <Logo></Logo>
      <!-- 导航菜单 -->
      <el-scrollbar class="menu-contanier" :always="false" :native="false">
        <el-menu
          mode="vertical"
          :default-active="activeIndex"
          :collapse="settingStore.isFold"
          background-color="#001529"
          text-color="#ffffff"
          active-text-color="#409eff"
          @select="handleSelect"
        >
          <NavMenu :menuList="userStore.menuRoutes"></NavMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 右侧展示内容 -->
    <div
      class="layout-right-content"
      :class="{ 'expand-layout-right-content': settingStore.isFold }"
    >
      <!-- 顶部导航 -->
      <div class="layout-tabbar">
        <Tabbar></Tabbar>
      </div>
      <!-- 内容展示区域 -->
      <div class="layout-main">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './Logo/index.vue'
import NavMenu from './NavMenu/index.vue'
import Tabbar from './Tabbar/index.vue'
import Main from './Main/index.vue'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting/index'

// 用户仓库实例
const userStore = useUserStore()

// 获取设置仓库实例
const settingStore = useLayoutSettingStore()

// 获取路由对象
const $route = useRoute()

// 选中菜单索引
const activeIndex = ref($route.path)

// 菜单选择事件
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;

  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .menu-contanier {
      width: 100%;
      height: calc(100% - $base-menu-logo-height);
      padding: 10px;
      box-sizing: border-box;

      .el-menu {
        border-right: none;
      }
    }
  }

  .fold-layout-slider {
    width: $base-fold-menu-width;
  }

  .layout-right-content {
    width: calc(100% - $base-menu-width);
    height: 100%;
    transition: all 0.3s;

    .layout-tabbar {
      width: 100%;
      height: $base-tabbar-height;
    }

    .layout-main {
      width: 100%;
      height: calc(100vh - $base-tabbar-height);
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }

  .expand-layout-right-content {
    width: calc(100% - $base-fold-menu-width);
  }
}
</style>
