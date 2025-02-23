<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-23 03:31:31
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 03:52:27
 * @Description: 
-->
<template>
  <div class="ratio-chart-content" ref="ratioChart">

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const ratioChart = ref()

// 初始化图表
const initChart = () => {
  const mychat = echarts.init(ratioChart.value)
  mychat.setOption({
    /* // 标题
    title: {
      text: '男女比例',
      textStyle: {
        color: '#ffffff',
      },
      left: '40%'
    }, */
    // 坐标轴
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    // 系列
    series: [
      {
        type: 'bar',
        data: [60],
        barWidth: 20,
        itemStyle: {
          color: '#0076FF',
          borderRadius: 20
        },
        z: 100
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        // 调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: '#FF5F7C',
          borderRadius: 20
        },
        z: 2
      }
    ],
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
.ratio-chart-content {
  width: 100%;
  height: 100%;
}
</style>