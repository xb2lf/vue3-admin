<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-23 06:23:52
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 15:44:51
 * @Description: 
-->
<template>
  <div class="scenic-content">
    <div class="scenic-top">
      <div class="scenic-title-content">
        <div class="scenic-title">热门景区排行</div>
        <div class="scenic-title-icon"></div>
      </div>
    </div>
    <div class="scenic-bottom">
      <RankChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import RankChart from '../RankChart/index.vue'
</script>

<style lang="scss" scoped>
.scenic-content {
  width: 100%;
  height: 100%;
  background-image: url('../../images/dataScreen-main-rt.png');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  .scenic-top {
    margin-bottom: 20px;

    .scenic-title-content {
      .scenic-title {
        font-size: 20px;
        color: #fff;
        line-height: 20px;
        margin-bottom: 15px;
      }

      .scenic-title-icon {
        width: 68px;
        height: 7px;
        background-image: url('../../images/dataScreen-title.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
      }

    }
  }

  .scenic-bottom {
    width: 100%;
    height: 310px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
}
</style>