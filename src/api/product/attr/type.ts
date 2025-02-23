import { PubResponseData } from '@/api/user/type'

// 分类相关数据ts类型
interface CategoryItemType {
  createTime?: string
  id: number
  name: string
  category1Id?: number
  category2Id?: number
  updateTime?: string
}

export type CategoryDataType = CategoryItemType[]

// 分类返回数据ts类型
export interface CategoryResponseData extends PubResponseData {
  data: CategoryDataType
}

// 三级分类基础属性值ts类型
export interface AttrValueItemType {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export type AttrValueDataType = AttrValueItemType[]

// 三级分类属性ts类型
export interface AttrItemType {
  id?: number
  categoryId: number | undefined
  categoryLevel: number
  attrName: string
  attrValueList: AttrValueDataType
  attrIdAndValueId?: string
}

export type AttrDataType = AttrItemType[]

// 分类对应属性信息列表返回数据ts类型
export interface AttrInfoResponseData extends PubResponseData {
  data: AttrDataType
}
