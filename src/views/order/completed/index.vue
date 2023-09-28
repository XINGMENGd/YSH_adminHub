<template>
  <div>
    <el-button type="success" @click="handleAdd">新增商品</el-button>
    <el-table :data="tableData" max-height="580" class="common-table" size="small">
      <el-table-column prop="id" label="商品ID" width="70" />
      <el-table-column prop="name" label="名称" width="100" fixed="left" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column prop="sold_quantity" label="卖出数量" />
      <el-table-column prop="category" label="分类">
        <template #default="scope">
          {{ categoryList[scope.row.category]?.label || '暂无数据' }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          {{ statusList[scope.row.status]?.label || '暂无数据' }}
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" min-width="90" />
      <el-table-column prop="updated_at" label="更新时间" min-width="90" />
      <el-table-column fixed="right" label="操作" align="center" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleDetail(scope.row)">查看详细</el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addProduct ref="addDialog" :categoryList="categoryList" :statusList="statusList" @callback="getDate" />
    <editProduct ref="editDialog" :categoryList="categoryList" :statusList="statusList" @callback="getDate" />
    <productDetail ref="productDetailDrawer" :categoryList="categoryList" :statusList="statusList" />
  </div>
</template>

<script lang='ts' setup>
import { ref, defineAsyncComponent } from 'vue'
import { getProductList, getProductCategoryList, getProductStatusList } from '@/api/Product/index'
const addProduct = defineAsyncComponent(() => import('./components/add.vue'))
const editProduct = defineAsyncComponent(() => import('./components/edit.vue'))
const productDetail = defineAsyncComponent(() => import('./components/detail.vue'))

const addDialog = ref()
const editDialog = ref()
const productDetailDrawer = ref()
const handleAdd = () => addDialog.value.showDialog()
const handleEdit = (row: any) => editDialog.value.showDialog(row)
const handleDetail = (row: any) => productDetailDrawer.value.showDrawer(row)
const categoryList = ref([] as any)
const statusList = ref([] as any)
const tableData = ref([])
const params = {
  page: 1,
  pageSize: 20
}
const getDate = () => {
  getProductList(params).then(res => {
    tableData.value = res.data
  })
}
const getStatus = () => {
  getProductCategoryList().then(res => {
    categoryList.value = res.data
  })
  getProductStatusList().then(res => {
    statusList.value = res.data
  })
}
getDate()
getStatus()

</script>

<style lang='less' scoped></style>
