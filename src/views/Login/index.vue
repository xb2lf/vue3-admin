<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-17 20:32:50
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-19 00:30:17
 * @Description: 
-->
<template>
  <div class="login-container">
    <el-row :gutter="0">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rule="loginRules" label-width="80px"
          show-message inline-message scroll-to-error>
          <h1>Hello</h1>
          <h2>欢迎来到小白甄选</h2>
          <el-form-item label="用户名" prop="username">
            <el-input type="text" :prefix-icon="User" v-model="loginForm.username" placeholder="请输入用户名"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" placeholder="请输入密码" clearable
              show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="isLoading" class="login-btn" @click="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'

// 获取用户仓库
const userStore = useUserStore()

// 获取路由实例
const $router = useRouter()
const $route = useRoute()

// 登录表单
const loginFormRef = ref()

// 登录表单项
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})

// 是否Loading
const isLoading = ref(false)

// 用户名校验
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length === 0) {
    callback(new Error('请输入用户名'))
  } else if (value.trim().length < 6 || value.trim().length > 10) {
    callback(new Error('用户名应为6~10位的任意组合'))
  } else {
    callback()
  }
}

// 密码校验
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length === 0) {
    callback(new Error('请输入密码'))
  } else if (value.trim().length < 6 || value.trim().length > 16) {
    callback(new Error('密码应为6~16位的任意组合'))
  } else {
    callback()
  }
}

// 验证规则
const loginRules = {
  username: [
    /* {
      required: true,
      min: 6,
      max: 10,
      message: '账号长度至少六位',
      trigger: 'change',
    }, */
    { trigger: 'change', validator: validatorUsername },
  ],
  password: [
    /* {
      required: true,
      min: 6,
      max: 16,
      message: '密码的长度至少六位',
      trigger: 'change',
    }, */
    { trigger: 'change', validator: validatorPassword },
  ],
}

// 登录
const handleLogin = async () => {
  await loginFormRef.value.validate()
  isLoading.value = true
  try {
    await userStore.userLogin(loginForm)
    const redirect = $route.query.redirect as string
    $router.replace({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: redirect ? '欢迎回来' : '登录成功',
      title: `Hi, ${getTime()}好`,
    })
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/background.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  .login-form {
    width: 80%;
    position: relative;
    top: 25vh;
    left: 5vw;
    background-image: url('@/assets/images/login_form.png');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 40px;

    h1 {
      font-size: 40px;
      color: #fff;
    }

    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0;
    }

    :deep(.el-form-item__label) {
      color: #fff;
    }

    .login-btn {
      width: 100%;
    }
  }
}

@media screen and (max-width: 768px) {
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;

    .login-form {
      width: 100%;
      min-width: 400px;
      background-image: url('@/assets/images/login_form.png');
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      padding: 40px;
      position: static;
      top: auto;
      left: auto;
    }
  }
}
</style>
