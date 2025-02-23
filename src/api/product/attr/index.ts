/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-19 02:01:50
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-20 02:58:46
 * @Description:
 */
// 统一管理属性相关接口
import request from '@/utils/request'
import type {
  CategoryResponseData,
  AttrInfoResponseData,
  AttrItemType,
} from './type'

enum API {
  // 分类接口地址
  FIRST_CATEGORY_URL = '/admin/product/getCategory1',
  SECOND_CATEGORY_URL = '/admin/product/getCategory2/',
  THIRD_CATEGORY_URL = '/admin/product/getCategory3/',
  // 属性接口地址
  ATTRINFO_LIST_URL = '/admin/product/attrInfoList/',
  SAVE_ATTRINFO_URL = '/admin/product/saveAttrInfo',
  DELETE_ATTR_URL = '/admin/product/deleteAttr/',
}

// 获取一级分类
export const reqFirstCategory = () =>
  request.get<any, CategoryResponseData>(API.FIRST_CATEGORY_URL)

// 获取二级分类
export const reqSecondCategory = (id: number) =>
  request.get<any, CategoryResponseData>(`${API.SECOND_CATEGORY_URL}${id}`)

// 获取三级分类
export const reqThirdCategory = (id: number) =>
  request.get<any, CategoryResponseData>(`${API.THIRD_CATEGORY_URL}${id}`)

// 获取三级分级基础属性列表
export const reqAttrInfoList = (
  firstId: number,
  secondId: number,
  thirdId: number,
) =>
  request.get<any, AttrInfoResponseData>(
    `${API.ATTRINFO_LIST_URL}${firstId}/${secondId}/${thirdId}`,
  )

// 添加或者修改已有的属性
export const reqAddorUpdateArr = (data: AttrItemType) =>
  request.post<any, any>(API.SAVE_ATTRINFO_URL, data)

// 删除已有的属性
export const reqDeleteArr = (id: number) =>
  request.delete<any, any>(`${API.DELETE_ATTR_URL}${id}`)
