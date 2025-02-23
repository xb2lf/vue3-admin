// 统一管理品牌相关接口
import request from '@/utils/request'
import type { HashTrademarkResponseData, HashTrademarkItemType } from './type'

// 品牌管理模块接口地址
enum API {
  // 已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌接口
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 更新品牌接口
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除已有品牌
  REMOVE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

// 获取已有品牌
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, HashTrademarkResponseData>(
    `${API.TRADEMARK_URL}${page}/${limit}`,
  )

// 添加与修改已有品牌
export const reqAddOrUpdateTrademark = (data: HashTrademarkItemType) =>
  data.id
    ? request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
    : request.post<any, any>(API.ADD_TRADEMARK_URL, data)

// 删除已有品牌
export const reqRemoveTrademark = (id: number) =>
  request.delete<any, any>(`${API.REMOVE_TRADEMARK_URL}${id}`)
