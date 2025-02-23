import { PubResponseData } from '@/api/user/type'

// 用户分页列表返回数据ts类型

export interface UserItem {
  id?: number
  username: string
  password: string
  name: string
  phone?: number | string | null
  roleName?: string | null
  createTime?: string
  updateTime?: string
}

export type UserListType = UserItem[]

interface UserData {
  records: UserListType
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

export interface UserResponseData extends PubResponseData {
  data: UserData
}

// 角色列表返回数据ts类型
export interface RoleItemType {
  id?: number | undefined
  roleName: string
  remark?: string | null
  createTime?: string | null
  updateTime?: string | null
}

export type RolesType = RoleItemType[]

interface RoleData {
  assignRoles: RolesType
  allRolesList: RolesType
}

export interface RoleResponseData extends PubResponseData {
  data: RoleData
}

// 分配角色请求接口所需参数ts类型
export interface RoleFormType {
  userId: number | undefined
  username?: string
  roleIdList: number[]
}
