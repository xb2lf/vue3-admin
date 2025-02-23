<template>
  <div class="center-bottom-container">
    <div class="line-top-content">
      <div class="line-title-content">未来7天游客量趋势</div>
      <div class="line-title-icon"></div>
    </div>
    <div class="line-bottom-content">
      <LineChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from '../LineChart/index.vue'
</script>

<style lang="scss" scoped>
.center-bottom-container {
  width: 100%;
  height: 100%;
  background-image: url('../../images/dataScreen-main-cb.png');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  .line-top-content {
    width: 100%;

    .line-title-content {
      font-size: 20px;
      color: #fff;
      line-height: 20px;
      margin-bottom: 15px;
    }

    .line-title-icon {
      width: 68px;
      height: 7px;
      background-image: url('../../images/dataScreen-title.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }

  }

  .line-bottom-content {
    width: 100%;
    height: 240px;
    padding-bottom: 5px;
    box-sizing: border-box;
  }
}
</style>