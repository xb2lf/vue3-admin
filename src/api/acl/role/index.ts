/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-21 17:26:00
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-22 15:19:11
 * @Description:
 */
import request from '@/utils/request'
import { RoleResponseData, RoleFormType, PermissionResponseData } from './type'

enum API {
  // 角色信息列表
  ROLE_LIST_URL = '/admin/acl/role/',
  //添加角色
  ADD_ROLE_URL = '/admin/acl/role/save',
  // 更新角色
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  // 删除角色
  REMOVE_ROLE_URL = '/admin/acl/role/remove/',
  // 批量删除角色
  BATCH_REMOVE_ROLE_URL = '/admin/acl/role/batchRemove',
  // 获取角色信息
  GET_ROLEINFO_URL = '/admin/acl/role/get/{id}',
  // 获取菜单
  PERMISSION_LIST_URL = '/admin/acl/permission',
  // 根据角色获取菜单
  PERMISSION_LIST_BY_ROLEID_URL = '/admin/acl/permission/toAssign/',
  // 给角色分配权限
  DO_ASSSIGN_URL = '/admin/acl/permission/doAssign',
  // 给角色份分配权限
  DO_ASSIGN_ACL_URL = '/admin/acl/permission/doAssignAcl',
}

// 获取角色分页列表
export const reqRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    `${API.ROLE_LIST_URL}${page}/${limit}?roleName=${roleName}`,
  )

// 添加角色/更新角色
export const reqAddOrUpdareRole = (data: RoleFormType) =>
  data.id
    ? request.put<any, any>(API.UPDATE_ROLE_URL, data)
    : request.post<any, any>(API.ADD_ROLE_URL, data)
// 单独删除一个角色
export const reqRemoveRole = (id: number) =>
  request.delete<any, any>(`${API.REMOVE_ROLE_URL}${id}`)

// 根据角色获取菜单
export const reqPermissionByRoleId = (roleId: number) =>
  request.get<any, PermissionResponseData>(
    `${API.PERMISSION_LIST_BY_ROLEID_URL}${roleId}`,
  )

// 给相应的角色分配权限
export const reqSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    `${API.DO_ASSSIGN_URL}?roleId=${roleId}&permissionId=${permissionId}`,
  )
