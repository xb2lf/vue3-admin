<template>
  <div class="visitor-content">
    <div class="visitor-top-content">
      <div class="visitor-title-content">年度游客量对比</div>
      <div class="visitor-title-icon"></div>
    </div>
    <div class="visitor-bottom-content">
      <VisitorChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import VisitorChart from '../VisitorChart/index.vue'
</script>

<style lang="scss" scoped>
.visitor-content {
  width: 100%;
  height: 100%;
  background-image: url('../../images/dataScreen-main-rc.png');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  .visitor-top-content {
    margin-bottom: 20px;

    .visitor-title-content {
      font-size: 20px;
      color: #fff;
      line-height: 20px;
      margin-bottom: 15px;
    }

    .visitor-title-icon {
      width: 68px;
      height: 7px;
      background-image: url('../../images/dataScreen-title.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }

  .visitor-bottom-content {
    width: 100%;
    height: 250px;
    padding-bottom: 20px;
    box-sizing: border-box;
  }
}
</style>