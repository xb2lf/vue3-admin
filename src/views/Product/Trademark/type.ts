/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-19 01:27:58
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-19 11:12:09
 * @Description:
 */
import type { ComponentSize } from 'element-plus'

export interface PaginationConfigType {
  currentPage: number
  pageSize: number
  pageSizes: number[]
  total: number
  size: ComponentSize
  background: boolean
  layout: string
  hideOnSinglePage: boolean
}

export interface TrademarkDialogConfigType {
  dialogVisible: boolean
  title: '添加品牌' | '编辑品牌'
  [key: string]: boolean | string // 定义索引签名
}
