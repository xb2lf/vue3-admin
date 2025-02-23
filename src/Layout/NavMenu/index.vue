<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item?.meta?.hidden"
        :index="item.path"
        @click="handleGoRoute"
      >
        <el-icon>
          <component :is="item?.meta?.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item?.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只一个子路由 -->
    <template v-else-if="item?.children?.length === 1">
      <el-menu-item
        v-if="!item.children[0]?.meta?.hidden"
        :index="item.children[0].path"
        @click="handleGoRoute"
      >
        <el-icon>
          <component :is="item.children[0]?.meta?.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0]?.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 多个子路由 -->
    <template v-else-if="item?.children?.length > 1">
      <el-sub-menu v-if="!item?.meta?.hidden" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item?.meta?.icon"></component>
          </el-icon>
          <span>{{ item?.meta?.title }}</span>
        </template>
        <!-- 递归组件 -->
        <NavMenu :menuList="item.children"></NavMenu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 使用 defineComponent 定义组件并设置 name
export default defineComponent({
  name: 'NavMenu',
})
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

withDefaults(
  defineProps<{
    menuList: RouteRecordRaw[]
  }>(),
  {
    menuList: () => [],
  },
)

// 路由实例
const $router = useRouter()

// 点击菜单进行跳转
const handleGoRoute = (item: any) => {
  $router.push(item.index)
}
</script>
