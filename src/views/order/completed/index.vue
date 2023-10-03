<template>
  <div ref="search" class="common-search">
    <el-button type="success" @click="handleAdd">新增商品</el-button>
  </div>

  <el-table ref="table" :data="tableData" :height="tableHeight" class="common-table" size="small">
    <el-table-column prop="id" label="商品ID" width="70" />
    <el-table-column prop="description" width="100" fixed="left" label="描述" :show-overflow-tooltip="{
      'effect': 'dark',
      'placement': 'right'
    }" />
    <el-table-column prop="price" label="价格" width="90" />
    <el-table-column prop="stock" label="库存" width="90" />
    <el-table-column prop="sold_quantity" label="卖出数量" width="90" />
    <el-table-column prop="category" label="分类">
      <template #default="scope">
        {{ productCategoryList[scope.row.category]?.label || '暂无数据' }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template #default="scope">
        {{ productStatusList[scope.row.status]?.label || '暂无数据' }}
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
  <el-pagination ref="pagination" class="common-pagination" small background
    layout="total, sizes, prev, pager, next, jumper" v-model:current-page="currentPage" v-model:page-size="pageSize"
    :total="total" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

  <addProduct ref="addDialog" :productCategoryList="productCategoryList" :productStatusList="productStatusList"
    @callback="fetchData" />
  <editProduct ref="editDialog" :productCategoryList="productCategoryList" :productStatusList="productStatusList"
    @callback="fetchData" />
  <productDetail ref="productDetailDrawer" :productCategoryList="productCategoryList"
    :productStatusList="productStatusList" />
</template>

<script lang='ts' setup>
import { ref, defineAsyncComponent, inject } from 'vue'
import { useTable } from '@/hooks/useTable'
import { useProductCategory } from '@/hooks/useProductCategory'
import { useProductStatus } from '@/hooks/useProductStatus'

const { tableData, loading, currentPage, pageSize, total, sortBy, sortDirection, fetchData } = useTable({ url: '/getProductList' })
const { productCategoryList } = useProductCategory()
const { productStatusList } = useProductStatus()

// // 继承实例
const search = inject('search')
const table = inject('table')
const pagination = inject('pagination')
const tableHeight = inject('tableHeight')

// 分页组件方法
function handleSizeChange(val: number) {
  currentPage.value = 1
  pageSize.value = val
}
function handleCurrentChange(val: number) {
  currentPage.value = val
}

// 新增，编辑，详情组件
const addProduct = defineAsyncComponent(() => import('./components/add.vue'))
const editProduct = defineAsyncComponent(() => import('./components/edit.vue'))
const productDetail = defineAsyncComponent(() => import('./components/detail.vue'))
const addDialog = ref()
const editDialog = ref()
const productDetailDrawer = ref()
function handleAdd() { addDialog.value.showDialog() }
function handleEdit(row: any) { editDialog.value.showDialog(row) }
function handleDetail(row: any) { productDetailDrawer.value.showDrawer(row) }

</script>

<style lang='less' scoped>
:deep(.el-popper) {
  width: 30% !important;
  height: 60% !important;
  overflow-y: auto;
}
</style>
