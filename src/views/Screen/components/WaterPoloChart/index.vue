<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-23 02:02:20
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 08:17:27
 * @Description: 
-->
<template>
  <div class="water-polo-chart-content" ref="waterChart">

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// echarts水球图拓展插件
import 'echarts-liquidfill'

const waterChart = ref()

// 初始化图表
const initChart = () => {
  const mychat = echarts.init(waterChart.value)
  mychat.setOption({
    /* // 标题
    title: {
      text: '水球图'
    },
    // 坐标轴
    xAxis: {},
    yAxis: {}, */
    // 系列
    series: {
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      waveAnimation: true,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
      animationDuration: 2000,
      animationDurationUpdate: 1000,
      radius: '100%', // 半径
      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: '#73C0E6',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)'
        }
      },
    },
    // 布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  })
}

onMounted(() => {
  initChart()
})
</script>

<style lang="scss" scoped>
.water-polo-chart-content {
  width: 100%;
  height: 100%;
}
</style>