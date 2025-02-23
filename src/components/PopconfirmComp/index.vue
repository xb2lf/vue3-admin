<template>
  <el-popconfirm :width="width" icon="DeleteFilled" icon-color="#f56c6c" :title="title"
    @confirm="$emit('handleConfirm')" @cancel="$emit('handleCancel')">
    <template #reference>
      <slot></slot>
    </template>
    <template #actions="{ confirm, cancel }">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="confirm">
        确定
      </el-button>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width: number
    title: string,
  }>(),
  {
    width: 150,
    title: '您确定要删除此项吗',
  });
const $emit = defineEmits(['handleConfirm', 'handleCancel']);
</script>

<style scoped></style>