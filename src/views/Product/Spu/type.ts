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
