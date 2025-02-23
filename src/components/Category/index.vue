<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-19 17:34:38
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-19 22:27:10
 * @Description: 
-->
<template>
  <el-card class="category-container">
    <el-form inline>
      <el-form-item label="一级分类">
        <SelectComp v-model="categoryStore.firstCategoryId" :optionList="categoryStore.firstCategoryList"
          placeholder="请选择一级分类" :scene="scene" @handleChange="handleFirstSelectChange" />
      </el-form-item>
      <el-form-item label="二级分类">
        <SelectComp v-model="categoryStore.secondCategoryId" :optionList="categoryStore.secondCategoryList"
          :disabled="!categoryStore.firstCategoryId" placeholder="请选择二级分类" :scene="scene"
          @handleChange="handleSecondSelectChange" />
      </el-form-item>
      <el-form-item label="三级分类">
        <SelectComp v-model="categoryStore.thirdCategoryId" :optionList="categoryStore.thirdCategoryList"
          :disabled="!categoryStore.secondCategoryId" placeholder="请选择三级分类" :scene="scene"
          @handleChange="handleThirdSelectChange" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/product/category'

withDefaults(defineProps<{
  scene: 0 | 1
}>(), {
  scene: 0
})

// 获取分类仓库实例
const categoryStore = useCategoryStore()

// 一级分类选择器change事件
const handleFirstSelectChange = (value: number) => {
  categoryStore.updateFirstCategoryId(value)
  categoryStore.updateSecondCategoryId()
  categoryStore.updateThirdCategoryId()
  categoryStore.updateSecondCategoryList([])
  categoryStore.updateThirdCategoryList([])
  !!value && categoryStore.getSecondCategory(value)
}

// 二级分类选择器change事件
const handleSecondSelectChange = (value: number) => {
  categoryStore.updateSecondCategoryId(value)
  categoryStore.updateThirdCategoryId()
  categoryStore.updateThirdCategoryList([])
  !!value && categoryStore.getThirdCategory(value)
}

// 三级分类选择器change事件
const handleThirdSelectChange = (value: number) => {
  categoryStore.updateThirdCategoryId(value)
}

onMounted(() => {
  categoryStore.getFirstCategory()
})
</script>

<style lang="scss" scoped>
.category-container {
  width: 100%;
  height: 90px;

  :deep(.el-form-item) {
    align-items: center;
  }
}
</style>