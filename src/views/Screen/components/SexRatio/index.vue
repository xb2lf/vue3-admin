<template>
  <div class="sex-content">
    <div class="sex-top-content">
      <div class="sex-title-content">男女比例</div>
      <div class="sex-title-icon"></div>
    </div>
    <div class="sex-bottom-content">
      <div class="sex-show-content">
        <div class="man-content">
          <div class="man-content-label">男士</div>
          <img class="man-avatar-content" src="../../images/man.png" alt="男士">
        </div>
        <div class="woman-content">
          <div class="woman-content-label">女士</div>
          <img class="woman-avatar-content" src="../../images/woman.png" alt="女士">
        </div>
      </div>
      <div class="sex-chart-content">
        <div class="chart-tip-content">
          <div class="tip-left-content">
            <div class="tip-label-content">男士</div>
            <div class="tip-ratio-content">60%</div>
          </div>
          <div class="tip-right-content">
            <div class="tip-label-content">女士</div>
            <div class="tip-ratio-content">40%</div>
          </div>
        </div>
        <!-- <div class="ratio-chart-container">
          <div class="man-ratio-content"></div>
        </div> -->
        <div class="ratio-chart-container">
          <RatioChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RatioChart from '../RatioChart/index.vue'
</script>

<style lang="scss" scoped>
.sex-content {
  width: 100%;
  height: 100%;
  background-image: url('../../images/dataScreen-main-lc.png');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;

  .sex-top-content {
    margin-bottom: 60px;

    .sex-title-content {
      font-size: 20px;
      color: #fff;
      line-height: 20px;
      margin-bottom: 15px;
    }

    .sex-title-icon {
      width: 68px;
      height: 7px;
      background-image: url('../../images/dataScreen-title.png');
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }

  .sex-bottom-content {
    width: 100%;
    height: 200px;
    padding-bottom: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    .sex-show-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .man-content,
      .woman-content {
        width: 111px;
        height: 116px;
        background-image: url('../../images/man-bg.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        margin-right: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .woman-content {
        background-image: url('../../images/woman-bg.png');
        margin-right: 0;
      }

      .man-content-label,
      .woman-content-label {
        font-size: 16px;
        line-height: 16px;
        color: #fff;
        margin-bottom: 20px;
      }

      .man-avatar-content,
      .woman-avatar-content {
        width: 60px;
        height: 64px;
      }
    }

    .sex-chart-content {
      width: 282px;

      .chart-tip-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;

        .tip-left-content,
        .tip-right-content {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .tip-right-content {
          justify-content: flex-end;
        }

        .tip-label-content,
        .tip-ratio-content {
          font-size: 14px;
          font-weight: 400;
          line-height: 14px;
          color: #fff;
        }

        .tip-label-content {
          margin-right: 3px;
        }
      }

      .ratio-chart-container {
        width: 100%;
        height: 20px;
      }

      // .ratio-chart-container {
      //  width: 100%;
      // height: 20px;
      //  border-radius: 10px;
      //  background-color: #FF5F7C;

      // .man-ratio-content {
      //  width: 60%;
      // height: 100%;
      // border-radius: 10px;
      // background-color: #0076FF;
      // }
      // }
    }
  }
}
</style>