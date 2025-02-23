<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-23 00:51:09
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 06:39:23
 * @Description: 
-->
<template>
  <div class="age-content">
    <div class="age-top-content">
      <div class="age-title-content">年龄比例</div>
      <div class="age-title-icon"></div>
    </div>
    <div class="age-bottom-content">
      <PieChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import PieChart from '../PieChart/index.vue'
</script>

<style lang="scss" scoped>
.age-content {
  width: 100%;
  height: 100%;
  background-image: url('../../images/dataScreen-main-lb.png');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  .age-top-content {
    margin-bottom: 20px;

    .age-title-content {
      font-size: 20px;
      color: #fff;
      line-height: 20px;
      margin-bottom: 15px;
    }

    .age-title-icon {
      width: 68px;
      height: 7px;
      background-image: url('../../images/dataScreen-title.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }

  }

  .age-bottom-content {
    width: 100%;
    height: 240px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
}
</style>