<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-23 06:37:57
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 17:45:17
 * @Description: 
-->
<template>
  <div class="channel-content">
    <div class="channel-top-content">
      <div class="channel-title-content">预约渠道数据统计</div>
      <div class="channel-title-icon"></div>
    </div>
    <div class="channel-bottom-content">
      <RadarChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import RadarChart from '../RadarChart/index.vue'
</script>

<style lang="scss" scoped>
.channel-content {
  width: 100%;
  height: 100%;
  background-image: url('../../images/dataScreen-main-rb.png');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  .channel-top-content {
    margin-bottom: 20px;

    .channel-title-content {
      font-size: 20px;
      color: #fff;
      line-height: 20px;
      margin-bottom: 15px;
    }

    .channel-title-icon {
      width: 68px;
      height: 7px;
      background-image: url('../../images/dataScreen-title.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }

  }

  .channel-bottom-content {
    width: 100%;
    height: 240px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
}
</style>