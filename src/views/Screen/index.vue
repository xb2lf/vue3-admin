<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 16:03:39
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 06:42:00
 * @Description:
-->
<template>
  <div class="screen-container">
    <!-- 数据大屏内容展示区域 -->
    <div class="screen-content" ref="screenRef">
      <!-- 数据大屏顶部 -->
      <div class="screen-top-content">
        <Header />
      </div>
      <div class="screen-bottom-content">
        <!-- 左侧部分 -->
        <div class="screen-bottom-left-content">
          <!-- 游客实时统计 -->
          <div class="tourist-container">
            <TouristStatistics />
          </div>
          <!-- 男女比例 -->
          <div class="sex-container">
            <SexRatio />
          </div>
          <!-- 年龄比例 -->
          <div class="age-container">
            <AgeRatio />
          </div>
        </div>
        <!-- 中间部分 -->
        <div class="screen-bottom-center-content">
          <div class="map-chart-container">
            <Map />
          </div>
          <div class="line-chart-container">
            <CenterBottom />
          </div>
        </div>
        <!-- 右侧部分 -->
        <div class="screen-bottom-right-content">
          <div class="ranking-container">
            <RankingScenic />
          </div>
          <div class="year-tourist-container">
            <AnnualVisitor />
          </div>
          <div class="appointment-channel-container">
            <AppointmentChannel />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/Header/index.vue'
import TouristStatistics from './components/TouristStatistics/index.vue'
import SexRatio from './components/SexRatio/index.vue'
import AgeRatio from './components/AgeRatio/index.vue'
import Map from './components/Map/index.vue'
import CenterBottom from './components/CenterBottom/index.vue'
import RankingScenic from './components/RankingScenic/index.vue'
import AnnualVisitor from './components/AnnualVisitor/index.vue'
import AppointmentChannel from './components/AppointmentChannel/index.vue'

// 获取数据大屏展示呢绒盒子的DOM元素
const screenRef = ref()

// 定义大屏缩放比例
const getScaleRatio = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  // ww小于wh的情况：视口宽度比原先小或者视口高度比原先大
  // ww大于wh的情况：视口宽度比原先大或者视口高度比原先小
  return ww < wh ? ww : wh
}

// 页面加载后先进行缩放一次
onMounted(() => {
  screenRef.value.style.transform = `scale(${getScaleRatio()}) translate(-50%,-50%)`
})

// 监听视口变化
window.onresize = () => {
  screenRef.value.style.transform = `scale(${getScaleRatio()}) translate(-50%,-50%)`
}
</script>

<style lang="scss" scoped>
.screen-container {
  width: 100vw;
  height: 100vh;
  background-image: url('./images/bg.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .screen-content {
    width: 1920px;
    height: 1080px;
    position: fixed;
    transform-origin: left top;
    left: 50%;
    top: 50%;

    .screen-top-content {
      width: 100%;
      height: 40px;
    }

    .screen-bottom-content {
      display: flex;

      .screen-bottom-left-content {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;

        .tourist-container {
          flex: 1.2;
          margin-top: 10px;
          margin-left: 20px;
        }

        .sex-container {
          flex: 1;
          margin-top: 20px;
          margin-left: 20px;
        }

        .age-container {
          flex: 1;
          margin-top: 20px;
          margin-left: 20px;
        }
      }

      .screen-bottom-center-content {
        flex: 2;
        height: 1040px;
        padding: 0 30px;
        box-sizing: border-box;

        .map-chart-container {
          width: 100%;
          height: calc(100% - 280px);
          padding-top: 34px;
          box-sizing: border-box;
        }

        .line-chart-container {
          width: 100%;
          height: 280px;
        }
      }

      .screen-bottom-right-content {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;

        .ranking-container {
          flex: 1.2;
          margin-top: 10px;
          margin-right: 20px;
        }

        .year-tourist-container {
          flex: 1;
          margin-top: 20px;
          margin-right: 20px;
        }

        .appointment-channel-container {
          flex: 1;
          margin-top: 20px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
