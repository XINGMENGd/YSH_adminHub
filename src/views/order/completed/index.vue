<template>
  <div>
    <el-button type="success" @click="handleAdd">新增商品</el-button>
    <el-table :data="tableData" max-height="580" class="common-table" size="small">
      <el-table-column prop="id" label="商品ID" width="70" />
      <el-table-column prop="name" label="名称" width="100" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column prop="sold_quantity" label="卖出数量" />
      <el-table-column prop="category" label="分类" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="created_at" label="创建时间" />
      <el-table-column prop="updated_at" label="更新时间" />
      <el-table-column fixed="right" label="操作" align="center" width="80">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addProduct ref="addDialog" @callback="getDate" />
    <editProduct ref="editDialog" @callback="getDate" />
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import { fetchProduct } from '@/api/Product/index'
import addProduct from './component/add.vue'
import editProduct from './component/edit.vue'

const addDialog = ref()
const editDialog = ref()
const handleAdd = () => addDialog.value.showDialog()
const handleEdit = (row: any) => editDialog.value.showDialog(row)

const tableData = ref([])
const params = {
  page: 1,
  pageSize: 20
}
const getDate = () => {
  fetchProduct(params).then(res => {
    tableData.value = res.data
  })
}
getDate()

</script>

<style lang='less' scoped></style>
