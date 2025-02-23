// 用户管理相关接口
import request from '@/utils/request'
import {
  UserResponseData,
  UserItem,
  RoleResponseData,
  RoleFormType,
} from './type'

enum API {
  ALL_USER_URL = '/admin/acl/user/',
  ADD_USER_URL = '/admin/acl/user/save',
  UPDATE_USER_URL = '/admin/acl/user/update',
  REMOVE_USER_URL = '/admin/acl/user/remove/',
  BATCH_REMOVE_USER_URL = '/admin/acl/user/batchRemove',
  GET_USERINFO_URL = '/admin/acl/user/get/{id}',
  // 获取全部职位及当前账号拥有的职位
  ALL_ROLE_URL = '/admin/acl/user/toAssign/',
  // 角色分配
  SET_ROLE_URL = '/admin/acl/user/doAssignRole',
}

// 获取用户信息列表
export const reqUserInfoList = (
  page: number,
  limit: number,
  username: string,
) =>
  request.get<any, UserResponseData>(
    `${API.ALL_USER_URL}${page}/${limit}?username=${username}`,
  )

// 添加/编辑用户
export const reqAddOrEditUser = (data: UserItem) =>
  data.id
    ? request.put<any, any>(API.UPDATE_USER_URL, data)
    : request.post<any, any>(API.ADD_USER_URL, data)

// 全部角色及请求用户所拥有的角色
export const reqAllRole = (userId: number) =>
  request.get<any, RoleResponseData>(`${API.ALL_ROLE_URL}${userId}`)

// 给用户分配角色
export const reqSetUserRole = (data: RoleFormType) =>
  request.post<any, any>(API.SET_ROLE_URL, data)

// 删除一个用户
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(`${API.REMOVE_USER_URL}${userId}`)

// 批量删除用户
export const reqBatchRemoveUser = (idList: number[]) =>
  request.delete<any, any>(API.BATCH_REMOVE_USER_URL, { data: idList })
