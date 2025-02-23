<template>
  <div class="rank-chart-content" ref="rankChart">

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const rankChart = ref()

// 初始化图表
const initChart = () => {
  const mychat = echarts.init(rankChart.value)
  mychat.setOption({
    // 标题
    title: {
      text: '景区排行',
      // 文字位置
      left: '42%',
      // 文字样式
      textStyle: {
        color: '#ffffff',
        fontSize: 16
      },
      // 子标题
      subtext: '各大景区排行',
      subtextStyle: {
        color: '#ffffff',
        fontSize: 14
      }
    },
    // 坐标轴
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {},
    // 系列
    series: [
      {
        type: 'bar',
        barwitdh: 20, // 柱体宽度
        data: [10, 20, 30, 40, 50, 60, 70],
        // 文本标签
        label: {
          show: true,
          position: 'insideTop', // 文字位置
          color: '#ffffff', // 文字颜色
        },
        // 是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'skyblue' // 0% 处的颜色
            }, {
              offset: 1, color: 'grey' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        },
        itemStyle: {
          // 柱体弧度
          // borderRadius: [10, 10, 0, 0],
          // 柱体颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#00010A' // 0% 处的颜色
            }, {
              offset: 1, color: '#000EF3' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true, // 平滑曲线
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: '#ffffff',
      borderWidth: 2,
      textStyle: {
        color: '#ffffff'
      }
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
.rank-chart-content {
  width: 100%;
  height: 100%;
}
</style>