<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 16:49:50
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-21 03:05:59
 * @Description: 
-->
<template>
  <div class="attr-container">
    <Category :scene="scene"></Category>
    <el-card class="category-attr-container">
      <!-- 三级具体分类对应属性列表 -->
      <div v-show="scene === 0" class="category-attr-content">
        <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.thirdCategoryId"
          class="add-attr-btn" @click="handleAddAttr">添加属性</el-button>
        <el-table border :data="attrInfoTableData" row-key="id">
          <el-table-column width="80px" header-align="center" align="center" type="index" label="序号"></el-table-column>
          <el-table-column width="120px" header-align="center" align="center" label="属性名称"
            prop="attrName"></el-table-column>
          <el-table-column header-align="center" align="center" label="属性值名称">
            <template #default="{ row }">
              <el-tag type="success" v-for="(item, index) in row.attrValueList" :key="item.id || index"
                class="attr-value-tag">{{ item.valueName
                }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="120px" header-align="center" align="center" label="操作">
            <template #default="{ row }">
              <!-- 编辑属性 -->
              <el-button type="warning" size="small" icon="Edit" @click="handleEditAttr(row)"></el-button>
              <!-- 删除属性 -->
              <PopconfirmComp :width="220" :title="`您确定要删除${row.attrName}吗？`" @handleConfirm="handleRemoveAttr(row.id)">
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </PopconfirmComp>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 具体属性对应属性值列表 -->
      <div v-show="scene === 1" class="add-or-edit-attr-content">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input v-model="attrParams.attrName" placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus" :disabled="!attrParams.attrName"
          @click="handleAddAttrValue">添加属性值</el-button>
        <el-button type="primary" size="default" plain @click="handleCancel">取消</el-button>
        <el-table border :data="attrParams.attrValueList" class="attr-value-table">
          <el-table-column type="index" label="序号" width="80px" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="valueName" label="属性值" header-align="center" align="center">
            <template #default="{ row, $index }">
              <el-input :ref="(instance: any) => valueNameInputRefList[$index] = instance" v-if="row.flag"
                v-model="row.valueName" placeholder="请输入属性值" size="small"
                @blur="handleValueNameBlur(row, $index)"></el-input>
              <div v-else class="value-name-tag" @click="handleToggleValueNameEdit(row, $index)">{{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" header-align="center">
            <template #default="{ row, $index }">
              <!-- 删除属性值 -->
              <el-button type="danger" size="small" icon="Delete" @click="handleRemoveAttrValue($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" :disabled="!attrParams.attrValueList.length"
          @click="handleSaveAttr">保存</el-button>
        <el-button type="primary" size="default" plain @click="handleCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, nextTick, onBeforeMount } from "vue";
import useCategoryStore from '@/store/modules/product/category'
import { reqAttrInfoList, reqAddorUpdateArr, reqDeleteArr } from "@/api/product/attr";
import type { AttrDataType, AttrInfoResponseData, AttrItemType, AttrValueItemType } from "@/api/product/attr/type";

// 获取分类仓库实例
const categoryStore = useCategoryStore()

// 表格数据
const attrInfoTableData = ref<AttrDataType>([]);

// 定义卡片组件内容切换
const scene = ref<number>(0) // 0-显示table 1-显示添加属性/修改属性内容

//收集新增或者修改属性的数据
const attrParams = reactive<AttrItemType>({
  id: undefined,
  attrName: '',
  attrValueList: [],
  categoryId: undefined,
  categoryLevel: 3,
})

// 存储属性值table中input组件实例集合
const valueNameInputRefList = ref<any>([])

// 获取分类值对应属性信息列表
const getAttrInfoList = async () => {
  try {
    const { firstCategoryId, secondCategoryId, thirdCategoryId } = categoryStore
    const res: AttrInfoResponseData = await reqAttrInfoList(firstCategoryId as number, secondCategoryId as number, thirdCategoryId as number)
    if (res.code !== 200) return
    attrInfoTableData.value = res.data || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 添加或者修改属性
const addOrUpdateArr = async () => {
  try {
    const res: any = await reqAddorUpdateArr(attrParams)
    const msgLabel = attrParams.id ? '修改属性' : '添加属性'
    if (res.code !== 200) return ElMessage.error(`${msgLabel}失败`)
    scene.value = 0
    ElMessage.success(`${msgLabel}成功`)
    // 添加修改后重新请求属性列表
    getAttrInfoList()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}

// 删除属性
const deleteAttr = async (id: number) => {
  try {
    const res: any = await reqDeleteArr(id)
    if (res.code !== 200) return ElMessage.error('删除属性失败')
    ElMessage.success('删除属性成功')
    // 删除后重新请求属性列表
    getAttrInfoList()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}



// 更新编辑属性所需数据
const updateAttrParams = (row: AttrItemType) => {
  // 此处需要进行深拷贝，本地操作在未提交服务器之前，不能影响原先的数据展示
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// 清空添加属性/编辑属性所需数据
const claerAttrParams = () => {
  const currAttrParams = {
    id: undefined,
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.thirdCategoryId,
    categoryLevel: 3,
  }
  Object.assign(attrParams, currAttrParams)
}

// 添加属性
const handleAddAttr = () => {
  claerAttrParams()
  scene.value = 1;
}

// 编辑属性
const handleEditAttr = (row: AttrItemType) => {
  updateAttrParams(row)
  scene.value = 1;
}

// 取消添加属性值/取消添加/编辑属性
const handleCancel = () => {
  scene.value = 0
}

// 删除属性
const handleRemoveAttr = (id: number) => {
  deleteAttr(id)
}

// 添加属性值
const handleAddAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, // 控制属性值名称查看模式和编辑模式的切换
  })

  // 获取最后的属性值input组件实例进行自动聚焦
  nextTick(() => {
    valueNameInputRefList.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 删除属性值
const handleRemoveAttrValue = (index: number) => {
  attrParams.attrValueList.splice(index, 1)
}

// 属性值名称输入框blur事件(属性值名称切换为查看模式)
const handleValueNameBlur = (row: AttrValueItemType, index: number) => {
  // 非法情况1
  if (row.valueName.trim() === '') {
    // 删除本项(对应值属性为空)
    attrParams.attrValueList.splice(index, 1)
    ElMessage.error('属性值不能为空')
    return
  }
  // 非法情况2
  const repeat = attrParams.attrValueList.find((item) => {
    // 必须把当前项从当前数组中排除出去，然后再进行对比是否有重复项
    if (row != item) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    // 将重复的属性值从数组中删除
    attrParams.attrValueList.splice(index, 1)
    ElMessage.error('属性值不能重复')
    return
  }
  row.flag = false
}

// 属性值名称切换为编辑模式
const handleToggleValueNameEdit = (row: AttrValueItemType, index: number) => {
  row.flag = true
  nextTick(() => {
    // 数组值input组件重新渲染后自动聚焦
    valueNameInputRefList.value[index].focus()
  })
}

// 保存属性
const handleSaveAttr = () => {
  addOrUpdateArr()
}

watch(() => categoryStore.thirdCategoryId, () => {
  attrInfoTableData.value = []
  if (!categoryStore.thirdCategoryId) return
  getAttrInfoList()
})

// 在路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeMount(() => {
  // 重置分类仓库
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped>
.attr-container {
  width: 100%;
  height: 100%;

  .category-attr-container {
    width: 100%;
    margin-top: 10px;

    :deep(.el-card__body) {
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      .category-attr-content {
        width: 100%;
        height: 100%;

        .add-attr-btn {
          margin-bottom: 10px;
        }

        .attr-value-tag {
          margin: 5px;
        }
      }

      .add-or-edit-attr-content {
        width: 100%;
        height: 100%;

        .attr-value-table {
          margin: 10px 0;

          .value-name-tag {
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to right green skyblue purple red);
          }
        }
      }
    }
  }
}
</style>
