<template>
  <div class="tabbar-container">
    <div class="tabbar-left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index.vue'
import Setting from './Setting/index.vue'
</script>

<style lang="scss" scoped>
.tabbar-container {
  width: 100%;
  height: 100%;
  // background-image: linear-gradient(to right,rgba(232, 223, 223, 1),rgba(201, 178, 178, 1),#f3efef);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;

  .tabbar-left {
    display: flex;
    align-items: center;
  }

  .tabbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
