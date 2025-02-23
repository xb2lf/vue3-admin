<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-20 10:33:28
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-21 16:15:27
 * @Description:
-->
<template>
  <el-form class="add-or-edit-sku-content" label-width="80px">
    <el-form-item label="sku名称">
      <el-input v-model="addOrEditSkuForm.skuName" placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="addOrEditSkuForm.price" type="number" placeholder="价格(元)"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input v-model="addOrEditSkuForm.weight" type="number" placeholder="重量(克)"></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input v-model="addOrEditSkuForm.skuDesc" type="textarea" placeholder="sku描述"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item v-for="(item, index) in platformAttrList" :label="item.attrName" :key="item.id || index">
          <el-select v-model="item.attrIdAndValueId" class="platform-attr-select" placeholder="请选择">
            <el-option v-for="(el, i) in item.attrValueList" :label="el.valueName"
              :value="`${item.id}:${(el.id as number)}`" :key="el.id || i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item v-for="(item, index) in saleAttrList" :label="item.saleAttrName" :key="item.id || index">
          <el-select v-model="item.saleIdAndValueId" class="sale-attr-select" placeholder="请选择">
            <el-option v-for="(el, i) in item.spuSaleAttrValueList" :label="el.saleAttrValueName"
              :value="`${item.id}:${(el.id as number)}`" :key="el.id || i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imageList" row-key="id" @select="handleTableSelect">
        <el-table-column type="selection" :selectable="selectable" header-align="center" align="center" width="80px">
        </el-table-column>
        <el-table-column prop="imgUrl" label="图片">
          <template #default="{ row }">
            <img class="sku-img" :src="row.imgUrl" alt="sku图片">
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button v-if="addOrEditSkuForm.skuDefaultImg === row.imgUrl" type="success" size="small">默认图片</el-button>
            <el-button v-else type="warning" size="small" @click="handleSettingDefaultImg(row)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="handleSaveSku">保存</el-button>
      <el-button size="default" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqAttrInfoList } from '@/api/product/attr'
import type { AttrDataType, AttrInfoResponseData, AttrItemType } from '@/api/product/attr/type'
import { reqSpuSaleAttrList, reqSpuImageList, reqAddSku } from '@/api/product/spu'
import type { SaleAttrDataType, SaleAttrResponseData, SpuImageDataType, SpuImageResponseData, SpuImage, SpuItemType, SkuFormType, SaleAttr } from '@/api/product/spu/type'

const $emit = defineEmits(['cancel'])

// 平台属性
const platformAttrList = ref<AttrDataType>([]);

// 销售属性
const saleAttrList = ref<SaleAttrDataType>([]);

// 商品图片列表
const imageList = ref<SpuImageDataType>([]);

// 添加sku/修改sku表单所需数据
const addOrEditSkuForm = reactive<SkuFormType>({
  category3Id: 0,
  spuId: 0,
  tmId: 0,
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: []
})

// 获取平台属性列表
const getPlatformAttrList = async (firstId: number, secondId: number, thirdId: number) => {
  try {
    const res: AttrInfoResponseData = await reqAttrInfoList(firstId as number, secondId as number, thirdId as number)
    if (res.code !== 200) return
    platformAttrList.value = res.data || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 获取销售属性列表
const getSaleAttrList = async (spuId: number) => {
  try {
    const res: SaleAttrResponseData = await reqSpuSaleAttrList(spuId)
    if (res.code !== 200) return
    saleAttrList.value = res.data || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 获取商品图片列表
const getImageList = async (spuId: number) => {
  try {
    const res: SpuImageResponseData = await reqSpuImageList(spuId)
    if (res.code !== 200) return
    if (res?.data?.length) {
      imageList.value = res.data || []
    }
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
};

// 添加sku
const addSku = async () => {
  try {
    const res: any = await reqAddSku(addOrEditSkuForm);
    if (res.code !== 200) {
      ElMessage.error('添加SKU失败')
      return
    }
    ElMessage.success('添加SKU成功')
    $emit('cancel', { flag: 0, params: 'none' })
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
}

// 商品图片列表是否勾选
const selectable = (row: SpuImage, index: number) => row.imgUrl === addOrEditSkuForm.skuDefaultImg

// 重置表单数据
const resetFormData = () => {
  const currFormData = {
    category3Id: 0,
    spuId: 0,
    tmId: 0,
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuDefaultImg: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: []
  }
  Object.assign(addOrEditSkuForm, currFormData)
}

// 添加sku页面数据初始化
const initAddSkuData = (firstId: number, secondId: number, thirdId: number, row: SpuItemType) => {
  // 重置表单数据
  resetFormData()
  const { id, category3Id, tmId } = row;
  // 初始化部分参数
  addOrEditSkuForm.category3Id = category3Id
  addOrEditSkuForm.spuId = id as number
  addOrEditSkuForm.tmId = tmId
  getPlatformAttrList(firstId, secondId, thirdId)
  getImageList(id as number);
  getSaleAttrList(id as number)
}
// 设置sku默认图片
const handleSettingDefaultImg = (row: SpuImage) => {
  addOrEditSkuForm.skuDefaultImg = row.imgUrl as string
}

// 当用户手动勾选数据行的 Checkbox 时触发的事件
const handleTableSelect = (selection: any, row: SpuImage) => {
  addOrEditSkuForm.skuDefaultImg = row.imgUrl as string
}

// 整理平台属性和销售属性
const initPlatformAttrAndSaleAttr = () => {
  // 整理平台属性
  const attrList = platformAttrList.value.reduce((prev: any[], next: AttrItemType) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, []);
  addOrEditSkuForm.skuAttrValueList = attrList
  // 整理销售属性
  const saleAttrData = saleAttrList.value.reduce((prev: any[], next: SaleAttr) => {
    if (next.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({ saleAttrId, saleAttrValueId })
    }
    return prev
  }, []);
  addOrEditSkuForm.skuSaleAttrValueList = saleAttrData
}

// 保存sku
const handleSaveSku = () => {
  // 整理参数
  initPlatformAttrAndSaleAttr()
  // 提交接口
  addSku()
}

// 取消添加SKU/修改SKU
const handleCancel = () => {
  $emit('cancel', { flag: 0, params: 'none' })
}

// 对外暴露
defineExpose({
  initAddSkuData
})
</script>

<style lang="scss" scoped>
.add-or-edit-sku-content {
  width: 100%;
  height: 100%;

  .platform-attr-select {
    width: 200px;
    margin-bottom: 10px;
  }

  .sale-attr-select {
    width: 200px;
  }

  .sku-img {
    width: 80px;
    height: 80px;
  }
}
</style>