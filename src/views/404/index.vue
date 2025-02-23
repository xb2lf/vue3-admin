<template>
  <div class="not-found-container">
    <img class="not-found-img" src="../../assets/images/error_images/404.png" alt="NOT-FOUND">
    <el-button class="back-home-btn" type="primary" @click="handleBackHome">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const $router = useRouter()

const handleBackHome = () => [
  $router.push('/home')
]
</script>

<style lang="scss" scoped>
.not-found-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .not-found-img {
    width: 800px;
    height: 400px;
    margin-bottom: 10px;
  }

  .back-home-btn {
    margin-right: 356px;
  }
}
</style>
