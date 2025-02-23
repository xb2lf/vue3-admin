<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 16:10:26
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 20:21:41
 * @Description: 
-->
<template>
  <div class="role-manage-container">
    <el-card class="role-manage-header">
      <el-form inline class="search-form-content">
        <el-form-item label="角色名：">
          <el-input v-model="roleName" placeholder="角色名称" class="search-input-content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" :disabled="!roleName" @click="handleSearch">搜索</el-button>
          <el-button size="default" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="role-manage-content">
      <el-button type="primary" size="default" icon="Plus" class="add-role-btn" @click="handleAddRole">添加角色</el-button>
      <el-table border row-key="id" :data="roleInfoList">
        <el-table-column header-align="center" align="center" type="index" :index="customIndex" label="序号"
          width="80px"></el-table-column>
        <el-table-column header-align="center" align="center" prop="id" label="ID" width="80px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="roleName" label="角色名称" min-width="120px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="createTime" label="创建时间" show-overflow-tooltip
          min-width="180px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="updateTime" label="更新时间" show-overflow-tooltip
          min-width="180px">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" fixed="right" width="300px">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User" @click="handleAssignPermissions(row)">分配权限</el-button>
            <el-button type="success" size="small" icon="Edit" @click="handleEditRole(row)">编辑</el-button>
            <PopconfirmComp :width="220" :title="`您确定要删除${row.roleName}吗？`" @handleConfirm="handleDeleteRole(row.id)">
              <el-button type="danger" size="small" icon="Delete">删除</el-button>
            </PopconfirmComp>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="paginationConfig.currentPage" v-model:page-size="paginationConfig.pageSize"
        :page-sizes="paginationConfig.pageSizes" :size="paginationConfig.size" :background="paginationConfig.background"
        :total="paginationConfig.total" :layout="paginationConfig.layout"
        :hide-on-single-page="paginationConfig.hideOnSinglePage" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
      <!-- 添加角色/编辑角色 -->
      <el-dialog v-model="isShowDialog" width="400" :title="addOrEditRoleTitle" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form :model="addOrEditRoleForm" :rules="addOrEditRoleRules" ref="addOrEditRoleFormRef">
          <el-form-item prop="roleName" label="角色名称">
            <el-input v-model="addOrEditRoleForm.roleName" laceholder="请填写角色名称"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="handleCancelAddOrEditRole">取消</el-button>
          <el-button type="primary" @click="handleConfirmAddOrEditRole">确定</el-button>
        </template>
      </el-dialog>
      <!-- 分配权限 -->
      <el-drawer v-model="isShowPermissionDrawer" direction="rtl" :size="400">
        <template #header>
          <h4>分配权限</h4>
        </template>
        <template #default>
          <!-- 树形控件 -->
          <el-tree ref="permissionTreeRef" :data="permissionList" show-checkbox node-key="id" default-expand-all
            :default-checked-keys="defaultCheckedPermissions" :props="defaultProps" empty-text="暂无数据"
            class="permission-tree-checkbox" />
        </template>
        <template #footer>
          <el-button @click="handleCancelAssignPermissions">取消</el-button>
          <el-button type="primary" @click="handleConfirmAssignPermissions">确定</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";
import type { PaginationConfigType } from "./type";
import { reqRoleList, reqAddOrUpdareRole, reqRemoveRole, reqPermissionByRoleId, reqSetPermission } from '@/api/acl/role'
import type { RoleResponseData, RoleListType, RoleItemType, RoleFormType, PermissionResponseData, PermissionDataType, PermissionItemType } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting';

// 获取设置仓库
const settingStore = useLayoutSettingStore()

// 角色列表
const roleInfoList = ref<RoleListType>([])

// 初始化默认添加角色/编辑角色表单项
const initalAddOrEditRoleForm: RoleFormType = {
  id: undefined,
  roleName: ''
}

// 分页器配置
const paginationConfig = reactive<PaginationConfigType>({
  currentPage: 1,
  pageSize: 10,
  pageSizes: [5, 10, 20, 50, 100],
  total: 0,
  size: "default",
  background: true,
  layout: "prev, pager, next, jumper,->,sizes,total",
  hideOnSinglePage: true,
});

// 搜索项
const roleName = ref<string>('')

// 是否显示添加角色/编辑角色Dialog
const isShowDialog = ref<boolean>(false)

// 添加角色/编辑角色Dialog标题
const addOrEditRoleTitle = ref<string>('添加角色')

// 添加角色/编辑角色表单项
const addOrEditRoleForm = reactive<RoleFormType>({ ...initalAddOrEditRoleForm })

// 角色名校验规则
const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length === 0) {
    callback(new Error('请填写角色名称'))
  } else if (value.trim().length < 2) {
    callback(new Error('角色名称至少两位'))
  } else {
    callback()
  }
}

// 添加角色/编辑角色校验规则
const addOrEditRoleRules = {
  roleName: [
    { required: true, trigger: 'blur', validator: validatorRoleName }
  ]
}

// 添加角色/编辑角色Form对象实例
const addOrEditRoleFormRef = ref()

// 是否显示分配权限抽屉
const isShowPermissionDrawer = ref(false)

// 分配权限所属角色Id
const roleId = ref<number>()

/* 分配权限树形控件 */
const permissionTreeRef = ref()
// 树形控件传入配置
const defaultProps = {
  children: 'children',
  label: 'name',
}

// 树形控件数据
const permissionList = ref<PermissionDataType>([])

// 树形控件默认选中数据
const defaultCheckedPermissions = ref<number[]>([])

// 获取角色列表
const getRoleInfoList = async () => {
  try {
    const res: RoleResponseData = await reqRoleList(paginationConfig.currentPage, paginationConfig.pageSize, roleName.value)
    if (res.code !== 200) return
    paginationConfig.total = res.data.total || 0
    roleInfoList.value = res.data.records || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 添加角色/编辑角色
const addOrEditRole = async () => {
  try {
    const res: any = await reqAddOrUpdareRole(addOrEditRoleForm)
    const messageLabel = addOrEditRoleForm.id ? '更新角色' : '添加角色'
    isShowDialog.value = false
    if (res.code !== 200) {
      ElMessage.error(`${messageLabel}失败`)
      return
    }
    ElMessage.success(`${messageLabel}成功`)
    paginationConfig.currentPage = addOrEditRoleForm.id ? paginationConfig.currentPage : 1
    getRoleInfoList()
  } catch (error) {
    isShowDialog.value = false
    ElMessage.error((error as Error).message)
  }
}

// 初始化树形控件默认选中数据
const initDefaultCheckedPermissions = (data: PermissionDataType, initArr: number[]) => {
  data.forEach((item: PermissionItemType) => {
    item.select && item.level === 4 && initArr.push(item.id)
    item?.children?.length && initDefaultCheckedPermissions(item.children, initArr)
  })

  return initArr
}

// 获取树形控件数据
const getMenuList = async (roleId: number) => {
  try {
    const res: PermissionResponseData = await reqPermissionByRoleId(roleId)
    if (res.code !== 200) return
    permissionList.value = res.data || []
    const selectArr = initDefaultCheckedPermissions(res.data, [])
    defaultCheckedPermissions.value = selectArr
    isShowPermissionDrawer.value = true
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 删除一个角色
const deleteRole = async (id: number) => {
  try {
    const res: any = await reqRemoveRole(id)
    if (res.code !== 200) {
      ElMessage.error('删除角色失败')
      return
    }
    ElMessage.success('删除角色成功')
    paginationConfig.currentPage = roleInfoList.value.length > 1 ? paginationConfig.currentPage : (paginationConfig.currentPage - 1)
    getRoleInfoList()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 分配权限
const setPermission = async (roleId: number, permissionIds: number[]) => {
  try {
    const res: any = await reqSetPermission(roleId, permissionIds)
    if (res.code !== 200) {
      ElMessage.error('分配权限失败')
      return
    }
    ElMessage.success('分配权限成功')
    isShowPermissionDrawer.value = false
    // 刷新页面，重新获取权限(如果用户分配的权限是自己的权限,需要重新获取下菜单权限)
    const timer = setTimeout(() => {
      window.location.reload()
      clearTimeout(timer)
    }, 300)
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 自定义计算表格序号函数(跨页)
const customIndex = (index: number) => {
  return (paginationConfig.currentPage - 1) * paginationConfig.pageSize + index + 1;
};

// 搜索
const handleSearch = () => {
  if (!roleName.value) {
    ElMessage.warning('请输入用户名后再进行搜索')
    return
  }
  getRoleInfoList()
}

// 重置
const handleReset = () => {
  // 方法一
  /* paginationConfig.currentPage = 1
  paginationConfig.pageSize = 10
  roleName.value = ''
  getRoleInfoList() */
  // 方法二
  settingStore.updateIsRefresh()
}

// 重置添加角色/编辑角色表单项
const resetAddOrEditRoleForm = () => {
  Object.assign(addOrEditRoleForm, { ...initalAddOrEditRoleForm })
}

// 重置添加角色/编辑角色表单项校验规则
const resetAddOrEditRoleRules = () => {
  nextTick(() => {
    addOrEditRoleFormRef.value.clearValidate('roleName')
  })
}

// 添加角色
const handleAddRole = () => {
  addOrEditRoleTitle.value = '添加角色'
  isShowDialog.value = true
  //重置表单项
  resetAddOrEditRoleForm()
  //重置校验规则
  resetAddOrEditRoleRules()
}

// 分配权限
const handleAssignPermissions = async (row: RoleItemType) => {
  const { id } = row
  roleId.value = id
  getMenuList((id as number))
}

// 取消分配权限
const handleCancelAssignPermissions = () => {
  isShowPermissionDrawer.value = false
}

//整理选择的树形控件数据
const formateCheckedData = () => {
  const checkedIds: number[] = permissionTreeRef.value.getCheckedKeys()
  const halfCheckedIds: number[] = permissionTreeRef.value.getHalfCheckedKeys()
  return checkedIds.concat(halfCheckedIds)
}

// 确定分配权限
const handleConfirmAssignPermissions = () => {
  const permissionId = formateCheckedData()
  if (!permissionId.length) {
    ElMessage.warning('请选择权限后再进行操作')
    return
  }
  setPermission((roleId.value as number), permissionId)
}

// 编辑角色
const handleEditRole = (row: RoleItemType) => {
  addOrEditRoleTitle.value = '编辑角色'
  isShowDialog.value = true
  //重置校验规则
  resetAddOrEditRoleRules()
  const { id, roleName } = row
  addOrEditRoleForm.id = (id as number)
  addOrEditRoleForm.roleName = (roleName as string)
}

// 删除角色
const handleDeleteRole = (id: number) => {
  deleteRole(id)
}

// 取消添加/编辑角色
const handleCancelAddOrEditRole = () => {
  isShowDialog.value = false
}

// 确定添加/编辑角色
const handleConfirmAddOrEditRole = async () => {
  await addOrEditRoleFormRef.value.validate()
  addOrEditRole()
}

// 每页条数发生变化
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  paginationConfig.currentPage = 1;
  getRoleInfoList()
};

// 页数发生变化
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  getRoleInfoList()
};

onMounted(() => {
  getRoleInfoList()
})
</script>

<style lang="scss" scoped>
.role-manage-container {
  width: 100%;
  height: 100%;

  .role-manage-header {
    width: 100%;
    height: 75px;
    margin-bottom: 10px;

    :deep(.el-card__body) {
      width: 100%;

      .search-form-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .el-form-item {
          margin: 0;
        }

        .search-input-content {
          width: 240px;
        }
      }
    }
  }

  .role-manage-content {
    width: 100%;
    height: calc(100% - 85px);

    .add-role-btn {
      margin-bottom: 10px;
    }
  }

  .permission-tree-checkbox {
    max-width: 100%;
  }
}
</style>
