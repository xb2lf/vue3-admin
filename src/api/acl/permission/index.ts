import request from '@/utils/request'
import type { PermissionListResponseData, addOrEditMenuFormType } from './type'

enum API {
  // 菜单信息列表
  PERMISSION_LIST_URL = '/admin/acl/permission',
  // 新增菜单
  ADD_PERMISSION_URL = '/admin/acl/permission/save',
  // 更新菜单
  UPDATE_PERMISSION_URL = '/admin/acl/permission/update',
  // 递归删除菜单
  REMOVE_PERMISSION_URL = '/admin/acl/permission/remove/',
}
// 获取全部菜单列表
export const reqAllPermissionList = () =>
  request.get<any, PermissionListResponseData>(API.PERMISSION_LIST_URL)

// 添加菜单/更新菜单
export const reqAddOrUpdatePermission = (data: addOrEditMenuFormType) =>
  data.id
    ? request.put<any, any>(API.UPDATE_PERMISSION_URL, data)
    : request.post<any, any>(API.ADD_PERMISSION_URL, data)

// 递归删除菜单
export const reqRemovePermission = (id: number) =>
  request.delete<any, any>(`${API.REMOVE_PERMISSION_URL}${id}`)
