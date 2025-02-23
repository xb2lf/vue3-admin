<template>
  <div class="setting-container">
    <el-button type="default" size="small" icon="Refresh" circle class="action-btn" @click="handleRefresh"></el-button>
    <el-button type="default" size="small" icon="FullScreen" circle class="action-btn"
      @click="handleSwitchFullScreen"></el-button>
    <!-- 切换主题--抽屉方式 -->
    <!-- <el-button type="default" size="small" icon="Setting" circle class="action-btn"
      @click="handleToggleTheme"></el-button> -->
    <!-- 切换主题--Popover气泡卡片方式 -->
    <el-popover placement="bottom" title="设置主题" :width="200" trigger="click">
      <el-form class="switch-theme-form">
        <el-form-item label="主题颜色">
          <el-color-picker size="small" show-alpha :predefine="predefineColors" :teleported="false" v-model="themeColor"
            @change="handleColorChange" />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch size="small" inline-prompt active-icon="Moon" inactive-icon="Sunny" v-model="isDark"
            style="--el-switch-on-color:#13ce66;" @change="handleSwitchChange"></el-switch>
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button type="default" size="small" icon="Setting" circle class="action-btn"></el-button>
      </template>
    </el-popover>
    <img :src="userStore.avatar || defaultAvatar" alt="头像" class="avatar-content" />
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- command:派发到command回调函数的指令参数 -->
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>             
    <!-- 切换主题--抽屉方式 -->
    <!-- <el-drawer v-model="isShowDrawer" direction="rtl" :size="300">
      <template #header>
        <h4>主题设置</h4>
      </template>
      <template #default>
        <el-form class="switch-theme-form">
          <el-form-item label="主题颜色">
            <el-color-picker show-alpha :predefine="predefineColors" v-model="themeColor" @change="handleColorChange" />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch inline-prompt active-icon="Moon" inactive-icon="Sunny" v-model="isDark"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              @change="handleSwitchChange"></el-switch>
          </el-form-item>
        </el-form>
      </template>
    </el-drawer> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import defaultAvatar from '@/assets/images/user/default_avatar.png'

// 获取设置相关的仓库实例
const settingStore = useLayoutSettingStore()

// 获取用户仓库实例
const userStore = useUserStore()

// 获取路由对象
const $router = useRouter()

// 获取路由实例
const $route = useRoute()

// 控制抽屉开关
const isShowDrawer = ref<boolean>(false)

// 主题颜色
const themeColor = ref<string>('#409EFF')

// 颜色选择器预设定颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 暗黑模式开关
const isDark = ref<boolean>(false)

// 刷新按钮点击
const handleRefresh = () => settingStore.updateIsRefresh()

// 全屏切换按钮点击
// TODO 以下简单方法可能存在浏览器兼容问题
const handleSwitchFullScreen = () => {
  // 全屏元素(DOM对象的属性，用来判断当前是否全屏,[全屏：true,不是全屏：null])
  const full = document.fullscreenElement
  // 切换为全屏
  if (!full) {
    // 利用文档根节点的方法requestFullscreen，实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

// 主题风格切换
const handleToggleTheme = () => {
  isShowDrawer.value = true
}

// 主题颜色change事件
const handleColorChange = (color: string | null) => {
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // const el = document.getElementById('xxx')
  // 获取 css 变量
  // getComputedStyle(el).getPropertyValue(`--el-color-primary`)
  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color)
}

// 暗黑模式开关
const handleSwitchChange = (onOff: string | number | boolean) => {
  // 获取HTMl根节点
  const html = document.documentElement;
  // 设置暗黑模式
  html.className = isDark.value ? 'dark' : ''
}

// 退出登录
const handleLogout = async () => {
  try {
    const res = await userStore.userLogout()
    ElMessage.success(res)
    $router.replace({ path: '/login', query: { redirect: $route.path } })
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 下拉菜单选择项点击
const handleCommand = (selectedItem: string) => {
  if (selectedItem === 'logout') {
    handleLogout()
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .action-btn {
    margin: 0;
    margin-right: 10px;
  }

  .avatar-content {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 10px;
  }
}

.switch-theme-form {
  width: 100%;

  :deep(.el-form-item) {
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .el-form-item__content {
      justify-content: flex-end;
    }
  }
}
</style>
