<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 16:51:15
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-21 16:06:31
 * @Description: 
-->
<template>
  <el-card class="sku-container">
    <el-table border stripe :data="skuList" row-key="id">
      <el-table-column header-align="center" align="center" type="index" :index="customIndex" label="序号" width="120px">
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="skuName" label="名称" show-overflow-tooltip
        width="240px"></el-table-column>
      <el-table-column header-align="center" align="center" prop="skuDesc" label="描述" show-overflow-tooltip
        width="240px"></el-table-column>
      <el-table-column header-align="center" align="center" prop="skuDefaultImg" label="默认图片" width="200px">
        <template #default="{ row }">
          <img :src="row.skuDefaultImg" class="sku-img" alt="sku图片">
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="weight" label="重量" width="200px"></el-table-column>
      <el-table-column header-align="center" align="center" prop="price" label="价格" width="200px"></el-table-column>
      <el-table-column fixed="right" label="操作" width="400px">
        <template #default="{ row }">
          <!-- 上架/下架 -->
          <el-button v-if="row.isSale === 1" type="info" size="small" icon="Bottom"
            @click="handleSkuCancelSale(row.id)"></el-button>
          <el-button v-else type="success" size="small" icon="Top" @click="handleSkuOnSale(row.id)"></el-button>
          <!-- 编辑SKU -->
          <el-button type="warning" size="small" icon="Edit" title="修改SKU" @click="handleEditSku(row)"></el-button>
          <!-- 查看SKU -->
          <el-button type="info" size="small" icon="InfoFilled" title="查看SKU"
            @click="handleViewSkuInfo(row.id)"></el-button>
          <!-- 删除SKU -->
          <PopconfirmComp :width="220" :title="`您确定要删除${row.skuName}吗？`" @handleConfirm="handleConfirmDelSku(row.id)">
            <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
          </PopconfirmComp>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="paginationConfig.currentPage" v-model:page-size="paginationConfig.pageSize"
      :page-sizes="paginationConfig.pageSizes" :size="paginationConfig.size" :background="paginationConfig.background"
      :total="paginationConfig.total" :layout="paginationConfig.layout"
      :hide-on-single-page="paginationConfig.hideOnSinglePage" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    <!-- 展示商品详情 -->
    <el-drawer v-model="isShowDrawer" direction="rtl" :size="500">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row :gutter="20" justify="space-between" class="sku-info-item">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row :gutter="20" justify="space-between" class="sku-info-item">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row :gutter="20" justify="space-between" class="sku-info-item">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row :gutter="20" justify="space-between" class="sku-attr-item">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag type="danger" class="sku-attr-tag" v-for="(el, i) in skuInfo.skuAttrValueList" :key="el.id || i">{{
              el.valueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20" justify="space-between" class="sku-attr-item">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag type="success" class="sku-attr-tag" v-for="(el, i) in skuInfo.skuSaleAttrValueList"
              :key="el.id || i">{{ el.saleAttrValueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20" justify="space-between" class="sku-info-item">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel height="200px" type="card" motion-blur indicator-position="outside" autoplay loop
              :interval="3000">
              <el-carousel-item v-for="(item, index) in skuInfo.skuImageList" :key="item.id || index">
                <img class="sku-carousel-img" :src="item.imgUrl" alt="商品图片">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { PaginationConfigType } from "./type";
import { reqSkuList, reqOnSaleSku, reqCancelSaleSku, reqSkuInfoById, reqDeleteSku } from '@/api/product/sku';
import type { SkuListType, SkuResponseData, SkuItemType, SkuInfoResponseData } from '@/api/product/sku/type';

// sku列表
const skuList = ref<SkuListType>([])

// 分页器配置
const paginationConfig = reactive<PaginationConfigType>({
  currentPage: 1,
  pageSize: 10,
  pageSizes: [5, 10, 20, 50, 100],
  total: 0,
  size: "default",
  background: true,
  layout: "prev, pager, next, jumper,->,sizes,total",
  hideOnSinglePage: true,
});

// 商品信息
const skuInfo = ref<SkuItemType>({
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuImageList: []
})

// 显示/隐藏商品信息
const isShowDrawer = ref(false)

// 获取sku列表数据
const getSkuList = async () => {
  try {
    const res: SkuResponseData = await reqSkuList(paginationConfig.currentPage, paginationConfig.pageSize)
    if (res.code !== 200) return
    paginationConfig.total = res.data.total || 0
    skuList.value = res.data.records || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// sku上架
const skuOnSale = async (skuId: number) => {
  try {
    const res: any = await reqOnSaleSku(skuId)
    if (res.code !== 200) {
      ElMessage.error('商品上架失败')
      return
    }
    ElMessage.success('商品上架成功')
    getSkuList()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// sku下架
const skuCancelSale = async (skuId: number) => {
  try {
    const res: any = await reqCancelSaleSku(skuId)
    if (res.code !== 200) {
      ElMessage.error('商品下架失败')
      return
    }
    ElMessage.success('商品下架成功')
    getSkuList()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 获取sky信息
const getSkuInfo = async (skuId: number, callback?: () => void) => {
  try {
    const res: SkuInfoResponseData = await reqSkuInfoById(skuId)
    if (res.code !== 200) {
      ElMessage.error('获取商品信息失败')
      return
    }
    skuInfo.value = res.data
    callback && callback()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 删除sku
const deleteSku = async (skuId: number) => {
  try {
    const res: any = await reqDeleteSku(skuId)
    if (res.code !== 200) {
      ElMessage.error('商品删除失败')
      return
    }
    ElMessage.success('商品删除成功')
    paginationConfig.currentPage = skuList.value.length > 1 ? paginationConfig.currentPage : (paginationConfig.currentPage - 1)
    getSkuList()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 自定义计算表格序号函数(跨页)
const customIndex = (index: number) => {
  return (paginationConfig.currentPage - 1) * paginationConfig.pageSize + index + 1;
};

// 商品SKU上架
const handleSkuOnSale = (skuId: number) => {
  skuOnSale(skuId)
}

// 商品SKU下架
const handleSkuCancelSale = (skuId: number) => {
  skuCancelSale(skuId)
}

// 编辑SKU
const handleEditSku = (row: SkuItemType) => {
  console.log(row)
  ElMessage.success('该模块正在努力地研发中...')
}

// 显示SKU信息抽屉
const showSkuInfoDrawer = () => {
  isShowDrawer.value = true
}

// 查看SKU信息
const handleViewSkuInfo = (skuId: number) => {
  getSkuInfo(skuId, showSkuInfoDrawer)
}

// 删除SKU
const handleConfirmDelSku = (skuId: number) => {
  deleteSku(skuId)
}

// 每页条数发生变化
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  paginationConfig.currentPage = 1;
  getSkuList()
};

// 页数发生变化
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  getSkuList()
};

onMounted(() => {
  getSkuList()
})
</script>

<style lang="scss" scoped>
.sku-container {
  width: 100%;

  .sku-img {
    width: 100px;
    height: 100px;
  }

  .sku-info-item {
    margin-bottom: 20px;

    .sku-carousel-img {
      width: 100%;
      height: 100%;
    }
  }

  .sku-attr-item {
    margin-bottom: 10px;

    .sku-attr-tag {
      margin-right: 10px;
      margin-bottom: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
