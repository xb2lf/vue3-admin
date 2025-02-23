/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-21 17:26:00
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-22 14:10:04
 * @Description:
 */
import { PubResponseData } from '@/api/user/type'

// 角色信息列表返回数据ts类型

export interface RoleItemType {
  id?: number
  roleName: string | null
  createTime?: string
  updateTime?: string
  remark?: string | null
}

export type RoleListType = RoleItemType[]

interface RoleData {
  records: RoleListType
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCoountSql: boolean
  hitCount: boolean
  countId: number | null
  maxLimit: number | null
  searchCount: boolean
  pages: number
}

export interface RoleResponseData extends PubResponseData {
  data: RoleData
}

// 添加角色/编辑角色请求接口所需参数ts类型
export interface RoleFormType {
  id?: number
  roleName: string
}

// 根据角色获取菜单列表返回数据ts类型
export interface PermissionItemType {
  id: number
  pid: number | null
  name: string
  code: string
  toCode: string | null
  type: number
  status: number | null
  level: number
  children?: PermissionDataType
  select: boolean
  createTime?: string
  updateTime?: string
}

export type PermissionDataType = PermissionItemType[]

export interface PermissionResponseData extends PubResponseData {
  data: PermissionDataType
}
