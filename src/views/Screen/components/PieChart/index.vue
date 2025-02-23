<template>
  <div class="pie-chart-content" ref="pieChart">

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const pieChart = ref()

// 初始化图表
const initChart = () => {
  const mychat = echarts.init(pieChart.value)
  mychat.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical', //  horizontal 图例方向
      right: '15%',
      top: 'center',
      textStyle: {
        color: '#ffffff',
        fontSize: 20
      }
    },
    color: ['#FBC857', '#FA842F', '#148794', '#347DBE', '#0D4696', '#7AC2F2', '#9579CB'],
    series: [
      {
        name: '年龄比例',
        type: 'pie',
        center: ['35%', '50%'],
        radius: ['45%', '90%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '14-18' },
          { value: 735, name: '19-24' },
          { value: 580, name: '25-36' },
          { value: 484, name: '37-48' },
          { value: 300, name: '48-70' }
        ]
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
.pie-chart-content {
  width: 100%;
  height: 100%;
}
</style>