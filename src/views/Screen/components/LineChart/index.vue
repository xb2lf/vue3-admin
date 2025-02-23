<template>
  <div class="line-chart-content" ref="lineChart">

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const lineChart = ref()

// 初始化图表
const initChart = () => {
  const mychat = echarts.init(lineChart.value)
  mychat.setOption({
    // 标题
    title: {
      text: '访问量趋势图',
      textStyle: {
        color: '#ffffff',
      },
    },
    // 坐标轴
    xAxis: {
      type: 'category',
      // X轴两侧不留白
      boundaryGap: false,
      // 分割线
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // 轴线
      axisLine: {
        show: true
      },
      // 刻度
      axisTick: {
        show: true
      }
    },
    yAxis: {
      // 分割线
      splitLine: {
        show: false,
      },
      // 轴线
      axisLine: {
        show: true
      },
      // 刻度
      axisTick: {
        show: true
      }
    },
    // 系列
    series: {
      type: 'line',
      data: [120, 78, 235, 114, 95, 123, 354],
      // 平滑曲线的设置
      smooth: true,
      // 区域填充样式
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#6E5D43', // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#232855', // 0% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      // 文本标签
      label: {
        show: true,
      },
    },
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

<style lang="scss" scoped>
.line-chart-content {
  width: 100%;
  height: 100%;
}
</style>