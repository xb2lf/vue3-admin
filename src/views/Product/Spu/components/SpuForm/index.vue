<template>
  <el-form class="add-or-edit-spu-content" label-width="100px">
    <el-form-item label="SPU名称">
      <el-input v-model="spuParams.spuName" placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId" placeholder="请选择SPU品牌">
        <el-option v-for="(el, i) in allTradeMarkList" :label="el.tmName" :value="el.id" :key="el.id || i"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input v-model="spuParams.description" type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <UploadListComp v-model:fileList="spuImageList" />
    </el-form-item>
    <el-form-item label="SKU销售属性">
      <el-select class="sale-attr-select" :placeholder="unSelectSaleAttr.length
        ? `还未选择${unSelectSaleAttr.length}个`
        : '暂无数据可选择'
        " v-model="saleAttrSelectValue">
        <el-option v-for="(el, i) in unSelectSaleAttr" :key="el.id || i" :label="el.name"
          :value="`${el.id}:${el.name}`"></el-option>
      </el-select>
      <el-button class="add-attr-value-btn" type="primary" size="default" icon="Plus" :disabled="!saleAttrSelectValue"
        @click="handleaddSaleAttr">添加属性</el-button>
      <!-- 展示销售属性与属性值 -->
      <el-table border :data="saleAttrList" class="attr-value-table">
        <el-table-column header-align="center" align="center" type="index" label="序号" width="80px">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="saleAttrName" label="属性名" width="120px">
        </el-table-column>
        <el-table-column label="属性值">
          <template #default="{ row }">
            <el-tag class="attr-value-tag" type="success" closable v-for="(el, i) in row.spuSaleAttrValueList"
              :key="el.id || i" @close="handleTagClose(row, i)">{{ el.saleAttrValueName }}</el-tag>
            <el-input v-if="row.flag" v-model="row.saleAttrValue" size="small" class="sale-attr-value-input"
              @click="handleSaleAttrValueInputBlur(row)"></el-input>
            <el-button v-else type="success" size="small" icon="Plus" @click="handleAddAttrValue(row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="80px">
          <template #default="{ $index }">
            <el-button type="warning" size="small" icon="Delete" @click="handleDeleteSaleAttr($index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" :disabled="!saleAttrList.length" @click="handleSaveSpu">保存</el-button>
      <el-button size="default" @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from "@/api/product/spu";
import type {
  AllTrademarkResponseData,
  SpuImageResponseData,
  SaleAttrResponseData,
  AllSaleAttrResponseData,
  TrademarkDataType,
  SpuImageDataType,
  SaleAttrDataType,
  AllSaleAttrDataType,
  SpuItemType,
  SpuFormType,
  SaleAttr,
} from "@/api/product/spu/type";

const $emit = defineEmits(["cancel"]);

// 全部品牌列表
const allTradeMarkList = ref<TrademarkDataType>([]);
// 已有的SPU商品图片
const spuImageList = ref<SpuImageDataType>([]);
// 已有的SPU销售属性
const saleAttrList = ref<SaleAttrDataType>([]);
// 全部售卖属性
const allSaleAttrList = ref<AllSaleAttrDataType>([]);

// 页面表单所需数据
const spuParams = ref<SpuFormType>({
  spuName: "",
  description: "",
  category3Id: undefined,
  tmId: undefined,
  spuSaleAttrList: [],
  spuImageList: [],
});

// 售卖属性选择器绑定数据
const saleAttrSelectValue = ref<string>("");

// 获取全部品牌的数据
const getAllTrademark = async () => {
  try {
    const res: AllTrademarkResponseData = await reqAllTrademark();
    if (res.code !== 200) return;
    allTradeMarkList.value = res.data || [];
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
};

// 获取某一个品牌旗下全部售卖商品的图片
const getSpuImageList = async (spuId: number) => {
  try {
    const res: SpuImageResponseData = await reqSpuImageList(spuId);
    if (res.code !== 200) return;
    if (res?.data?.length) {
      spuImageList.value = res.data.map((item) => ({
        name: item.imgName,
        url: item.imgUrl,
      }));
    }
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
};

// 获取某一个品牌旗下全部售卖商品的售卖属性
const getSpuSaleAttrList = async (spuId: number) => {
  try {
    const res: SaleAttrResponseData = await reqSpuSaleAttrList(spuId);
    if (res.code !== 200) return;
    saleAttrList.value = res.data || [];
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
};

// 获取全部售卖属性
const getAllSaleAttr = async () => {
  try {
    const res: AllSaleAttrResponseData = await reqAllSaleAttr();
    if (res.code !== 200) return;
    allSaleAttrList.value = res.data || [];
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
};

// 添加spu/编辑spu
const addOrEditSpu = async () => {
  try {
    const res: any = await reqAddOrUpdateSpu(spuParams.value);
    const messageLabel = spuParams.value.id ? '修改' : '添加'
    if (res.code !== 200) {
      ElMessage.error(`${messageLabel}SPU失败`)
      return
    }
    ElMessage.success(`${messageLabel}SPU成功`)
    $emit('cancel', { flag: 0, params: spuParams.value.id ? 'update' : 'add' });
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
}

// 重置表单所需数据
const resetSpuParams = () => {
  const currParamss = {
    spuName: "",
    description: "",
    category3Id: undefined,
    tmId: undefined,
    spuSaleAttrList: [],
    spuImageList: [],
  }
  Object.assign(spuParams.value, currParamss)
}

// 编辑模式-初始化组件内所需数据(spu为父组件传过来的spu数据)
const initHasSpuData = (spu: SpuItemType) => {
  // 存储已有的SPU对象，初始化后展示
  spuParams.value = spu;
  const { id } = spu;
  getAllTrademark();
  getSpuImageList(id as number);
  getSpuSaleAttrList(id as number);
  getAllSaleAttr();
};

// 新增模式-初始化组件内所需数据
const initAddSpuData = (category3Id: number) => {
  // 重置参数
  resetSpuParams()
  spuImageList.value = []
  saleAttrList.value = []
  saleAttrSelectValue.value = ''
  spuParams.value.category3Id = category3Id
  getAllTrademark();
  getAllSaleAttr();
}

// 添加销售属性
const handleaddSaleAttr = () => {
  const [id, name] = saleAttrSelectValue.value.split(":");
  const attrInfo = {
    baseSaleAttrId: Number(id),
    saleAttrName: name,
    spuSaleAttrValueList: [],
  };
  saleAttrList.value.push(attrInfo);
  saleAttrSelectValue.value = "";
};

// 删除销售属性
const handleDeleteSaleAttr = (index: number) => {
  saleAttrList.value.splice(index, 1);
};

// 添加属性值
const handleAddAttrValue = (row: SaleAttr) => {
  row.flag = true;
  row.saleAttrValue = "";
};

// 销售属性值输入框失焦事件
const handleSaleAttrValueInputBlur = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row;
  // 为空处理
  if ((saleAttrValue as string).trim() === "") {
    ElMessage.warning("属性值不能为空");
    return;
  }
  // 重复处理
  const repeat = row.spuSaleAttrValueList.find(
    (el) => el.saleAttrValueName === saleAttrValue
  );
  if (repeat) {
    ElMessage.warning("属性值不能重复");
    return;
  }

  const saleAttrValueInfo = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  };
  row.spuSaleAttrValueList.push(saleAttrValueInfo);
  row.flag = false;
  row.saleAttrValue = "";
};

// 删除属性值
const handleTagClose = (row: SaleAttr, index: number) => {
  row.spuSaleAttrValueList.splice(index, 1)
}

// 保存SPU
const handleSaveSpu = () => {
  // 整理参数
  spuParams.value.spuImageList = spuImageList.value.map((item) => ({ imgName: item.name, imgUrl: item.url }))
  spuParams.value.spuSaleAttrList = saleAttrList.value
  addOrEditSpu();
}

// 取消添加SPU/编辑SPU
const handleCancel = () => {
  $emit('cancel', { flag: 0, params: 'none' });
};

// 计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  //全部销售属性：颜色、版本、尺码
  const unSelectArr = allSaleAttrList.value.filter((item) => {
    return saleAttrList.value.every((el) => item.name !== el.saleAttrName);
  });

  return unSelectArr;
});

// 对外暴露
defineExpose({
  // 新增时初始方法
  initAddSpuData,
  // 编辑时初始方法
  initHasSpuData,
});
</script>

<style lang="scss" scoped>
.add-or-edit-spu-content {
  width: 100%;
  height: 100%;

  .sale-attr-select {
    width: 200px;
  }

  .add-attr-value-btn {
    margin-left: 10px;
  }

  .attr-value-table {
    margin: 10px 0;

    .attr-value-tag {
      margin: 5px 0;
    }

    .sale-attr-value-input {
      width: 100px;
    }
  }
}
</style>
