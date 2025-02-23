<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-23 16:30:43
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 17:44:15
 * @Description: 
-->
<template>
  <div class="visitor-chart-content" ref="visitorChart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const visitorChart = ref()

// 初始化图表
const initChart = () => {
  const mychat = echarts.init(visitorChart.value)
  mychat.setOption({
    // 标题
    title: {
      text: '散点图',
      // 文字样式
      textStyle: {
        color: '#ffffff',
        fontSize: 16
      },
    },
    // 坐标轴
    xAxis: {
      type: 'category',
      show: true,
      data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2022', '2023', '2024', '2025'],
    },
    yAxis: {
      show: false,
    },
    // 系列
    series: [
      {
        type: 'scatter',
        data: [33, 88, 9, 788, 234, 1213, 3412, 2634, 88, 33, 21, 4533, 3332,],
        // 标记图形设置
        smybol: 'circle',
        symbolSize: 15,
        // 图文标签
        label: {
          show: true,
          position: 'top',
          color: 'rgba(255,255,255,0.8)'
        },
        itemStyle: {
          color: '#29fcff'
        },
      },
    ],
    // 布局组件
    grid: {
      left: 40,
      right: 20,
      top: 0,
      bottom: 20
    }
  })
}

onMounted(() => {
  initChart()
})
</script>

<style scoped>
.visitor-chart-content {
  width: 100%;
  height: 100%;
}
</style>