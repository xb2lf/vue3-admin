import { PubResponseData } from '@/api/user/type'

// sku列表返回数据ts类型
interface SkuPlatformAttr {
  id: number
  valueId: number
  attrName?: string
  valueName?: string
}

interface SkuSaleAttr {
  id: number
  saleAttrValueId: number
  saleAttrName?: string
  saleAttrValueName?: string
}

interface SkuImage {
  id: number
  skuId?: number
  imgName: string
  imgUrl: string
  spuImgId?: 22
  isDefault?: string | number
}

export interface SkuItemType {
  id?: number
  category3Id?: number
  spuId?: number
  tmId?: number
  skuName: string
  price: number | string
  weight: string
  skuDesc: string
  skuDefaultImg: string
  isSale?: number
  skuAttrValueList: SkuPlatformAttr[]
  skuSaleAttrValueList: SkuSaleAttr[]
  skuImageList?: SkuImage[]
  createTime?: string | null
  updateTime?: string | null
}

export type SkuListType = SkuItemType[]

interface SkuData {
  records: SkuListType
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

export interface SkuResponseData extends PubResponseData {
  data: SkuData
}

// 查看SKU信息返回数据TS类型
export interface SkuInfoResponseData extends PubResponseData {
  data: SkuItemType
}
