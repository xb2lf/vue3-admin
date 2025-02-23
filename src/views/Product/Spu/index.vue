<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 16:52:36
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-21 03:14:38
 * @Description: 
-->
<template>
  <div class="spu-container">
    <Category :scene="scene"></Category>
    <el-card class="spu-card-content">
      <!-- 已有SPU -->
      <div v-show="scene === 0" class="spu-list-content">
        <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.thirdCategoryId"
          class="add-spu-btn" @click="handleAddSpu">添加SPU</el-button>
        <el-table border :data="hasSpuData" class="spu-table-content">
          <el-table-column width="80px" header-align="center" align="center" type="index" :index="customIndex"
            label="序号">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称"></el-table-column>
          <el-table-column prop="description" label="SPU描述" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <!-- 添加Sku -->
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="handleAddSku(row)"></el-button>
              <!-- 编辑SPU -->
              <el-button type="warning" size="small" icon="Edit" title="修改SPU" @click="handleEditSpu(row)"></el-button>
              <!-- 查看SKU -->
              <el-button type="info" size="small" icon="InfoFilled" title="查看SKU"
                @click="handleViewSkuInfo(row)"></el-button>
              <!-- 删除SPU -->
              <PopconfirmComp :width="220" :title="`您确定要删除${row.spuName}吗？`" @handleConfirm="handleDeleteSpu(row.id)">
                <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
              </PopconfirmComp>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="paginationConfig.currentPage" v-model:page-size="paginationConfig.pageSize"
          :page-sizes="paginationConfig.pageSizes" :size="paginationConfig.size"
          :background="paginationConfig.background" :total="paginationConfig.total" :layout="paginationConfig.layout"
          :hide-on-single-page="paginationConfig.hideOnSinglePage" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
      <!-- 添加编辑SPU -->
      <SpuForm v-show="scene === 1" ref="spuFormRef" @cancel="updateScene"></SpuForm>
      <!-- 添加编辑SKU -->
      <SkuForm v-show="scene === 2" ref="skuFormRef" @cancel="updateScene"></SkuForm>
    </el-card>
    <el-dialog v-model="dialogVisible" title="SKU列表" :close-on-click-modal="false" :close-on-press-escape="false"
      width="500">
      <el-table border :data="skuInfoList" height="600" class="sku-info-table">
        <el-table-column header-align="center" align="center" prop="skuName" label="sku名字">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="price" label="sku价格" show-overflow-tooltip>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="weight" label="sku重量">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="skuDefaultImg" label="sku图片">
          <template #default="{ row }">
            <img :src="row.skuDefaultImg" class="sku-img" alt="sku图片">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onBeforeMount } from 'vue'
import SpuForm from './components/SpuForm/index.vue'
import SkuForm from './components/SkuForm/index.vue'
import useCategoryStore from '@/store/modules/product/category';
import type { PaginationConfigType } from "./type";
import { reqHasSpu, reqDeleteSpu, reqSkuInfo } from '@/api/product/spu';
import type { HashSpuResponseData, SpuRecordsType, SpuItemType, SkuInfoData, SkuInfoResponseData } from '@/api/product/spu/type';

// 获取分类仓库
const categoryStore = useCategoryStore()

// 定义卡片组件内容切换
const scene = ref<number>(0) // 0-显示已有spu 1-显示添加spu/修改spu 2-显示添加sku

//三级分类对应的已有spu的table数据
const hasSpuData = ref<SpuRecordsType>([])

// 添加spu/编辑spu实例ref
const spuFormRef = ref()

// 添加sku/编辑sku实例ref
const skuFormRef = ref()

// sku信息列表
const skuInfoList = ref<SkuInfoData>([])

// 分页器配置
const paginationConfig = reactive<PaginationConfigType>({
  currentPage: 1,
  pageSize: 3,
  pageSizes: [3, 5, 10, 20, 50],
  total: 0,
  size: "default",
  background: true,
  layout: "prev, pager, next, jumper,->,sizes,total",
  hideOnSinglePage: true,
});

// dialog配置
const dialogVisible = ref(false)

// 获取三级分类所对应的Spu列表
const getHasSpuData = async () => {
  try {
    const { thirdCategoryId } = categoryStore
    const res: HashSpuResponseData = await reqHasSpu(paginationConfig.currentPage, paginationConfig.pageSize, thirdCategoryId as number)
    if (res.code !== 200) return
    paginationConfig.total = res.data.total || 0
    hasSpuData.value = res.data.records || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 获取sku信息列表
const getSkuInfoList = async (spuId: number) => {
  try {
    const res: SkuInfoResponseData = await reqSkuInfo(spuId)
    if (res.code !== 200) return
    skuInfoList.value = res.data || []
    dialogVisible.value = true
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 删除spu
const deleteSpu = async (spuId: number) => {
  try {
    const res: any = await reqDeleteSpu(spuId)
    if (res.code !== 200) {
      ElMessage.error('删除SPU失败')
      return
    }
    ElMessage.success('删除SPU成功')
    paginationConfig.currentPage = hasSpuData.value.length > 1 ? paginationConfig.currentPage : (paginationConfig.currentPage - 1)
    getHasSpuData()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 自定义计算表格序号函数(跨页)
const customIndex = (index: number) => {
  return (paginationConfig.currentPage - 1) * paginationConfig.pageSize + index + 1;
};

// 添加SPU
const handleAddSpu = () => {
  scene.value = 1
  //调用子组件实例初始化表单所需数据
  spuFormRef.value.initAddSpuData(categoryStore.thirdCategoryId)
}

// 编辑SPU
const handleEditSpu = (row: SpuItemType) => {
  scene.value = 1
  //调用子组件实例获取完整已有的SPU的数据
  spuFormRef.value.initHasSpuData(row)
}

// 添加sku
const handleAddSku = (row: SpuItemType) => {
  scene.value = 2
  // 调用子组件实例初始化表单所需数据
  skuFormRef.value.initAddSkuData(categoryStore.firstCategoryId, categoryStore.secondCategoryId, categoryStore.thirdCategoryId, row)
}

// 查看sku信息
const handleViewSkuInfo = (row: SpuItemType) => {
  const { id } = row
  getSkuInfoList(id as number)
}

// 删除SPU
const handleDeleteSpu = (spuId: number) => {
  deleteSpu(spuId);
}

// 控制场景的切换
const updateScene = ({ flag, params }: { flag: 0 | 1 | 2, params: 'add' | 'update' | 'none' }) => {
  scene.value = flag
  if (params === 'none') return
  paginationConfig.currentPage = params === 'add' ? 1 : paginationConfig.currentPage
  flag === 0 && getHasSpuData()
}

// 每页条数发生变化
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  paginationConfig.currentPage = 1;
  getHasSpuData()
};

// 页数发生变化
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  getHasSpuData()
};

watch(() => categoryStore.thirdCategoryId, () => {
  hasSpuData.value = []
  if (!categoryStore.thirdCategoryId) return
  getHasSpuData()
})

onBeforeMount(() => {
  // 重置分类仓库
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped>
.spu-container {
  width: 100%;
  height: 100%;

  .spu-card-content {
    width: 100%;
    margin-top: 10px;

    :deep(.el-card__body) {
      width: 100%;
      height: 100%;

      .spu-list-content {
        width: 100%;
        height: 100%;

        .add-spu-btn {
          margin-bottom: 10px;
        }

        .spu-table-content {
          margin: 10px 0;
        }
      }
    }
  }

  .sku-info-table {
    width: 100%;
    max-width: 100%;
    max-height: 600px;

    .sku-img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
