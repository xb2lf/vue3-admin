<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 16:09:52
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 22:04:45
 * @Description:
-->
<template>
  <div class="user-manage-container">
    <el-card class="user-manage-header">
      <el-form inline class="search-form-content">
        <el-form-item label="用户名：">
          <el-input v-model="username" placeholder="请输入用户名" class="search-input-content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" :disabled="!username" @click="handleSearch">搜索</el-button>
          <el-button size="default" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="user-manage-content">
      <div class="table-action-menu">
        <el-button type="primary" size="default" @click="handleAddUser" v-has="'btn.User.add'">添加用户</el-button>
        <el-button type="danger" size="default" :disabled="!batchDelUserIdList.length"
          @click="handleBatchDeleteUser">批量删除</el-button>
      </div>
      <el-table border row-key="id" :data="userInfoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" header-align="center" align="center" width="80px">
        </el-table-column>
        <el-table-column header-align="center" align="center" type="index" :index="customIndex" label="序号"
          width="80px"></el-table-column>
        <el-table-column header-align="center" align="center" prop="id" label="ID" width="80px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="username" label="用户名字" min-width="120px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="name" label="用户名称" min-width="120px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="roleName" label="用户角色" show-overflow-tooltip
          min-width="120px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="createTime" label="创建时间" show-overflow-tooltip
          min-width="180px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="updateTime" label="更新时间" show-overflow-tooltip
          min-width="180px">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" fixed="right" width="300px">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="User" @click="handleAssigningRole(row)">分配角色</el-button>
            <el-button type="success" size="small" icon="Edit" v-has="'btn.User.update'"
              @click="handleEditUser(row)">编辑</el-button>
            <PopconfirmComp :width="220" :title="`您确定要删除${row.username}吗？`" @handleConfirm="handleDeleteUser(row.id)">
              <el-button type="danger" size="small" icon="Delete" v-has="'btn.User.remove'">删除</el-button>
            </PopconfirmComp>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="paginationConfig.currentPage" v-model:page-size="paginationConfig.pageSize"
        :page-sizes="paginationConfig.pageSizes" :size="paginationConfig.size" :background="paginationConfig.background"
        :total="paginationConfig.total" :layout="paginationConfig.layout"
        :hide-on-single-page="paginationConfig.hideOnSinglePage" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
      <!-- 添加用户/编辑用户 -->
      <el-drawer v-model="isShowDrawer" direction="rtl" :size="400">
        <template #header>
          <h4>{{ addOrEditUserTitle }}</h4>
        </template>
        <template #default>
          <el-form :model="addOrEditUserForm" :rules="addOrEditUserRules" ref="addOrEditUserFormRef">
            <el-form-item prop="username" label="用户姓名">
              <el-input v-model="addOrEditUserForm.username" laceholder="请填写用户名字"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="用户昵称">
              <el-input v-model="addOrEditUserForm.name" laceholder="请填写用户昵称"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="用户密码" v-if="!addOrEditUserForm.id">
              <el-input v-model="addOrEditUserForm.password" type="password" laceholder="请填写用户密码"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button @click="handleCancelAddOrEditUser">取消</el-button>
          <el-button type="primary" @click="handleConfirmAddOrEditUser">确定</el-button>
        </template>
      </el-drawer>
      <!-- 分配角色 -->
      <el-drawer v-model="isShowRoleDrawer" direction="rtl" :size="400">
        <template #header>
          <h4>分配角色(职位)</h4>
        </template>
        <template #default>
          <el-form :model="roleForm" :rules="roleFormRules" ref="roleFormRef">
            <el-form-item prop="username" label="用户姓名">
              <el-input v-model="roleForm.username" placeholder="请填写用户名字" disabled></el-input>
            </el-form-item>
            <el-form-item prop="roleIdList" label="角色列表">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                全选
              </el-checkbox>
              <el-checkbox-group v-model="roleForm.roleIdList" @change="handleCheckedRoleChange">
                <el-checkbox v-for="(el, i) in roleList" :label="el.roleName" :value="el.id"
                  :key="(el.id as number) | i" />
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button @click="handleCancelAssigningRole">取消</el-button>
          <el-button type="primary" @click="handleConfirmAssigningRole">确定</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from 'vue'
import _ from 'lodash'
import type { CheckboxValueType } from 'element-plus';
import type { PaginationConfigType } from "./type";
import { reqUserInfoList, reqAddOrEditUser, reqAllRole, reqSetUserRole, reqRemoveUser, reqBatchRemoveUser } from '@/api/acl/user';
import { UserResponseData, UserListType, UserItem, RoleResponseData, RolesType, RoleItemType, RoleFormType } from '@/api/acl/user/type';
import useLayoutSettingStore from '@/store/modules/setting';

// 获取设置仓库
const settingStore = useLayoutSettingStore()

// 用户信息列表
const userInfoList = ref<UserListType>([])

//初始默认的添加用户/编辑用户的表单项
const initalUserInfo: UserItem = {
  id: undefined,
  username: '',
  name: '',
  password: '',
  phone: null,
  roleName: '',
  createTime: '',
  updateTime: ''
}

// 初始默认的分配角色的表单项
const initalRoleForm: RoleFormType = {
  userId: undefined,
  username: '',
  roleIdList: []
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
const username = ref<string>('')

// 添加/编辑用户Form实例对象
const addOrEditUserFormRef = ref()

// 添加/编辑用户表单项
const addOrEditUserForm = reactive<UserItem>({ ...initalUserInfo })

/* 添加/编辑用户表单校验规则 */
// 用户名校验
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length === 0) {
    callback(new Error('请填写用户名字'))
  } else if (value.trim().length < 5) {
    callback(new Error('用户名字至少五位'))
  } else {
    callback()
  }
}

// 用户名校验
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length === 0) {
    callback(new Error('请填写用户昵称'))
  } else if (value.trim().length < 5) {
    callback(new Error('用户昵称至少五位'))
  } else {
    callback()
  }
}

// 密码校验
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length === 0) {
    callback(new Error('请填写用户密码'))
  } else if (value.trim().length < 6) {
    callback(new Error('用户密码至少六位'))
  } else {
    callback()
  }
}
// 校验集合
const addOrEditUserRules = {
  username: [
    { required: true, trigger: 'blur', validator: validatorUsername }
  ],
  name: [
    { required: true, trigger: 'blur', validator: validatorName }
  ],
  password: [
    { required: true, trigger: 'blur', validator: validatorPassword }
  ]
};

// 是否展示添加/编辑用户抽屉
const isShowDrawer = ref<boolean>(false)

//添加/编辑用户抽屉标题
const addOrEditUserTitle = ref<string>('添加用户')

// 批量删除用户id列表
const batchDelUserIdList = ref<number[]>([])

// 所有角色列表
const roleList = ref<RolesType>([])

// 是否展开分配角色抽屉
const isShowRoleDrawer = ref<boolean>(false)

// 分配角色Form实例对象
const roleFormRef = ref()

// 分配角色表单项
const roleForm = reactive<RoleFormType>({ ...initalRoleForm })

// 校验角色选择规则
const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (!value || !value?.length) {
    callback(new Error('请选择用户角色'))
  } else {
    callback()
  }
}

// 分配角色表单校验规则
const roleFormRules = {
  username: [
    { required: false, message: '请填写用户名', trigger: 'bule' }
  ],
  roleIdList: [
    { required: true, trigger: 'blur', validator: validatorRoleName }
  ]
}

// 是否全选
const checkAll = ref(false)
// 是否中间态
const isIndeterminate = ref(false)

// 更新全选checkBox绑定的值
const updateCheckBoxValues = (value: number[]) => {
  const checkedCount = value.length
  const totalCount = roleList.value.length
  checkAll.value = checkedCount === totalCount
  isIndeterminate.value = checkedCount > 0 && checkedCount < totalCount
}

// 获取用户信息列表
const getUserInfoList = async () => {
  try {
    const res: UserResponseData = await reqUserInfoList(paginationConfig.currentPage, paginationConfig.pageSize, username.value)
    if (res.code !== 200) return
    paginationConfig.total = res.data.total || 0
    userInfoList.value = res.data.records || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 添加用户/修改用户
const addOrEditUser = async () => {
  try {
    const res: any = await reqAddOrEditUser(addOrEditUserForm)
    const messageLabel = addOrEditUserForm.id ? '更新用户' : '添加用户'
    isShowDrawer.value = false
    if (res.code !== 200) {
      ElMessage.error(`${messageLabel}失败`)
      return
    }
    ElMessage.success(`${messageLabel}成功`)
    if (!addOrEditUserForm.id) {
      paginationConfig.currentPage = 1
      getUserInfoList()
    } else {
      // 让浏览器自动刷新一次，以防止修改当前登录所属用户信息后无法找到当前用户，此时刷新后会自动token失效，然后使用新的用户名登录(正常思路：如果用户在修改用户信息时，发现修改的是自己的用户信息，那么则不允许修改用户名，因为个人信息接口返回的字段没有用户id，导致无法用唯一值做对比，那么此时临时解决方案则是自动刷新重新登录)
      window.location.reload()
    }
    /* paginationConfig.currentPage = addOrEditUserForm.id ? paginationConfig.currentPage : 1
    getUserInfoList() */
  } catch (error) {
    isShowDrawer.value = false
    ElMessage.error((error as Error).message)
  }
}

// 获取全部角色列表
const getAllRoleList = async (userId: number) => {
  try {
    const res: RoleResponseData = await reqAllRole(userId)
    if (res.code !== 200) {
      ElMessage.error('获取全部角色列表失败')
      return
    }
    roleList.value = res.data.allRolesList || []
    roleForm.roleIdList = res.data.assignRoles.map((el) => (el.id as number))
    updateCheckBoxValues((roleForm.roleIdList as number[]))
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 给用户分配角色
const setUserRole = async () => {
  try {
    const params = { userId: roleForm.userId, roleIdList: roleForm.roleIdList }
    const res: any = await reqSetUserRole(params)
    isShowRoleDrawer.value = false
    if (res.code !== 200) {
      ElMessage.error('分配角色失败')
      return
    }
    ElMessage.success('分配角色成功')
    isShowRoleDrawer.value = false
    getUserInfoList()
  } catch (error) {
    isShowRoleDrawer.value = false
    ElMessage.error((error as Error).message)
  }
}

// 单独删除一个用户
const removeUser = async (userId: number) => {
  try {
    const res: any = await reqRemoveUser(userId)
    if (res.code !== 200) {
      ElMessage.error('删除用户失败')
      return
    }
    ElMessage.success('删除用户成功')
    paginationConfig.currentPage = userInfoList.value.length > 1 ? paginationConfig.currentPage : paginationConfig.currentPage - 1
    getUserInfoList()
  } catch (error) {
    isShowRoleDrawer.value = false
    ElMessage.error((error as Error).message)
  }
}

// 批量删除用户
const batchDeleteUser = async () => {
  try {
    const res: any = await reqBatchRemoveUser(batchDelUserIdList.value)
    if (res.code !== 200) {
      ElMessage.error('批量删除用户失败')
      return
    }
    ElMessage.success('批量删除用户成功')
    paginationConfig.currentPage = userInfoList.value.length > 1 ? paginationConfig.currentPage : paginationConfig.currentPage - 1
    getUserInfoList()
  } catch (error) {
    isShowRoleDrawer.value = false
    ElMessage.error((error as Error).message)
  }
}

// 自定义计算表格序号函数(跨页)
const customIndex = (index: number) => {
  return (paginationConfig.currentPage - 1) * paginationConfig.pageSize + index + 1;
};

// 重置添加或者编辑用户表单项
const resetUserFormItems = () => {
  Object.assign(addOrEditUserForm, { ...initalUserInfo })
}

// 重置表单校验
const resetFormRule = () => {
  nextTick(() => {
    addOrEditUserFormRef.value.clearValidate('username')
    addOrEditUserFormRef.value.clearValidate('name')
    !addOrEditUserForm.id && addOrEditUserFormRef.value.clearValidate('password')
  })
}

// 初始化分配角色表单
const initRoleForm = (row: UserItem) => {
  const { id, username, roleName = '' } = row
  roleForm.userId = id;
  roleForm.username = username
  getAllRoleList(id as number)

}

// 重置分配角色表单项
const resetRoleFormItems = () => {
  Object.assign(roleForm, { ...initalRoleForm })
  checkAll.value = false
  isIndeterminate.value = false
}

// 重置分配表单校验
const resetRoleFormRule = () => {
  nextTick(() => {
    roleFormRef.value.clearValidate('username')
    roleFormRef.value.clearValidate('roleIdList')
  })
}

// 搜索
const handleSearch = () => {
  if (!username.value) {
    ElMessage.warning('请输入用户名后再进行搜索')
    return
  }
  getUserInfoList()
}

// 重置
const handleReset = () => {
  // 方法一
  /* paginationConfig.currentPage = 1
  paginationConfig.pageSize = 10
  username.value = ''
  getUserInfoList() */
  // 方法二
  settingStore.updateIsRefresh()
}

// 添加用户
const handleAddUser = () => {
  addOrEditUserTitle.value = '添加用户'
  isShowDrawer.value = true
  // 重置表单项
  resetUserFormItems()
  resetFormRule()
}

// 当选择项发生变化时会触发该事件(用户选中项列表)
const handleSelectionChange = (selection: UserListType) => {
  const userIdList = selection.map((item) => (item.id as number))
  batchDelUserIdList.value = userIdList
}

// 批量删除用户
const handleBatchDeleteUser = () => {
  if (!batchDelUserIdList.value.length) {
    ElMessage.warning('请选中用户后再进行操作')
    return
  }
  batchDeleteUser()
}

// 分配角色
const handleAssigningRole = (row: UserItem) => {
  isShowRoleDrawer.value = true
  // 重置表单项
  resetRoleFormItems()
  resetRoleFormRule()
  // 初始化表单项
  initRoleForm(row)
}

// 角色列表全选
const handleCheckAllChange = (val: CheckboxValueType) => {
  roleForm.roleIdList = val ? roleList.value.map((el: RoleItemType) => (el.id as number)) : []
  isIndeterminate.value = false
}

//角色选择change事件
const handleCheckedRoleChange = (value: number[]) => {
  updateCheckBoxValues(value)
}

// 取消分配角色
const handleCancelAssigningRole = () => {
  isShowRoleDrawer.value = false;
}

// 确定分配角色
const handleConfirmAssigningRole = async () => {
  await roleFormRef.value.validate()
  setUserRole()
}

// 编辑用户
const handleEditUser = (row: UserItem) => {
  const currUserInfo = _.cloneDeep(row)
  Object.assign(addOrEditUserForm, currUserInfo)
  addOrEditUserTitle.value = '编辑用户'
  isShowDrawer.value = true
  resetFormRule()
}

// 取消添加或者编辑用户
const handleCancelAddOrEditUser = () => {
  isShowDrawer.value = false
}

// 确定添加/编辑用户
const handleConfirmAddOrEditUser = async () => {
  await addOrEditUserFormRef.value.validate()
  addOrEditUser()
}

// 单独删除一个用户
const handleDeleteUser = (userId: number) => {
  removeUser(userId)
}

// 每页条数发生变化
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  paginationConfig.currentPage = 1
  getUserInfoList()
};

// 页数发生变化
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  getUserInfoList()
};

onMounted(() => {
  getUserInfoList()
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  width: 100%;
  height: 100%;

  .user-manage-header {
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

  .user-manage-content {
    width: 100%;
    height: calc(100% - 85px);

    .table-action-menu {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }
}
</style>
