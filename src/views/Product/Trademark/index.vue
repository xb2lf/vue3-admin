<!--
 * @Author: {baixiao}
 * @version: 
 * @Date: 2025-02-18 16:45:38
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-23 21:51:05
 * @Description: 
-->
<template>
  <div>
    <el-card class="trademark-container">
      <el-button type="primary" size="default" icon="Plus" class="add-btn" v-has="'btn.Trademark.add'"
        @click="handleAddTrademark">添加品牌</el-button>
      <el-table border :data="trademarkTableData" row-key="id" class="trademark-table">
        <el-table-column width="80px" header-align="center" align="center" type="index" :index="customIndex" label="序号">
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="tmName" label="品牌名称">
        </el-table-column>
        <el-table-column header-align="center" align="center" label="品牌LOGO">
          <template #default="{ row }">
            <img :src="row.logoUrl" alt="品牌图片" class="trademark-logo-img" />
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="品牌操作">
          <template #default="{ row }">
            <!-- 编辑品牌 -->
            <el-button type="warning" size="small" icon="Edit" @click="handleEditTrademark(row)"></el-button>
            <!-- 删除品牌 -->
            <PopconfirmComp :width="220" :title="`您确定要删除${row.tmName}吗？`"
              @handleConfirm="handleRemoveTrademark(row.id)">
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </PopconfirmComp>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="paginationConfig.currentPage" v-model:page-size="paginationConfig.pageSize"
        :page-sizes="paginationConfig.pageSizes" :size="paginationConfig.size" :background="paginationConfig.background"
        :total="paginationConfig.total" :layout="paginationConfig.layout"
        :hide-on-single-page="paginationConfig.hideOnSinglePage" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </el-card>
    <!-- 添加或编辑品牌弹窗 -->
    <el-dialog v-model="trademarkDialogConfig.dialogVisible" :title="trademarkDialogConfig.title"
      :close-on-click-modal="false" :close-on-press-escape="false" @close="handleTrademarkDailogCancel">
      <el-form ref="trademarkFormRef" :model="trademarkForm" :rules="trademarkFormRules" label-width="100px"
        class="trademark-form">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkForm.tmName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <UploadComp v-model="trademarkForm.logoUrl" v-model:localUrl="trademarkLocalUrl"
            @successCallback="uploadSuccessCallback" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleTrademarkDailogCancel">取消</el-button>
          <el-button type="primary" @click="handleTrademarkDailogConfirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { PaginationConfigType, TrademarkDialogConfigType } from "./type";
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqRemoveTrademark,
} from "@/api/product/trademark";
import type {
  HashTrademarkRecords,
  HashTrademarkResponseData,
  HashTrademarkItemType,
} from "@/api/product/trademark/type";

// 表格数据
const trademarkTableData = ref<HashTrademarkRecords>([]);

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

// 添加品牌/编辑品牌弹窗配置
const trademarkDialogConfig = reactive<TrademarkDialogConfigType>({
  dialogVisible: false,
  title: "添加品牌",
});

// 添加品牌/编辑品牌弹窗内容
const trademarkFormRef = ref();
const trademarkForm = reactive<HashTrademarkItemType>({
  id: undefined,
  tmName: "",
  logoUrl: "",
});
// 上传图片本地Url(用来展示图片)
const trademarkLocalUrl = ref("");

// 自定义品牌名称校验规则
const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error("品牌名称位数大于等于两位"));
  }
};

// 自定义品牌logo校验规则
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error("请上传品牌Logo"));
  }
};

// 添加/编辑品牌表单校验规则
const trademarkFormRules = {
  tmName: [
    { required: true, message: "请输入品牌名称", trigger: "blur" },
    { trigger: "blur", validator: validatorTmName },
  ],
  logoUrl: [
    /* { required: true, message: '请上传品牌Logo', trigger: 'change' }, */
    { required: true, trigger: "change", validator: validatorLogoUrl },
  ],
};

// 获取已有品牌
const getHasTrademark = async () => {
  try {
    const res: HashTrademarkResponseData = await reqHasTrademark(
      paginationConfig.currentPage,
      paginationConfig.pageSize
    );
    if (!res || !Object.keys(res).length) return
    paginationConfig.total = res.data.total || 0
    trademarkTableData.value = res.data.records || []
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
};

//添加品牌/编辑品牌
const addOrUpdateTrademark = async () => {
  try {
    const res: any = await reqAddOrUpdateTrademark(trademarkForm);
    const tipLabel = trademarkForm.id ? "更新品牌" : "添加品牌";
    if (res.code === 200) {
      ElMessage.success(`${tipLabel}成功`);
      // 添加或者更新品牌后再次请求品牌列表接口 更新页面
      paginationConfig.currentPage = trademarkForm.id ? paginationConfig.currentPage : 1;
      getHasTrademark();
    } else {
      ElMessage.error(`${tipLabel}失败`);
    }
    clearTrademarkDialogConfig();
    updateTrademarkDialogConfig("dialogVisible", false);
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
};

// 删除已有品牌
const removeTrademark = async (id: number) => {
  try {
    const res: any = await reqRemoveTrademark(id);
    if (res.code === 200) {
      ElMessage.success("删除品牌成功");
      // 删除品牌后再次请求品牌列表接口 更新页面

      // 根据删除完具体情况更新页码
      paginationConfig.currentPage = trademarkTableData.value.length > 1 ? paginationConfig.currentPage : (paginationConfig.currentPage - 1)
      getHasTrademark();
    } else {
      ElMessage.error("删除品牌失败");
    }
  } catch (error) {
    ElMessage.error((error as Error).message);
  }
};

// 自定义计算表格序号函数(跨页)
const customIndex = (index: number) => {
  return (paginationConfig.currentPage - 1) * paginationConfig.pageSize + index + 1;
};

// 每页条数发生变化
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  paginationConfig.currentPage = 1;
  getHasTrademark();
};

// 页数发生变化
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  getHasTrademark();
};

// 更新添加品牌/编辑品牌弹窗配置
const updateTrademarkDialogConfig = (key: string, value: boolean | string) => {
  trademarkDialogConfig[key] = value;
};

// 清除添加品牌/编辑品牌弹窗配置
const clearTrademarkDialogConfig = () => {
  trademarkForm.id = undefined;
  trademarkForm.tmName = "";
  trademarkForm.logoUrl = "";
  trademarkLocalUrl.value = "";
  trademarkFormRef.value.clearValidate("tmName");
  trademarkFormRef.value.clearValidate("logoUrl");
};

//更新品牌配置弹窗
const updateTrademarkConfig = (config: HashTrademarkItemType) => {
  const { id = undefined, tmName, logoUrl } = config;
  trademarkForm.id = id;
  trademarkForm.tmName = tmName;
  trademarkForm.logoUrl = logoUrl;
};

//  上传图片成功回调
const uploadSuccessCallback = () => {
  // 清除品牌logo验证
  trademarkFormRef.value.clearValidate("logoUrl");
};

// 添加品牌
const handleAddTrademark = () => {
  updateTrademarkDialogConfig("title", "添加品牌");
  updateTrademarkDialogConfig("dialogVisible", true);
};

// 编辑弹窗
const handleEditTrademark = (row: HashTrademarkItemType) => {
  updateTrademarkConfig(row);
  trademarkLocalUrl.value = row.logoUrl;
  updateTrademarkDialogConfig("title", "修改品牌");
  updateTrademarkDialogConfig("dialogVisible", true);
};

// 添加/编辑品牌弹窗取消
const handleTrademarkDailogCancel = () => {
  clearTrademarkDialogConfig();
  updateTrademarkDialogConfig("dialogVisible", false);
};

// 添加/编辑品牌弹窗确定
const handleTrademarkDailogConfirm = async () => {
  await trademarkFormRef.value.validate();
  addOrUpdateTrademark();
};

// 删除品牌
const handleRemoveTrademark = (id: number) => {
  removeTrademark(id);
};

onMounted(() => {
  getHasTrademark();
});
</script>

<style lang="scss" scoped>
.trademark-container {
  width: 100%;
  height: 100%;

  .add-btn {
    margin-bottom: 10px;
  }

  .trademark-table {
    margin-bottom: 10px;

    .trademark-logo-img {
      width: 100px;
      height: 100px;
    }
  }
}

.trademark-form {
  width: 80%;
}
</style>
