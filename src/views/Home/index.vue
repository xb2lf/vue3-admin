<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-17 20:32:17
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-18 23:11:21
 * @Description: 
-->
<template>
  <div class="home-container">
    <el-card class="home-header-content">
      <img :src="userStore.avatar" alt="用户头像" class="user-avatar">
      <div class="other-info-content">
        <div class="greetings-content">{{`${getTime()}好${userStore.username}`}}</div>
        <div class="platform-title-content">{{setting.title}}</div>
      </div>
    </el-card>
    <div class="home-body-content">
      <DefSvgIcon name="welcome" width="500px" height="500px"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'
import setting from '@/setting'

// 获取用户仓库
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.home-container {
  width:100%;
  height:100%;
  .home-header-content {
    width:100%;
    height:142px;
    margin-bottom:10px;
    :deep(.el-card__body) {
      display:flex;
      align-items:center;
      .user-avatar {
        width:100px;
        height:100px;
        border-radius: 50%;
        margin-right:20px;
      }
      .other-info-content {
        .greetings-content {
          font-size:28px;
          font-weight:600;
          color:#000;
          line-height:28px;
          margin-bottom:30px;
        }
        .platform-title-content {
          font-size:20px;
          font-weight:400;
          line-height:16px;
          color: #999;
        }
      }
    }
  }
  .home-body-content {
    width:100%;
    height:calc(100% - 152px);
    display:flex;
    justify-content:center;
    align-items:center;
  }
}
</style>
