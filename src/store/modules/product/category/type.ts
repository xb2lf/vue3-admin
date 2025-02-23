import type { CategoryDataType } from '@/api/product/attr/type'

export interface CategoryState {
  firstCategoryId: number | undefined
  firstCategoryList: CategoryDataType
  secondCategoryId: number | undefined
  secondCategoryList: CategoryDataType
  thirdCategoryId: number | undefined
  thirdCategoryList: CategoryDataType
}
