<template>
  <div class="tourist-content">
    <div class="tourist-top">
      <div class="tourist-title-content">
        <div class="tourist-title">实时游客统计</div>
        <div class="tourist-title-icon"></div>
      </div>
      <div class="statistics-count-content">
        <div class="statistics-count-label">可预约总量</div>
        <div class="statistics-count-num">999999</div>
        <div class="statistics-count-label">人</div>
      </div>
    </div>
    <div class="tourist-center">
      <div class="person-num-count" v-for="(word, i) in personCount" :key="i">{{ word }}</div>
    </div>
    <div class="tourist-bottom">
      <div class="chart-content">
        <WaterPoloChart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WaterPoloChart from '../WaterPoloChart/index.vue'

// 人数
const personCount = ref('216908人')
</script>

<style lang="scss" scoped>
.tourist-content {
  width: 100%;
  height: 100%;
  background-image: url('../../images/dataScreen-main-lt.png');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  .tourist-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .tourist-title-content {
      .tourist-title {
        font-size: 20px;
        color: #fff;
        line-height: 20px;
        margin-bottom: 15px;
      }

      .tourist-title-icon {
        width: 68px;
        height: 7px;
        background-image: url('../../images/dataScreen-title.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
      }

    }

    .statistics-count-content {
      width: max-content;
      align-self: flex-end;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 40px;
      margin-right: 5px;

      .statistics-count-label,
      .statistics-count-num {
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        line-height: 20px;
        margin-right: 5px;
      }

      .statistics-count-num {
        color: orange;
      }
    }
  }

  .tourist-center {
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 20px;

    .person-num-count {
      flex: 1;
      height: 66px;
      background-image: url('../../images/total.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      font-size: 24px;
      color: #fff;
      line-height: 66px;
      text-align: center;
      margin-right: 2px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .tourist-bottom {
    width: 100%;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    box-sizing: border-box;

    .chart-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>