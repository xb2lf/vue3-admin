<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 16:11:00
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-22 18:58:13
 * @Description: 
-->
<template>
  <div class="permission-manage-container">
    <el-table :data="menuList" border row-key="id">
      <el-table-column header-align="center" align="center" prop="name" label="名称"></el-table-column>
      <el-table-column header-align="center" align="center" prop="code" label="权限值"></el-table-column>
      <el-table-column header-align="center" align="center" prop="updateTime" label="修改时间"
        show-overflow-tooltip></el-table-column>
      <el-table-column header-align="center" align="center" label="操作" min-width="270px" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" :disabled="row.level === 4" @click="handleAddMenu(row)">{{ row.level
            === 3 ? '添加功能' : '添加菜单'
          }}</el-button>
          <el-button type="success" size="small" :disabled="row.level === 1" @click="handleEditMenu(row)">编辑</el-button>
          <PopconfirmComp :width="220" :title="`您确定要删除${row.name}吗？`" @handleConfirm="handleConfirmDeleteMenu(row.id)">
            <el-button type="danger" size="small" :disabled="row.level === 1">删除</el-button>
          </PopconfirmComp>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加菜单/编辑菜单 -->
    <el-dialog v-model="menuDialogVisible" width="400" :title="addOrEditMenuTitle" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :model="addOrEditMenuForm" :rules="addOrEditMenuRules" ref="addOrEditMenuFormRef" label-width="80px">
        <el-form-item prop="name" label="菜单名称">
          <el-input v-model="addOrEditMenuForm.name" laceholder="请填写菜单名称"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="权限值">
          <el-input v-model="addOrEditMenuForm.code" laceholder="请填写权限值"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleCancelAddOrEditMenu">取消</el-button>
        <el-button type="primary" @click="handleConfirmAddOrEditMenu">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqAllPermissionList, reqAddOrUpdatePermission, reqRemovePermission } from '@/api/acl/permission'
import type {
  PermissionListResponseData,
  PermissionListType,
  PermissionItem,
  addOrEditMenuFormType
} from '@/api/acl/permission/type'

// 菜单列表
const menuList = ref<PermissionListType>([])

// 初始化默认的添加/编辑菜单Form表单项
const initalMenuFormItems: addOrEditMenuFormType = {
  id: undefined,
  pid: undefined,
  level: undefined,
  name: '',
  code: '',
  children: [],
  select: false,
  status: 0,
  toCode: '',
  type: 0,
  createTime: '',
  updateTime: ''
}

// 控制添加/编辑菜单弹窗显示隐藏
const menuDialogVisible = ref<boolean>(false)

// 添加/编辑菜单弹窗标题
const addOrEditMenuTitle = ref<string>('添加菜单')

// 添加/编辑菜单Form表单项
const addOrEditMenuForm = reactive<addOrEditMenuFormType>({ ...initalMenuFormItems })


/*  添加/编辑菜单校验规则 */
// 菜单名称校验规则
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length === 0) {
    callback(new Error('请填写菜单名称'))
  } else if (value.trim().length < 2) {
    callback(new Error('菜单名称至少两位'))
  } else {
    callback()
  }
}

// 权限值校验规则
const validatorCode = (rule: any, value: any, callback: any) => {
  if (value.trim().length === 0) {
    callback(new Error('请填写权限值'))
  } else if (value.trim().length < 2) {
    callback(new Error('权限值至少两位'))
  } else {
    callback()
  }
}

const addOrEditMenuRules = {
  name: [
    { required: true, trigger: 'blur', validator: validatorName }
  ],
  code: [
    { required: true, trigger: 'blur', validator: validatorCode }
  ]
}

// 添加/编辑菜单Form实例对象
const addOrEditMenuFormRef = ref()

// 获取菜单列表
const getMenuList = async () => {
  try {
    const res: PermissionListResponseData = await reqAllPermissionList()
    if (res.code !== 200) return
    menuList.value = res.data || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 添加菜单/编辑菜单
const addOrUpdateMenu = async () => {
  try {
    const res: any = await reqAddOrUpdatePermission(addOrEditMenuForm)
    const messageLabel = addOrEditMenuForm.id ? '更新菜单' : '添加菜单'
    menuDialogVisible.value = false
    if (res.code !== 200) {
      ElMessage.error(`${messageLabel}失败`)
      return
    }
    ElMessage.success(`${messageLabel}成功`)
    getMenuList()
  } catch (error) {
    menuDialogVisible.value = false
    ElMessage.error((error as Error).message)
  }
}

// 删除菜单
const deleteMenu = async (id: number) => {
  try {
    const res: any = await reqRemovePermission(id)
    if (res.code !== 200) {
      ElMessage.error('删除菜单失败')
      return
    }
    ElMessage.success('删除菜单成功')
    getMenuList()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 重置添加/编辑菜单表单项
const resetAddOrEditMenuFormItems = () => {
  Object.assign(addOrEditMenuForm, { ...initalMenuFormItems })
}

// 重置添加/编辑菜单校验规则
const resetAddOrEditMenuRules = () => {
  nextTick(() => {
    addOrEditMenuFormRef.value.clearValidate('name')
    addOrEditMenuFormRef.value.clearValidate('code')
  })
}

// 添加菜单
const handleAddMenu = (row: PermissionItem) => {
  const { id, level } = row
  addOrEditMenuTitle.value = level === 3 ? '添加功能' : '添加菜单'
  menuDialogVisible.value = true
  // 重置表单项
  resetAddOrEditMenuFormItems()
  // 重置校验规则
  resetAddOrEditMenuRules()
  addOrEditMenuForm.pid = (id as number)
  addOrEditMenuForm.level = level + 1
}

// 初始化编辑菜单Form所需数据项
const initEditMenuFormItems = (row: PermissionItem) => {
  Object.assign(addOrEditMenuForm, row)
}

// 编辑菜单
const handleEditMenu = (row: PermissionItem) => {
  const { id, level, pid, name, code } = row
  addOrEditMenuTitle.value = level === 3 ? '更新功能' : '更新菜单'
  menuDialogVisible.value = true
  // 重置校验规则
  resetAddOrEditMenuRules()
  // 初始化表单数据
  initEditMenuFormItems(row)
}

// 确定删除菜单
const handleConfirmDeleteMenu = (id: number) => {
  deleteMenu(id)
}

// 取消添加/编辑菜单
const handleCancelAddOrEditMenu = () => {
  menuDialogVisible.value = false
}

// 确定添加/编辑菜单
const handleConfirmAddOrEditMenu = async () => {
  await addOrEditMenuFormRef.value.validate()
  addOrUpdateMenu()
}

onMounted(() => {
  getMenuList()
})
</script>

<style lang="scss" scoped>
.permission-manage-container {
  width: 100%;
  height: 100%;
}
</style>
