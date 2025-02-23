/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-21 17:26:03
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-22 18:35:37
 * @Description:
 */
import { PubResponseData } from '@/api/user/type'

// 菜单列表返回数据ts类型
export interface PermissionItem {
  id?: number
  pid: number | null
  name: string
  code: string
  toCode: string | null
  type: number
  status: number | null
  level: number
  children?: PermissionListType
  select: boolean
  createTime?: string
  updateTime?: string
}

export type PermissionListType = PermissionItem[]

export interface PermissionListResponseData extends PubResponseData {
  data: PermissionListType
}

// 添加菜单/编辑菜单请求接口所需参数ts类型
export interface addOrEditMenuFormType {
  id?: number
  pid?: number
  level?: number
  name: string
  code: string
  children?: PermissionItem[]
  select?: boolean
  status?: number
  toCode?: string
  type?: number
  createTime?: string
  updateTime?: string
}
