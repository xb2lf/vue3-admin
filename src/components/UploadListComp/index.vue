<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-20 10:52:17
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-20 17:51:06
 * @Description: 
-->
<template>
  <el-upload :file-list="fileList" :action="setting.uploadUrl" list-type="picture-card"
    :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
    :on-success="handleSuccess">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog class="preview-iamge-dialog" v-model="dialogVisible">
    <img class="preview-image" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadFiles } from 'element-plus'
import setting from "@/setting";

defineProps(['fileList'])

const $emit = defineEmits(['update:fileList'])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

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

// 更新上传列表
const updateFileList = (uploadFiles: UploadFiles) => {
  const newList = uploadFiles.filter((item) => item.status === 'success').map((item) => item.response ? ({
    name: item.name,
    url: (item.response as { data: string }).data
  }) : ({ name: item.name, url: item.url }))
  return newList
}

// 文件列表移除时
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  const currFileList = updateFileList(uploadFiles)
  $emit('update:fileList', currFileList)
}
// 文件上传成功时
const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile, uploadFiles) => {
  console.log(response, uploadFile, uploadFiles)
  const currFileList = updateFileList(uploadFiles)
  $emit('update:fileList', currFileList)
}
// 点击文件列表中已上传的文件预览
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.preview-image {
  width: 100%;
  max-width: 100%;
}
</style>