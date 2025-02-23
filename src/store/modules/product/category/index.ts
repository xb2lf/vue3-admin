// 商品分类仓库
import { defineStore } from 'pinia'
import type { CategoryState } from './type'
import {
  reqFirstCategory,
  reqSecondCategory,
  reqThirdCategory,
} from '@/api/product/attr'
import type {
  CategoryResponseData,
  CategoryDataType,
} from '@/api/product/attr/type'

const useCategoryStore = defineStore('CategoryStore', {
  state: (): CategoryState => {
    return {
      // 一级分类选择器配置
      firstCategoryId: undefined,
      firstCategoryList: [],
      // 二级分类选择器配置
      secondCategoryId: undefined,
      secondCategoryList: [],
      // 三级分类选择器配置
      thirdCategoryId: undefined,
      thirdCategoryList: [],
    }
  },
  actions: {
    // 获取一级分类
    async getFirstCategory() {
      try {
        const res: CategoryResponseData = await reqFirstCategory()
        if (res.code !== 200) return
        this.firstCategoryList = res.data || []
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },
    // 获取二级分类
    async getSecondCategory(id: number) {
      try {
        const res: CategoryResponseData = await reqSecondCategory(id)
        if (res.code !== 200) return
        this.secondCategoryList = res.data || []
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },
    // 获取三级分类
    async getThirdCategory(id: number) {
      try {
        const res: CategoryResponseData = await reqThirdCategory(id)
        if (res.code !== 200) return
        this.thirdCategoryList = res.data || []
      } catch (error) {
        ElMessage.error((error as Error).message)
      }
    },
    //更新一级分类选择的值
    updateFirstCategoryId(val: number) {
      this.firstCategoryId = val
    },
    updateFirstCategoryList(list: CategoryDataType) {
      this.firstCategoryList = list
    },
    //更新二级分类选择的值
    updateSecondCategoryId(val?: number | undefined) {
      this.secondCategoryId = val
    },
    updateSecondCategoryList(list: CategoryDataType) {
      this.secondCategoryList = list
    },
    //更新三级分类选择的值
    updateThirdCategoryId(val?: number | undefined) {
      this.thirdCategoryId = val
    },
    updateThirdCategoryList(list: CategoryDataType) {
      this.thirdCategoryList = list
    },
  },
  getters: {},
})

export default useCategoryStore
