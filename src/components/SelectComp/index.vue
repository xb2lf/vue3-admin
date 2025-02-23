<template>
  <el-select size="large" :modelValue="modelValue" :placeholder="placeholder" :disabled="disabled || scene !== 0"
    class="category-select" @change="handleSelectChange">
    <el-option v-for="(el, i) in optionList" :label="el.name" :value="el.id" :key="el.id || i"></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { CategoryDataType } from '@/api/product/attr/type'
withDefaults(
  defineProps<{
    modelValue?: number | undefined
    optionList: CategoryDataType
    placeholder: string
    disabled?: boolean | undefined
    scene: 0 | 1 | 2
  }>(),
  {
    placeholder: '请选择',
    disabled: false,
    scene: 0
  },
)
const $emit = defineEmits(['update:modelValue', 'handleChange'])

// 选择器change事件
const handleSelectChange = (value: number) => {
  $emit('update:modelValue', value)
  $emit('handleChange', value)
}
</script>

<style lang="scss" scoped>
.category-select {
  width: 240px;
}
</style>
