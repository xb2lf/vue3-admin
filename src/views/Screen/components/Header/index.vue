<template>
  <div class="header-container">
    <div class="header-left">
      <div class="left-btn" @click="handleGoHome">首页</div>
    </div>
    <div class="header-center">
      <div class="header-center-title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="header-right">
      <div class="right-report-content">统计报告</div>
      <div class="current-time-content">当前时间：{{ currTIme }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment'

const $router = useRouter();

// 当前时间
const currTIme = ref(moment().format('YYYY年MM月DD日 HH:mm:ss'))

// 存储定时器
const timer = ref()

const handleGoHome = () => {
  $router.push('/home')
}
onMounted(() => {
  timer.value = setInterval(() => {
    currTIme.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 40px;
  display: flex;

  .header-left {
    flex: 1;
    background-image: url('../../images/dataScreen-header-left-bg.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: flex-end;

    .left-btn {
      width: 150px;
      height: 40px;
      background-image: url('../../images/dataScreen-header-btn-bg-l.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      font-size: 20px;
      color: #29fcff;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
  }

  .header-center {
    flex: 2;

    .header-center-title {
      width: 100%;
      height: 74px;
      background-image: url('../../images/dataScreen-header-center-bg.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      font-size: 36px;
      color: #29fcff;
      text-align: center;
      line-height: 74px;
    }
  }

  .header-right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url('../../images/dataScreen-header-right-bg.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    padding-right: 40px;
    box-sizing: border-box;

    .right-report-content {
      width: 150px;
      height: 40px;
      background-image: url('../../images/dataScreen-header-btn-bg-r.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      font-size: 20px;
      color: #29fcff;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }

    .current-time-content {
      font-size: 16px;
      color: #29fcff;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>