<template>
  <el-upload class="avatar-uploader" :action="setting.uploadUrl" :show-file-list="false" drag
    :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
    <img v-if="localUrl" :src="localUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <!-- <upload-filled /> -->
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { UploadProps } from "element-plus";
import setting from "@/setting";

withDefaults(
  defineProps<{
    modelValue: string,
    localUrl: string,
  }>(),
  {
    modelValue: '',
    localUrl: '',
  });
const $emit = defineEmits(['update:modelValue', 'update:localUrl', 'successCallback']);

// 图片上传前校验
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (!["image/jpeg", "image/png", "image/jpg", "image/webp", 'image/gif'].includes(rawFile.type)) {
    ElMessage.error("上传图片格式不正确");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("图片大小最多不能超过4MB");
    return false;
  }
  return true;
};

// 图片上传成功回调函数
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  const url = URL.createObjectURL(uploadFile.raw!);
  $emit('update:localUrl', url)
  $emit('update:modelValue', response.data)
  $emit('successCallback')
};

</script>

<style lang="scss" scoped>
.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    &:hover {
      border-color: var(--el-color-primary);
    }

    .el-upload-dragger {
      padding: 0;
    }
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>