// 统一管理SPU相关接口
import request from '@/utils/request'
import type {
  HashSpuResponseData,
  AllTrademarkResponseData,
  SpuImageResponseData,
  SaleAttrResponseData,
  AllSaleAttrResponseData,
  SpuFormType,
  SkuFormType,
  SkuInfoResponseData,
} from './type'

enum API {
  // SPU接口地址
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // SPU对应的全部售卖商品的照片
  SPUIMAGELIST_URL = '/admin/product/spuImageList/',
  // SPU对应销售属性
  SPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList/',
  // 全部销售属性
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 添加SPU
  ADD_SPU_URL = '/admin/product/saveSpuInfo',
  // 修改SPU
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
  // 删除SPU
  DELETE_SPU_URL = '/admin/product/deleteSpu/',
  //添加SKU
  ADD_SKU_URL = '/admin/product/saveSkuInfo',
  // 某一个已有的SPU对应的全部SKU
  SKUINFO_URL = '/admin/product/findBySpuId/',
}

// 请求已有的spu
export const reqHasSpu = (page: number, limit: number, category3Id: number) =>
  request.get<any, HashSpuResponseData>(
    `${API.HASSPU_URL}${page}/${limit}?category3Id=${category3Id}`,
  )

// 获取全部的品牌
export const reqAllTrademark = () =>
  request.get<any, AllTrademarkResponseData>(API.ALLTRADEMARK_URL)

// 获取某一个已有的SPU下全部商品的图片
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuImageResponseData>(`${API.SPUIMAGELIST_URL}${spuId}`)

// 获取某一个已有的SPU下全部商品的销售属性
export const reqSpuSaleAttrList = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(`${API.SPUSALEATTRLIST_URL}${spuId}`)

// 获取全部的销售属性
export const reqAllSaleAttr = () =>
  request.get<any, AllSaleAttrResponseData>(API.ALLSALEATTR_URL)

// 添加一个新的spu/更新spu
export const reqAddOrUpdateSpu = (data: SpuFormType) =>
  request.post<any, any>(data.id ? API.UPDATE_SPU_URL : API.ADD_SPU_URL, data)

// 删除spu
export const reqDeleteSpu = (spuId: number) =>
  request.delete<any, any>(`${API.DELETE_SPU_URL}${spuId}`)

// 添加sku
export const reqAddSku = (data: SkuFormType) =>
  request.post<any, any>(API.ADD_SKU_URL, data)

// 查看某一个已有的SPU下全部售卖的商品
export const reqSkuInfo = (spuId: number) =>
  request.get<any, SkuInfoResponseData>(`${API.SKUINFO_URL}${spuId}`)
