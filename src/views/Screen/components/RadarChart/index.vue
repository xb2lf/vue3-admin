<template>
  <div class="circular-chart-content" ref="circularChart">

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const circularChart = ref()

// 初始化图表
const initChart = () => {
  const mychat = echarts.init(circularChart.value)
  mychat.setOption({
    title: {
      text: '渠道雷达图',
      textStyle: {
        color: '#ffffff',
        fontSize: 14
      },
    },
    name: {
      textStyle: {
        color: 'red'
      }
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500, color: '#ffffff' },
        { name: '好感', max: 16000, color: '#ffffff' },
        { name: '美食', max: 30000, color: '#ffffff' },
        { name: '爱好', max: 38000, color: '#ffffff' },
        { name: '出行', max: 52000, color: '#ffffff' },
        { name: '景点', max: 25000, color: '#ffffff' }
      ]
    },
    series: [
      {
        name: '购物PK美食',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '购物'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '美食'
          }
        ],
        /* label: {
          show: true,
          color: '#ffffff'
        } */
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
.circular-chart-content {
  width: 100%;
  height: 100%;
}
</style>