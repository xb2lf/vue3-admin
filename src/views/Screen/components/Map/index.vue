<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-23 04:51:33
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 07:40:50
 * @Description: 
-->
<template>
  <div class="map-main-content">
    <div class="map-header-content">平台高峰预警信息（2条）</div>
    <div class="map-title-content">
      <span class="map-title-label" v-for="(word, i) in mapTitle" :key="i">{{ word }}</span>
    </div>
    <div class="map-body-content">
      <MapChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MapChart from '../MapChart/index.vue'

// 地图标题
const mapTitle = ref('景区实时客流量')
</script>

<style lang="scss" scoped>
.map-main-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .map-header-content {
    width: 622px;
    height: 45px;
    background-image: url('../../images/dataScreen-header-warn-bg.png');
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    font-size: 16px;
    line-height: 44px;
    color: #ffffff;
    text-align: center;
  }

  .map-title-content {
    width: 270px;
    height: 25px;
    align-self: flex-start;
    background-image: url('../../images/map-title-bg.png');
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    padding-left: 30px;
    box-sizing: border-box;

    .map-title-label {
      font-size: 16px;
      line-height: 25px;
      color: #ffffff;
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .map-body-content {
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>