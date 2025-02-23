/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-19 02:00:48
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-21 14:42:46
 * @Description:
 */
// SKU管理相关接口
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoResponseData } from './type'

enum API {
  SKU_URL = '/admin/product/list/',
  SKU_ON_SALE_URL = '/admin/product/onSale/',
  SKU_CANCEL_SALE_URL = '/admin/product/cancelSale/',
  SKU_INFO_URL = '/admin/product/getSkuById/',
  DELETE_SKU_URL = '/admin/product/deleteSku/',
}

// 获取商品SKU
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(`${API.SKU_URL}${page}/${limit}`)

// 商品SKU上架
export const reqOnSaleSku = (skuId: number) =>
  request.get<any, any>(`${API.SKU_ON_SALE_URL}${skuId}`)

// 商品SKU下架
export const reqCancelSaleSku = (skuId: number) =>
  request.get<any, any>(`${API.SKU_CANCEL_SALE_URL}${skuId}`)

// 商品SKU信息
export const reqSkuInfoById = (skuId: number) =>
  request.get<any, SkuInfoResponseData>(`${API.SKU_INFO_URL}${skuId}`)

// 删除商品SKU
export const reqDeleteSku = (skuId: number) =>
  request.delete<any, any>(`${API.DELETE_SKU_URL}${skuId}`)
