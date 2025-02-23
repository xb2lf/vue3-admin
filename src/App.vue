<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-14 09:44:39
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-17 20:53:23
 * @Description: 
-->
<template>
  <div>
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElConfigProvider } from 'element-plus'
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = ref(zhCn)
</script>
