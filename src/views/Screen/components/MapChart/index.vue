<template>
  <div class="map-chart-content" ref="mapChart">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//引入中国地图的JSON数据
import chinaJSON from './china.json'

// 注册中国地图
echarts.registerMap('china', chinaJSON as any)

const mapChart = ref()

// 初始化图表
const initChart = () => {
  const mychat = echarts.init(mapChart.value)
  mychat.setOption({
    geo: {
      map: 'china',
      roam: true, // 缩放和平移
      // 地图位置设置
      left: 50,
      right: 50,
      top: 100,
      bottom: -100,
      zoom: 1.2,
      // 地图文字设置
      label: {
        show: true,
        position: 'inside', // ['50%', '50%']
        color: '#ffffff',
        fontSize: 14,
      },
      // 每个多边形的样式设置
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#25437E', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#11144E', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.8,
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: '#1595E9',
        },
        label: {
          color: '#ffffff',
          fontSize: 32,
        },
      },
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    // 系列
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: '#29fcff',
              width: 2,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: '#FA842F',
              width: 2,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [87.617733, 43.792818], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: '#FA842F',
              width: 2,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [91.132212, 29.660361], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: '#29fcff',
              width: 2,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow', //  动效图形，支持网图、svg
          color: '#ffffff',
          symbolSize: 8,
        },
      },
    ],
  })
}

onMounted(() => {
  initChart()
})
</script>

<style lang="scss" scoped>
.map-chart-content {
  width: 100%;
  height: 100%;
}
</style>