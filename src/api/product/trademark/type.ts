/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-17 18:24:02
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-19 18:14:48
 * @Description:
 */
import { PubResponseData } from '@/api/user/type'

//已有品牌返回数据ts类型
export interface HashTrademarkItemType {
  createTime?: string
  id?: number
  logoUrl: string
  tmName: string
  updateTime?: string
}

export type HashTrademarkRecords = HashTrademarkItemType[]

interface HashTrademarkDataType {
  countId: number | null
  current: number
  hitCount: boolean
  maxLimit: number | null
  optimizeCountSql: boolean
  orders: any[]
  pages: number
  records: HashTrademarkRecords
  searchCount: boolean
  size: number
  total: number
}
export interface HashTrademarkResponseData extends PubResponseData {
  data: HashTrademarkDataType
}
