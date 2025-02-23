import { PubResponseData } from '@/api/user/type'

// 已有SPU返回数据ts类型
export interface SpuItemType {
  id?: number
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList: null
  spuImageList: null
}

export type SpuRecordsType = SpuItemType[]

export interface HashSpuResponseData extends PubResponseData {
  data: {
    records: SpuRecordsType
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

//全部品牌返回数据ts类型
export interface TrademarkItemType {
  id: number
  logoUrl: string
  tmName: string
}

export type TrademarkDataType = TrademarkItemType[]

export interface AllTrademarkResponseData extends PubResponseData {
  data: TrademarkDataType
}

// 已有的SPU下全部商品的图片返回数据ts类型
export interface SpuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  name?: string
  url?: string
}

export type SpuImageDataType = SpuImage[]

export interface SpuImageResponseData extends PubResponseData {
  data: SpuImageDataType
}

// 已有SPU下全部商品的销售属性返回数据ts类型
export interface SaleAttrValue {
  id?: number
  createTime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: boolean | null
}

export type SaleAttrValueDataType = SaleAttrValue[]

export interface SaleAttr {
  id?: number
  createTime?: string | null
  updateTime?: string | null
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: SaleAttrValueDataType
  flag?: boolean
  saleAttrValue?: string
  saleIdAndValueId?: string
}

export type SaleAttrDataType = SaleAttr[]

export interface SaleAttrResponseData extends PubResponseData {
  data: SaleAttrDataType
}

// 全部销售属性返回数据ts类型
export interface AllSaleAttrItem {
  id: number
  name: string
}

export type AllSaleAttrDataType = AllSaleAttrItem[]

export interface AllSaleAttrResponseData extends PubResponseData {
  data: AllSaleAttrDataType
}

// 添加SPU/修改SPU请求所需参数ts类型
export interface SpuFormType {
  id?: number | undefined
  spuName: string
  description: string
  category3Id: number | undefined
  tmId: number | undefined
  spuImageList: SpuImage[] | null
  spuSaleAttrList: SaleAttr[] | null
}

// 添加SKU/修改SKU请求所需参数ts类型
interface SkuPlatformAttr {
  attrId: number
  valueId: number
}

interface SkuSaleAttr {
  saleAttrId: number
  saleAttrValueId: number
}
export interface SkuFormType {
  id?: number
  category3Id: number
  spuId: number
  tmId: number
  skuName: string
  price: number | string
  weight: string
  skuDesc: string
  skuDefaultImg: string
  isSale?: number
  skuAttrValueList: SkuPlatformAttr[]
  skuSaleAttrValueList: SkuSaleAttr[]
  createTime?: string | null
  updateTime?: string | null
}

export type SkuInfoData = SkuFormType[]

export interface SkuInfoResponseData extends PubResponseData {
  data: SkuInfoData
}
